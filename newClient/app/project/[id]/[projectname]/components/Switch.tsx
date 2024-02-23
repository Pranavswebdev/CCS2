import { SwitchProps } from "@/interfaces";
import React from "react";

const Switch: React.FC<SwitchProps> = ({
  task,
  name,
  onStatusChangeHandler,
}) => {
  console.log({ task }, "in Switch");

  return (
    <>
      <ul className="items-center w-full cursor-pointer text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
          <div className="flex items-center ps-3">
            <input
              onClick={(e) => onStatusChangeHandler(e.target.value, name)}
              defaultChecked={task.status === "pending"}
              id="horizontal-list-radio-license"
              type="radio"
              value="pending"
              name={`${name}`}
              className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
            />
            <label className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
         Open
            </label>
          </div>
        </li>
        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
          <div className="flex items-center ps-4">
            <input
              onClick={(e) => onStatusChangeHandler(e.target.value, name)}
              defaultChecked={task.status === "in_progress"}
              id="horizontal-list-radio-id"
              type="radio"
              value="in_progress"
              name={`${name}`}
              className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
            />
            <label className="w-full py-3 ms-2 mx-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              InProgress
            </label>
          </div>
        </li>
        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
          <div className="flex items-center ps-3">
            <input
              onClick={(e) => onStatusChangeHandler(e.target.value, name)}
              defaultChecked={task.status === "completed"}
              id="horizontal-list-radio-military"
              type="radio"
              value="completed"
              name={`${name}`}
              className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
            />
            <label className="w-full py-3 mx-2 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Completed
            </label>
          </div>
        </li>
      </ul>
    </>
  );
};

export default Switch;
