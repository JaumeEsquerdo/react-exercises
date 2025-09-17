import React, { useState } from 'react';

interface Todo {
    text: string;
    completed: boolean;
}


export const ToDoPage = () => {
    const [task, setTask] = useState<string>('');
    const [todos, setTodos] = useState<Todo[]>([]);

    const handleAddTask = () => {
        if (task.trim() === '') return;
        setTodos([...todos, { text: task, completed: false }]);
        setTask('');
    }

    const handleDeleteTask = (index: number) => {
        setTodos(todos.filter((_, i) => i !== index));
    }

    const handleToggleTask = (index: number) => {
        setTodos(
            todos.map((todo, i) => i === index ? { ...todo, completed: !todo.completed } : todo)
        )
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleAddTask();
    }
    return (
        <div className='flex flex-col items-center justify-center w-screen
        h-screen bg-blue-500 '>
            <h1 className=' text-white'> ToDo list</h1>
            {/* input y boton */}
            <form onSubmit={(e) => { e.preventDefault(); handleAddTask(); }}>
                <input type="text"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder='escribe una tarea'
                />

                <button type='submit'>Añadir</button>
            </form>

            {/* lista de tareas */}
            <ul>
                {todos.map((todo, index) => (
                    <li key={index}>
                        <span onClick={() => { handleToggleTask(index) }}
                            className={`cursor-pointer ${todo.completed? " line-through text-gray-500": ""}`}
                            >
                            {todo.text}
                        </span>
                        <button onClick={() => handleDeleteTask(index)}>Borrar tarea</button>
                    </li>
                ))}
            </ul>
        </div>

    );

}