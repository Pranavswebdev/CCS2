"use client";
import React, { useEffect } from "react";
import ProjectCard from "./components/ProjectCard";
import ProjectModal from "./components/ProjectModal";
import useStore from "@/store/projectStrore";
import projectApi from "@/apis/projectApi ";
import { Project } from "@/interfaces";
// import { Project } from "@/interfaces";

const Project = () => {
  const [showModal, setShowModal] = React.useState(false);

  const store = useStore();
  const storeProjects = store.projects;
  const { getProjects } = projectApi();

  useEffect(() => {
    getProjects().then((projects) => {
      store.setProjects(projects as Project[]);
    }); 
    

  }, []);

  return (
    <>
      <ProjectModal showModal={showModal} setShowModal={setShowModal} />

      <div className="flex justify-center justify-items-center align-middle flex-wrap w-50 m-10">
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Project
        </button>
      </div>

      <div className="grid grid-cols-4 divide-x">
        {storeProjects.map((elem, index) => (
          <ProjectCard key={index} index={index} data={elem} />
        ))}
      </div>
    </>
  );
};

export default Project;
