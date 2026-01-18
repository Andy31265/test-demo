import { Project } from '../types';
import { MOCK_PROJECTS } from './mockData';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const projectService = {
  getProjects: async (): Promise<Project[]> => {
    await delay(800);
    return MOCK_PROJECTS;
  },
  
  getFeaturedProjects: async (): Promise<Project[]> => {
    await delay(500);
    return MOCK_PROJECTS.filter(p => p.featured);
  },

  getProjectBySlug: async (slug: string): Promise<Project | undefined> => {
    await delay(600);
    return MOCK_PROJECTS.find(p => p.slug === slug);
  }
};