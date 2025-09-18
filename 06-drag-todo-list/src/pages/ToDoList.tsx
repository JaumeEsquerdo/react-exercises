import React, { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';

import { Column } from '../components/Column';
import { Trash } from '../components/Trash';
import type { Task, Status } from '../types'

interface ToDoListProps {
    todos?: Task[];
}

const ToDoList: React.FC<ToDoListProps> = ({ todos }) => {
    const [tasks, setTasks] = useState<Task[]>(todos || []);
    const [newTaskText, setNewTaskText] = useState("");


    const addTask = () => {
        if (!newTaskText.trim()) return
        const newTask: Task = {
            id: Date.now(),
            text: newTaskText,
            status: "to-do",
        }
        setTasks([...tasks, newTask]); // se coloca
        setNewTaskText(""); // y se reinicia
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event; // se utiliza over para saber en q columna esta mediante el over.id

        if (!over) return // si la zona del drop es null se acaba

        const taskId = Number(active.id);
        const task = tasks.find((t) => t.id === taskId)
        if (!task) return

        if (over.id === "trash") {
            setTasks(tasks.filter((t) => t.id !== taskId));
            return
        }

        const newStatus = over.id as Status; // over.id es el id de la columna donde suelta la tarjeta
        if (task.status !== newStatus) { // si el status de la tarea es diferente al de la columna...
            setTasks(
                tasks.map((t) =>
                    t.id === taskId ? { ...t, status: newStatus } : t // se crea una copia del objeto cambiando el estado de la tarea
                )
            )
        }
    }

    return (
        <div style={{ padding: "20px" }}>
            <h1>Kanban ToDo</h1>
            <input
                type="text"
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                placeholder="Nueva tarea"
            />
            <button onClick={addTask}>Agregar</button>

            <DndContext onDragEnd={handleDragEnd}>
                <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
                    <Column
                        id="to-do"
                        title="To Do"
                        tasks={tasks.filter((t) => t.status === "to-do")}
                    />
                    <Column
                        id="in-progress"
                        title="In Progress"
                        tasks={tasks.filter((t) => t.status === "in-progress")}
                    />
                    <Column
                        id="done"
                        title="Done"
                        tasks={tasks.filter((t) => t.status === "done")}
                    />
                </div>
                <Trash />
            </DndContext>
        </div>
    )
}

export default ToDoList;