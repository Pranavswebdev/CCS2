// types.ts

export interface UserData {
  name: string;
  email: string;
  _id: string;
}

export interface ProjectCardProps {
  data: Project;
  index: number;
}

export interface ProjectData {
  _id: string;
  title: string;
  description: string;
  status: Boolean;
  start_date: Date;
  end_date: Date;
}

export interface Project {
  _id: number;
  title: string;
  description: string;
  tasks: number[];
}

export interface Login {
  message: string;
  user: User;
  token: string;
  success: boolean;
}

export interface Task {
  _id: number;
  name: string;
  description: string;
  status: String;
  start_date: Date;
  end_date: Date;
}

export interface ITaskCard {
  task: Task;
  onStatusChangeHandler: (value: boolean, taskId: number) => void;
}

export interface ModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export type SwitchProps = {
  task: Task;
  name: number;
  onStatusChangeHandler: (value: boolean, taskId: number) => void;
};
