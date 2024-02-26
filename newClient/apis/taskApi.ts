import { Task } from "@/interfaces";
import axios from "../axios/axios";
import authHeader from "../utils/auth_Header";

const taskApi = () => {
  const addTask = (title: String, description: String, projectId: String,start_date:Date,end_date:Date) => {
    console.log({ title, description,start_date,end_date });

    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(
          "/task",
          { title, description, projectId,start_date,end_date },
          { headers: authHeader() }
        );
        resolve(response.data.newTask);
      } catch (error) {
        reject(error);
      }
    });
  };

  const getTasks = (projectId: String) => {
    return new Promise<Task>(async (resolve, reject) => {
      try {
        const response = await axios.get("/task?projectId=" + projectId, {
          headers: authHeader(),
        });
        console.log({ response });
        resolve(response.data.tasks);
      } catch (error) {
        console.log(error);

        reject(error);
      }
    });
  };

  const updateTask = (status: String, taskId: String) => {
    return new Promise(async (resolve, reject) => {
      const data = {
        taskId: taskId,
        status: status,
      };

      try {
        const response = await axios.put("/task", data, {
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

  return { addTask, updateTask, getTasks };
};

export default taskApi;
