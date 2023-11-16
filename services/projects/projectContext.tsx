'use client';
import React, { createContext, useContext } from 'react';
import ProjectService from './project.service';
import { useCookieContext } from '@/src/contexts/cookieContext';
import { IProjectService } from '../base/types';

const ProjectContext = createContext<IProjectService | undefined>(undefined);

interface ProjectProviderProps {
  children: React.ReactNode;
}

export const ProjectProvider: React.FC<ProjectProviderProps> = ({
  children,
}) => {
  const { token } = useCookieContext();
  const projectService = new ProjectService(token);

  return (
    <ProjectContext.Provider value={projectService}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
