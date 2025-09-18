import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { TaskCard } from './TaskCard';
import type { Task, Status } from '../types';


interface ColumnProps {
    id: Status; // el id de la columna es un Status válido, lo que asegura que siempre tenga un color en "colors"
    title: string;
    tasks: Task[];
}


// "colors" es un objeto que asocia cada Status con un color.
// Record<Status, string> garantiza que TODOS los estados definidos en Status tengan un color.
const colors: Record<Status, string> = {
    'to-do': '#ffdddd',
    'in-progress': '#fff3cd',
    'done': '#d4edda',
};

export const Column: React.FC<ColumnProps> = ({ id, title, tasks }) => {
    const { setNodeRef } = useDroppable({ id });

    // const getBackgroundColor = (status: string) => {
    //     switch (status) {
    //         case 'to-do':
    //             return '#ffdddd'; // rojo suave
    //         case 'in-progress':
    //             return "#fff3cd" // amarillo suave
    //         case "done":
    //             return '#d4edda'; // verde suave
    //         default:
    //             return '#f0f0f0'; // gris suave
    //     }
    // }

    return (
        <div
            ref={setNodeRef}
            style={{
                padding: "10px",
                width: "250px",
                minHeight: "300px",
                backgroundColor: colors[id],
                borderRadius: "8px"
            }}
        >
            <h2>{title}</h2>
            {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
            ))}
        </div>
    )
}