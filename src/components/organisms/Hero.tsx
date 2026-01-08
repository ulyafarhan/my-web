import { Button } from "@/components/atoms/Button";
import { Profile } from "@/types/domain";

interface HeroProps {
  profile: Profile;
}

export const Hero = ({ profile }: HeroProps) => {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div className="flex flex-col items-start space-y-8">
            <div className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
              Available for new projects
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
              I am {profile.name}
            </h1>
            <p className="text-lg leading-8 text-gray-600 max-w-2xl">
              {profile.hero_text}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg">View Projects</Button>
              <Button variant="outline" size="lg">Download CV</Button>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-3xl bg-gray-100 shadow-2xl">
              <img
                src={profile.photo_url}
                alt={profile.name}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};