"use client";
import React, { useEffect, useLayoutEffect } from "react";
import ProjectCard from "./components/ProjectCard";
import ProjectModal from "./components/ProjectModal";
import useStore from "@/store/projectStrore";
import projectApi from "@/apis/projectApi ";
import { Project } from "@/interfaces";
import Skeleton from "@/components/skeleton";
import CheckAuth from "@/utils/checkAuth";
// import { Project } from "@/interfaces";

const Project = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const store = useStore();
  const storeProjects = store.projects;
  const { getProjects } = projectApi();

  useEffect(() => {
    getProjects().then((projects) => {
      setLoading(false);
      store.setProjects(projects as Project[]);
    });
  }, []);

  useLayoutEffect(() => {}, []);

  if (loading) return <Skeleton />;

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

export default   CheckAuth(Project) ;
