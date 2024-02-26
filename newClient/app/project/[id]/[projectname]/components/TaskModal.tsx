"use client";

import { Button, Checkbox, Typography } from "@mui/material";
import { Input } from "postcss";
import React, { useState } from "react";
import useStore from "@/store/projectStrore";
import taskApi from "@/apis/taskApi";
import { useForm, SubmitHandler } from "react-hook-form";

interface ITaskModal {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  projectId: String;
  addTaskHandler: (

    title: String,
    description: String,
    projectId: String,
    start_date:Date,
    end_date:Date

  ) => void;
}

const Modal: React.FC<ITaskModal> = ({
  showModal,
  setShowModal,
  projectId,
  addTaskHandler,
}) => {
  const [title, setTitle] = useState("");
  // const [currentProjectId, setCurrentProjectId] = useState(projectId);
  const [description, setDescription] = useState("");
  const store = useStore();

  type Inputs = {
    title: string;
    description: string;
    start_date:Date;
    end_date:Date
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {

    console.log(data,'submit data');

    addTaskHandler(data.title, data.description,projectId,data.start_date,data.end_date );

    setShowModal(false);
  };

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-4xl">
              {/*content*/}
              <div
                className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none "
                style={{ width: "28rem" }}
              >
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Add Task</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="bg-white shadow-md rounded px-8 pt-6 pb-8"
                >
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Task Title
                    </label>
                    <input
                      // onChange={(e) => setTitle(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      {...register("title", {
                        required: true,
                      })}
                    />
                    {errors.title && (
                      <span className="text-red-700 font-medium">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Task Description
                    </label>
                    <textarea
                      // onChange={(e) => setDescription(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      {...register("description", {
                        required: true,
                      })}
                    />
                    {errors.description && (
                      <span className="text-red-700 font-medium">
                        This field is required
                      </span>
                    )}
                  </div>


                  <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                    Start Date
                    </label>
                    <input
                    type="date"
                      // onChange={(e) => setDescription(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      {...register("start_date", {
                        required: true,
                      })}
                    />
                    {errors.start_date && (
                      <span className="text-red-700 font-medium">
                        This field is required
                      </span>
                    )}
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      End Date
                    </label>
                    <input
                    type="date"
                      // onChange={(e) => setDescription(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      {...register("end_date", {
                        required: true,
                      })}
                    />
                    {errors.end_date && (
                      <span className="text-red-700 font-medium">
                        This field is required
                      </span>
                    )}
                  </div>


                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-blue-500 text-white active:bg-blue-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                      onClick={() => {
                        // addTaskHandler(title, description, projectId);
                        // setShowModal(false);
                      }}
                    >
                      Save Task
                    </button>
                  </div>
                </form>

                {/*footer*/}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
