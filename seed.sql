INSERT INTO profiles (id, name, hero_text, photo_url, cv_url, socials)
VALUES (
  '1', 
  'Developer Name', 
  'Building high-performance edge applications with Next.js and Cloudflare.', 
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400', 
  '#', 
  '{"github": "https://github.", "linkedin": "https://linkedin."}'
);

INSERT INTO projects (id, title, slug, image_url, content, tags, links, is_featured, created_at)
VALUES (
  'p1', 
  'Edge Portfolio System', 
  'edge-portfolio-system', 
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800', 
  'A high performance portfolio system built on Cloudflare.', 
  '["Next.js", "D1", "Workers"]', 
  '{"demo": "https://example.com"}', 
  1, 
  1716543200000
);