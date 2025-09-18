import React from "react";
import { useDraggable } from "@dnd-kit/core";
import type { Task } from "../types.ts";

interface TaskCardProps {
    task: Task;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => { //React FC es functional componnte, q recibe props q cumplen ccon la interfax TaskCardProps
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: task.id,
    });

    const style = {
        padding: "10px",
        marginBottom: "8px",
        backgroundColor: "white",
        borderRadius: "4px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
        transform: transform
            ? `translate3d(${transform.x}px, ${transform.y}px, 0)` // el 0 es la profundidad
            : undefined,
    };

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {task.text}
        </div>
    )
};