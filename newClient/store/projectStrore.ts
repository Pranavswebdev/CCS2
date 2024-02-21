import { create } from "zustand";
import { Project,User } from "../interfaces";

type Store = {
  currentuser:User,
  currentProject: Project;
  projects: Project[];
  setCurrentProject: (currentProject: Project) => void;
  setCurrentUser: (user: User) => void;
  addProject: (newProject: Project) => void;
  setProjects: (projects: Project[]) => void;
};

const useStore = create<Store>()((set) => ({

  currentProject: {} as Project,
  projects: [],
  currentuser:{} as User,

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

  setCurrentUser: (user:User) => {
    set((state) => ({
      currentuser: user,
    }));
  },

  setProjects: (newProjects: Project[]) => {
    set((state) => ({
      projects: [...newProjects],
    }));
  },
}));

export default useStore;
