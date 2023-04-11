export interface ISubTask {
    //id: number,
    name: string;
    isSubTaskCompleted: boolean,
    description?: string,
    priority?: number,
    level: number
}