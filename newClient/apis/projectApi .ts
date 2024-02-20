import { Project } from "@/interfaces";
import axios from "../axios/axios";
import authHeader from "../utils/auth_Header";

const projectApi = () => {
  const addProject = (title: String, description: String) => {
    console.log({ title, description });

    return new Promise<Project>(async (resolve, reject) => {
      try {
        const response = await axios.post(
          "/project",
          { title, description },
          { headers: authHeader() }
        );
        resolve(response.data.newProject as Project);
      } catch (error) {
        reject(error);
      }
    });
  };

  const getProjects = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get("/project", { headers: authHeader() });
        console.log({ response });
        resolve(response.data.projects);
      } catch (error) {
        console.log(error);

        reject(error);
      }
    });
  };

  const getProject = (projectId: String) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get("/project?projectId=" + projectId, {
          headers: authHeader(),
        });
        console.log({ response });
        resolve(response.data.projects);
      } catch (error) {
        console.log(error);

        reject(error);
      }
    });
  };

  return { addProject, getProjects, getProject };
};

export default projectApi;
