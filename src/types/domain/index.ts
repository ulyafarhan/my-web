export interface SocialLinks {
  linkedin?: string;
  github?: string;
  email?: string;
  [key: string]: string | undefined;
}

export interface ProjectLinks {
  demo?: string;
  repo?: string;
  [key: string]: string | undefined;
}

export interface Profile {
  id: string;
  name: string;
  hero_text: string;
  photo_url: string;
  cv_url: string;
  socials: SocialLinks;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  image_url: string;
  content: string;
  tags: string[];
  links: ProjectLinks;
  is_featured: number;
  created_at: number;
}

export interface Timeline {
  id: string;
  label: string;
  sub_label: string;
  year: string;
  description: string;
}

export interface ProfileRow {
  id: string;
  name: string;
  hero_text: string;
  photo_url: string;
  cv_url: string;
  socials: string;
}

export interface ProjectRow {
  id: string;
  title: string;
  slug: string;
  image_url: string;
  content: string;
  tags: string;
  links: string;
  is_featured: number;
  created_at: number;
}