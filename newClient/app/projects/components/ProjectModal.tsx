import { Input } from "postcss";
import React, { useState } from "react";
import useStore from "@/store/projectStrore";
import projectApi from "@/apis/projectApi ";
import { ModalProps, Project } from "@/interfaces";
import { useForm, SubmitHandler } from "react-hook-form";
import ButtonLoading from "@/components/ButtonLoading";

type Inputs = {
  title: string;
  description: string;
};

const Modal: React.FC<ModalProps> = ({ showModal, setShowModal }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const store = useStore();
  const [loading, setLoading] = useState(false);
  const { addProject } = projectApi();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    addProjectHandler(data.title, data.description);
  };

  const addProjectHandler = (title: string, description: string) => {
    addProject(title, description).then((newProject) => {
      setLoading(true);

      store.addProject({
        _id: newProject._id,
        title: title,
        description: description,
        tasks: [],
      });
    });
    setShowModal(false);
    reset()
  };

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-4xl">
              {/*content*/}
              <div
                className="border-0 rounded-lg shadow-lg relative flex flex-col  bg-white outline-none focus:outline-none "
                style={{ width: "28rem" }}
              >
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Add project</h3>
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
                  className="bg-white shadow-md rounded px-8 pt-6 pb-8 "
                >
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Project Title
                    </label>
                    <input
                      // required
                      // onChange={(e) => setTitle(e.target.value)}
                      {...register("title", {
                        required: true,
                      })}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      name="title"
                      type="text"
                      placeholder="Project Title"
                    />
                    {errors.title && (
                      <span className="text-red-700 font-medium">
                        This field is required
                      </span>
                    )}
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Project Description
                    </label>
                    <textarea
                      // required
                      // onChange={(e) => setDescription(e.target.value)}
                      {...register("description", {
                        required: true,
                      })}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.description && (
                      <span className="text-red-700 font-medium">
                        This field is required
                      </span>
                    )}
                  </div>

                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    onClick={() =>{ setShowModal(false);reset()}}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="bg-emerald-500 w-46 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    onClick={() => {
                      // addProjectHandler();
                      // setShowModal(false);
                    }}
                  >
                    {loading ? <ButtonLoading /> : "Save"}
                  </button>
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
