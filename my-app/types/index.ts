export interface ProjectMetadata {
  description: string;
  live: string;
  github: string;
  image?: {
    url: string;
  };
  img?: string;
}

export interface Project {
  title: string;
  metadata: ProjectMetadata;
}

export interface Reference {
  name: string;
  ref: string;
  relation: string;
  linkedin: string;
}

export interface Experience {
  period: string;
  title: string;
  company: string;
  location: string;
  responsibilities: string[];
}

export interface TechStack {
  [category: string]: string[];
}

export interface Data {
  bio: string;
  techStack: TechStack;
  skills: string[];
  hobbies: string[];
  projects: Project[];
  refs: Reference[];
  experience: Experience[];
} 