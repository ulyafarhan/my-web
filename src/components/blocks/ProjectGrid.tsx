import { Project } from "@/types/domain";
import { ProjectCard } from "@/components/molecules/ProjectCard";

interface ProjectGridProps {
  title?: string;
  projects: Project[];
}

export const ProjectGrid = ({ title, projects }: ProjectGridProps) => {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {title && (
          <div className="mb-12 flex items-end justify-between">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              {title}
            </h2>
          </div>
        )}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};