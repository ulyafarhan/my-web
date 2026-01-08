import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(3).max(100),
  slug: z.string().min(3).regex(/^[a-z0-9-]+$/),
  image_url: z.string().url(),
  content: z.string().min(10),
  tags: z.array(z.string()),
  links: z.record(z.string(), z.string().url()),
  is_featured: z.number().int().min(0).max(1).default(0),
});

export const projectUpdateSchema = projectSchema.partial();

export type ProjectInput = z.infer<typeof projectSchema>;