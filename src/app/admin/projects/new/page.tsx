"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminFetch } from "@/utils/admin-client";
import { PageHeader } from "@/components/admin/PageHeader";
import { AdminCard } from "@/components/admin/AdminCard";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Save, ArrowLeft } from "lucide-react";

export default function NewProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    // Konversi tag string ke array
    const tagsString = formData.get("tags") as string;
    const tagsArray = tagsString ? tagsString.split(",").map(s => s.trim()) : [];

    const payload = {
      title: formData.get("title"),
      slug: formData.get("slug"),
      image_url: formData.get("image_url"),
      content: formData.get("content"),
      tags: tagsArray,
      links: {
        demo: formData.get("demo_url"),
        repo: formData.get("repo_url")
      },
      is_featured: formData.get("is_featured") === "on" ? 1 : 0
    };

    try {
      const res = await adminFetch("/api/v1/admin/projects", {
        method: "POST",
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      
      if (json.success) {
        router.push("/admin/dashboard");
      } else {
        alert("Error: " + json.error);
      }
    } catch (err) {
      alert("Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PageHeader 
        title="Create Project" 
        description="Add a new portfolio item to your showcase."
        actions={
          <div className="flex gap-3">
            <Button type="button" variant="ghost" onClick={() => router.back()} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Cancel
            </Button>
            <Button type="submit" isLoading={loading} className="flex items-center gap-2">
              <Save className="h-4 w-4" /> Save Project
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-6">
          <AdminCard title="General Information">
            <div className="space-y-6">
              <Input name="title" label="Project Title" placeholder="e.g. E-Commerce Dashboard" required />
              <Input name="slug" label="Slug" placeholder="e.g. e-commerce-dashboard" required pattern="^[a-z0-9-]+$" />
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea 
                  name="content" 
                  className="w-full rounded-lg border border-gray-300 p-4 h-64 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-mono text-sm"
                  placeholder="Write your project description in Markdown..."
                  required 
                />
                <p className="mt-2 text-xs text-gray-500">Supports Markdown formatting.</p>
              </div>
            </div>
          </AdminCard>

          <AdminCard title="Media & Links">
            <div className="space-y-6">
              <Input name="image_url" label="Cover Image URL" placeholder="https://..." required type="url" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input name="demo_url" label="Live Demo URL" placeholder="https://..." type="url" />
                <Input name="repo_url" label="Repository URL" placeholder="https://github.com/..." type="url" />
              </div>
            </div>
          </AdminCard>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          <AdminCard title="Visibility">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-900">Featured Project</span>
                <span className="text-xs text-gray-500">Show this on the homepage hero section.</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" name="is_featured" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </AdminCard>

          <AdminCard title="Taxonomy">
            <div className="space-y-4">
              <Input name="tags" label="Technologies" placeholder="Next.js, Tailwind, D1" required />
              <p className="text-xs text-gray-500">Separate tags with commas.</p>
            </div>
          </AdminCard>
        </div>
      </div>
    </form>
  );
}