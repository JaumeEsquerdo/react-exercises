import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { TaskCard } from './TaskCard';
import type { Task } from '../types';

interface ColumnProps {
    id: string;
    title: string;
    tasks: Task[];
}

export const Column: React.FC<ColumnProps> = ({ id, title, tasks }) => {
    const { setNodeRef } = useDroppable({ id });

    const getBackgroundColor = (status: string) => {
        switch (status) {
            case 'to-do':
                return '#ffdddd'; // rojo suave
            case 'in-progress':
                return "#fff3cd" // amarillo suave
            case "done":
                return '#d4edda'; // verde suave
            default:
                return '#f0f0f0'; // gris suave
        }
    }

    return (
        <div
            ref={setNodeRef}
            style={{
                padding: "10px",
                width: "250px",
                minHeight: "300px",
                backgroundColor: getBackgroundColor(id),
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