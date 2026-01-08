import { D1Database } from "@cloudflare/workers-types";

export class Database {
  private db: D1Database;

  constructor(db: D1Database) {
    if (!db) {
      throw new Error("Database binding (D1) is missing. Are you running with 'wrangler pages dev'?");
    }
    this.db = db;
  }

  async query<T>(query: string, params: unknown[] = []): Promise<T[]> {
    try {
      const stmt = this.db.prepare(query).bind(...params);
      const result = await stmt.all<T>();
      
      if (!result.success || !result.results) {
        throw new Error(result.error || "Database query failed");
      }

      return result.results;
    } catch (error) {
      console.error("DB Query Error:", query, error);
      throw error;
    }
  }

  async queryOne<T>(query: string, params: unknown[] = []): Promise<T | null> {
    try {
      const stmt = this.db.prepare(query).bind(...params);
      const result = await stmt.first<T>();
      return result || null;
    } catch (error) {
      console.error("DB QueryOne Error:", query, error);
      throw error;
    }
  }

  async execute(query: string, params: unknown[] = []): Promise<boolean> {
    try {
      const stmt = this.db.prepare(query).bind(...params);
      const result = await stmt.run();
      return result.success;
    } catch (error) {
      console.error("DB Execute Error:", query, error);
      return false;
    }
  }
}

export const getDb = (env: CloudflareEnv) => new Database(env.DB);