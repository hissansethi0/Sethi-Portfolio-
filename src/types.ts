export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  longDescription?: string;
  image: string;
  technologies: string[];
  category: string;
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  order: number;
  createdAt: string;
  screenshots?: string[];
  features?: string[];
}

export interface Skill {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'Tools' | 'Deployment' | 'Other';
  proficiency?: number;
  iconName?: string;
  description?: string;
}

export interface Experience {
  id: string;
  position: string;
  company: string;
  description: string;
  startDate: string;
  endDate: string;
  current: boolean;
  technologies: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
  current: boolean;
  description?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string | number;
  read: boolean;
}

export interface ProfileData {
  name: string;
  title: string;
  status: string;
  location: string;
  bio: string;
  philosophy: string;
  email: string;
  whatsapp: string;
  linkedin: string;
  github: string;
  avatarUrl: string;
  availableForWork: boolean;
  introHighlight: string;
}

export interface PortfolioSettings {
  allowDirectMessages: boolean;
  displayFeaturedOnlyByDefault: boolean;
  cloudinaryCloudName: string;
  cloudinaryUploadPreset: string;
}
