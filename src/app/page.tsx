"use client";

import { useEffect, useState, useCallback } from "react";
import { MainLayout } from "@/components/templates/MainLayout";
import { Hero } from "@/components/organisms/Hero";
import { ProjectGrid } from "@/components/blocks/ProjectGrid";
import { TimelineItem } from "@/components/molecules/TimelineItem";
import { Profile, Project, Timeline } from "@/types/domain";
import { ApiResponse } from "@/types/api";

export default function HomePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [timelines, setTimelines] = useState<Timeline[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadInitialData = useCallback(async () => {
    try {
      const [initResponse, projectsResponse] = await window.Promise.all([
        fetch("/api/v1/init"),
        fetch("/api/v1/projects")
      ]);

      if (!initResponse.ok || !projectsResponse.ok) {
        throw new Error("Network response was not ok");
      }

      const initResult: ApiResponse<{
        profile: Profile | null;
        timelines: Timeline[];
      }> = await initResponse.json();

      const projectsResult: ApiResponse<Project[]> = await projectsResponse.json();

      if (initResult.success && initResult.data) {
        setProfile(initResult.data.profile);
        setTimelines(initResult.data.timelines);
      }

      if (projectsResult.success && projectsResult.data) {
        setProjects(projectsResult.data);
      }
    } catch (error) {
      // Error handling diam pasif sesuai brief
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <MainLayout>
      {profile && <Hero profile={profile} />}
      
      <ProjectGrid 
        title="Featured Projects" 
        projects={projects.filter((p) => p.is_featured === 1)} 
      />

      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-16 text-3xl font-bold tracking-tight text-gray-900 text-center">
            Experience & Education
          </h2>
          <div className="mx-auto max-w-3xl">
            {timelines.map((item, index) => (
              <TimelineItem 
                key={item.id} 
                data={item} 
                isLast={index === timelines.length - 1} 
              />
            ))}
          </div>
        </div>
      </section>

      <ProjectGrid 
        title="All Works" 
        projects={projects} 
      />
    </MainLayout>
  );
}