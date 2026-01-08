import { Database } from "@/lib/db";
import { KVStorage } from "@/lib/kv";
import { Project, ProjectRow } from "@/types/domain";
import { ProjectInput } from "@/schemas/project.schema";

export class ProjectService {
  private db: Database;
  private kv: KVStorage;

  constructor(db: Database, kv: KVStorage) {
    this.db = db;
    this.kv = kv;
  }

  private mapRowToEntity(row: ProjectRow): Project {
    return {
      ...row,
      tags: JSON.parse(row.tags),
      links: JSON.parse(row.links),
    };
  }

  async getAll(): Promise<Project[]> {
    const cacheKey = "projects:all";
    const cached = await this.kv.get<Project[]>(cacheKey);

    if (cached) {
      return cached;
    }

    const query = "SELECT * FROM projects ORDER BY created_at DESC";
    const rows = await this.db.query<ProjectRow>(query);
    const projects = rows.map(this.mapRowToEntity);

    await this.kv.set(cacheKey, projects, 3600);
    return projects;
  }

  async getFeatured(): Promise<Project[]> {
    const cacheKey = "projects:featured";
    const cached = await this.kv.get<Project[]>(cacheKey);

    if (cached) {
      return cached;
    }

    const query = "SELECT * FROM projects WHERE is_featured = 1 ORDER BY created_at DESC LIMIT 3";
    const rows = await this.db.query<ProjectRow>(query);
    const projects = rows.map(this.mapRowToEntity);

    await this.kv.set(cacheKey, projects, 3600);
    return projects;
  }

  async getBySlug(slug: string): Promise<Project | null> {
    const cacheKey = `project:${slug}`;
    const cached = await this.kv.get<Project>(cacheKey);

    if (cached) {
      return cached;
    }

    const query = "SELECT * FROM projects WHERE slug = ?";
    const row = await this.db.queryOne<ProjectRow>(query, [slug]);

    if (!row) return null;

    const project = this.mapRowToEntity(row);
    await this.kv.set(cacheKey, project, 86400); 
    return project;
  }

  async search(keyword: string): Promise<Project[]> {
    const query = `
      SELECT p.* FROM projects p
      JOIN search_idx s ON p.rowid = s.content_rowid
      WHERE search_idx MATCH ?
      ORDER BY rank
      LIMIT 10
    `;
    
    // FTS5 prefix query syntax
    const searchTerm = `"${keyword}"*`;
    const rows = await this.db.query<ProjectRow>(query, [searchTerm]);
    
    return rows.map(this.mapRowToEntity);
  }

  async create(id: string, data: ProjectInput): Promise<boolean> {
    const query = `
      INSERT INTO projects (id, title, slug, image_url, content, tags, links, is_featured, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
      id,
      data.title,
      data.slug,
      data.image_url,
      data.content,
      JSON.stringify(data.tags),
      JSON.stringify(data.links),
      data.is_featured,
      Date.now()
    ];

    const success = await this.db.execute(query, params);

    if (success) {
      await this.invalidateCache();
    }

    return success;
  }

  async update(id: string, data: Partial<ProjectInput>): Promise<boolean> {
    const current = await this.db.queryOne<ProjectRow>("SELECT * FROM projects WHERE id = ?", [id]);
    if (!current) return false;

    const updates: string[] = [];
    const params: unknown[] = [];

    Object.entries(data).forEach(([key, value]) => {
      updates.push(`${key} = ?`);
      params.push(key === "tags" || key === "links" ? JSON.stringify(value) : value);
    });

    params.push(id);
    const query = `UPDATE projects SET ${updates.join(", ")} WHERE id = ?`;
    
    const success = await this.db.execute(query, params);

    if (success) {
      await this.invalidateCache(current.slug);
      if (data.slug && data.slug !== current.slug) {
        await this.kv.delete(`project:${data.slug}`);
      }
    }

    return success;
  }

  async delete(id: string): Promise<boolean> {
    const project = await this.db.queryOne<ProjectRow>("SELECT slug FROM projects WHERE id = ?", [id]);
    if (!project) return false;

    const success = await this.db.execute("DELETE FROM projects WHERE id = ?", [id]);

    if (success) {
      await this.invalidateCache(project.slug);
    }

    return success;
  }

  private async invalidateCache(slug?: string) {
    const keys = ["projects:all", "projects:featured"];
    if (slug) {
      keys.push(`project:${slug}`);
    }
    
    await Promise.all(keys.map(key => this.kv.delete(key)));
  }
}