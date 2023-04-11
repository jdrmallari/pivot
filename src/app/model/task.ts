import { ISubTask } from "./subtask";

export interface ITask {
    //id: number,
    name: string;
    isCompleted: boolean,
    type?: string,
    description?: string,
    priority?: number,
    subtasks?: ISubTask[]
}