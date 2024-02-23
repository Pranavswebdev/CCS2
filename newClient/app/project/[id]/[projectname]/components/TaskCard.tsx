"use client";
import React from "react";
import moment from "moment";
import Switch from "../components/Switch";
import { ITaskCard } from "@/interfaces";

const TaskCard: React.FC<ITaskCard> = ({ task, onStatusChangeHandler }) => {


  
  console.log(task, "task");
  return (
    <div className="max-w-sm  m-3 rounded overflow-hidden shadow-lg border-black-400">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{task?.name}</div>
        <p className="text-gray-700 text-base">{task?.description}</p>
      </div>
      <div className="px-6 pt-4 pb-2 flex font-semibold flex-col ">
        <div>Start date - {moment(task?.start_date).format("DD-MM-YYYY")}</div>

        {task?.end_date && (
          <div>End date - {moment(task?.end_date).format("DD-MM-YYYY")}</div>
        )}
      </div>

      <div className="px-6 pt-4 pb-2  cursor-pointer ">
        <Switch
          onStatusChangeHandler={onStatusChangeHandler}
          key={task._id}
          task={task}
          name={task._id}
        />
      </div>
    </div>
  );
};

export default TaskCard;
