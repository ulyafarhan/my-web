import { Project } from "@/types/domain";
import { Badge } from "@/components/atoms/Badge";
import Link from "next/link";

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Link 
      href={`/projects/${project.slug}`}
      className="group block overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-gray-200">
        <img
          src={project.image_url}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {project.is_featured === 1 && (
          <div className="absolute top-4 left-4">
            <Badge variant="info">Featured</Badge>
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="mb-3 flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
        <h3 className="mb-2 text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
          {project.title}
        </h3>
        <p className="line-clamp-2 text-sm text-gray-600 leading-relaxed">
          {project.content.replace(/[#*`]/g, "").substring(0, 120)}...
        </p>
      </div>
    </Link>
  );
};