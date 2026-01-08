"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Project } from "@/types/domain";
import { adminFetch } from "@/utils/admin-client";
import { AdminCard } from "@/components/admin/AdminCard";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";
import { Plus, Search, Edit2, Trash2, Eye } from "lucide-react";
import { Input } from "@/components/atoms/Input";

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/v1/projects");
      const json = await res.json();
      if (json.success) setProjects(json.data);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project? This action cannot be undone.")) return;
    try {
      const res = await adminFetch(`/api/v1/admin/projects/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) fetchProjects();
      else alert(json.error);
    } catch (err) {
      alert("Delete failed");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.slug.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <PageHeader 
        title="Dashboard" 
        description="Overview of your portfolio content and statistics."
        actions={
          <Link href="/admin/projects/new">
            <Button className="flex items-center gap-2 shadow-sm ring-1 ring-white/10">
              <Plus className="h-4 w-4" />
              New Project
            </Button>
          </Link>
        }
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-8">
        <AdminCard className="border-l-4 border-blue-500">
          <div className="text-sm font-medium text-gray-500">Total Projects</div>
          <div className="mt-2 text-3xl font-bold text-gray-900">{projects.length}</div>
        </AdminCard>
        <AdminCard className="border-l-4 border-green-500">
          <div className="text-sm font-medium text-gray-500">Featured</div>
          <div className="mt-2 text-3xl font-bold text-gray-900">{projects.filter(p => p.is_featured === 1).length}</div>
        </AdminCard>
        <AdminCard className="border-l-4 border-purple-500">
          <div className="text-sm font-medium text-gray-500">Total Views</div>
          <div className="mt-2 text-3xl font-bold text-gray-900">-</div>
        </AdminCard>
      </div>

      <AdminCard title="Projects Management" 
        actions={
          <div className="w-64">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search projects..." 
                className="w-full rounded-lg border border-gray-200 pl-9 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        }
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Project Info</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Tech Stack</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {isLoading ? (
                <tr><td colSpan={4} className="p-8 text-center text-gray-500">Loading data...</td></tr>
              ) : filteredProjects.length === 0 ? (
                <tr><td colSpan={4} className="p-8 text-center text-gray-500">No projects found.</td></tr>
              ) : filteredProjects.map((project) => (
                <tr key={project.id} className="group hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 border border-gray-200">
                        <img src={project.image_url} alt="" className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{project.title}</div>
                        <div className="text-xs text-gray-500">/{project.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {project.is_featured ? (
                      <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Featured</span>
                    ) : (
                      <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">Standard</span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-1">
                      {project.tags.slice(0, 2).map(t => <Badge key={t} variant="default">{t}</Badge>)}
                      {project.tags.length > 2 && <span className="text-xs text-gray-500">+{project.tags.length - 2}</span>}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button onClick={() => deleteProject(project.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminCard>
    </>
  );
}