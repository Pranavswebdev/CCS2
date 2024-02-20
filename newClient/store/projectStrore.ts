import { create } from "zustand";
import { Project } from "../interfaces";

type Store = {
  currentProject: Project;
  projects: Project[];
  setCurrentProject: (currentProject: Project) => void;
  addProject: (newProject: Project) => void;
  setProjects: (projects: Project[]) => void;
};

const useStore = create<Store>()((set) => ({
  currentProject: {} as Project,
  projects: [],

  addProject: (newProject: Project) => {
    set((state) => ({
      projects: [newProject, ...state.projects],
    }));
  },

  setCurrentProject: (currentProject: Project) => {
    set((state) => ({
      currentProject: currentProject,
    }));
  },

  setProjects: (newProjects: Project[]) => {
    set((state) => ({
      projects: [...newProjects],
    }));
  },
}));

export default useStore;
