"use client";
import React, { useEffect, useState } from "react";
import TaskCard from "@/app/project/[id]/[projectname]/components/TaskCard";
import TaskModal from "@/app/project/[id]/[projectname]/components/TaskModal";
import taskApi from "@/apis/taskApi";
import Toast from "@/components/Toast";
import Skeleton from "@/components/skeleton";
import CheckAuth from "@/utils/checkAuth";
import { Task } from "@/interfaces";

const ProjectDetails = ({ params }:any) => {
  const [showModal, setShowModal] = React.useState(false);
  const [currentTasks, setCurrentTasks] = React.useState([]);
  const { getTasks, updateTask, addTask } = taskApi();
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    getTasks(params.id)
      .then((tasks) => {
        // store.setProjects(project);
        setCurrentTasks(tasks);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const onStatusChangeHandler = (status:String, taskId:String) => {
    console.log({ status, taskId });

    updateTask(status, taskId).then(() => {
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    });
  };

  const addTaskHandler = (title:String, description:String, projectId:String) => {
    console.log("Task Handler ");

    addTask(title, description, projectId).then((newtask) => {
      // console.log(resp);
      console.log({ newtask });
      setCurrentTasks([...currentTasks, newtask]);

      // store.addTask();
    });
  };

  if (loading) return <Skeleton />;

  return (
    <>
      <h2 className="text-4xl font-extrabold dark:text-black text-justify text-center m-4 ">
        {params.projectname.replace(/%20/g, " ")}
      </h2>

      <TaskModal
        addTaskHandler={addTaskHandler}
        projectId={params.id}
        showModal={showModal}
        setShowModal={setShowModal}
      />

      <div className="flex justify-center justify-items-center align-middle flex-wrap w-50 m-10">
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Task
        </button>
      </div>

      <div className="grid grid-cols-4 divide-x ">
        {currentTasks?.map((elem, index) => (
          <TaskCard
            onStatusChangeHandler={onStatusChangeHandler}
            key={elem?._id}
            index={index}
            task={elem}
          />
        ))}
      </div>

      <Toast showToast={showToast} setShowToast={setShowToast} />
    </>
  );
};

export default  ProjectDetails
