DROP TABLE IF EXISTS profiles;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS timelines;
DROP TABLE IF EXISTS search_idx;

CREATE TABLE profiles (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  hero_text TEXT,
  photo_url TEXT,
  cv_url TEXT,
  socials TEXT
);

CREATE TABLE projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  image_url TEXT,
  content TEXT,
  tags TEXT,
  links TEXT,
  is_featured INTEGER DEFAULT 0,
  created_at INTEGER
);

CREATE TABLE timelines (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  sub_label TEXT,
  year TEXT,
  description TEXT
);

CREATE VIRTUAL TABLE search_idx USING fts5(
  title,
  content,
  content_rowid UNINDEXED
);