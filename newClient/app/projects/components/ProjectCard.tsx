import React from "react";
import { useRouter } from "next/navigation";
import { ProjectCardProps } from "@/interfaces";

const ProjectCard: React.FC<ProjectCardProps> = ({ data, index }) => {
  const router = useRouter();


  return (
    <div
      onClick={() => router.push(`project/${data._id}/${data.title}`)}
      className="rounded-xl m-3 overflow-hidden shadow-lg cursor-pointer border"
    >
      <div className=" mx-7 px-6 py-4">
        <div className="w-26  font-bold text-xl mb-2">{`${index + 1} - ${
          data.title
        }`}</div>
        <p className="text-gray-700 text-base">{data.description}</p>
      </div>
      <div className="px-6 pt-4 pb-2">Tasks- {data.tasks.length}</div>
    </div>
  );
};

export default ProjectCard;
