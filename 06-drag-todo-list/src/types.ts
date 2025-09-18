export type Status = "to-do" | "in-progress" | "done";

export interface Task {
    id: number;
    text: string;
    status: Status;
}
