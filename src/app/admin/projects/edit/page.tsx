"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { adminFetch } from "@/utils/admin-client";
import { Input } from "@/components/atoms/Input";
import { Button } from "@/components/atoms/Button";

// Komponen Form terpisah agar bisa dibungkus Suspense
function EditForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // Ambil ID dari URL ?id=...

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    image_url: "",
    tags: "",
    is_featured: false,
  });

  useEffect(() => {
    if (!id) return;

    // Fetch data semua project lalu cari yang sesuai ID
    // (Dalam skala besar sebaiknya fetch detail by ID endpoint, tapi ini cukup untuk start)
    fetch(`/api/v1/projects`)
      .then((res) => res.json())
      .then((json) => {
        const project = json.data.find((p: any) => p.id === id);
        if (project) {
          setFormData({
            ...project,
            tags: Array.isArray(project.tags) ? project.tags.join(", ") : project.tags,
            is_featured: !!project.is_featured,
          });
        }
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    try {
      // Backend API tetap menggunakan path /[id] karena Cloudflare Functions mendukungnya
      const res = await adminFetch(`/api/v1/admin/projects/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(",").map((t) => t.trim()),
          is_featured: formData.is_featured ? 1 : 0,
        }),
      });

      if (res.ok) router.push("/admin/projects");
      else alert("Gagal update project");
    } catch (err) {
      alert("Terjadi kesalahan saat update");
    }
  };

  if (!id) return <div>Project ID not found</div>;
  if (loading) return <div>Loading data...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-boxdark rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Edit Proyek</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Judul Proyek"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <Input
          label="Slug"
          value={formData.slug}
          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          required
        />
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Deskripsi</label>
          <textarea
            className="w-full p-2 border rounded dark:bg-meta-4 border-stroke dark:border-strokedark"
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>
        <Input
          label="URL Gambar"
          value={formData.image_url}
          onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
        />
        <Input
          label="Tags (pisahkan dengan koma)"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
        />
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.is_featured}
            onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
            className="w-4 h-4"
          />
          <label className="text-sm font-medium">Tampilkan di Beranda</label>
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="secondary" onClick={() => router.back()}>Batal</Button>
          <Button type="submit">Simpan Perubahan</Button>
        </div>
      </form>
    </div>
  );
}

// Halaman utama Wajib bungkus Suspense agar useSearchParams aman di mode build static
export default function EditProjectPage() {
  return (
    <Suspense fallback={<div>Loading editor...</div>}>
      <EditForm />
    </Suspense>
  );
}