import React from 'react';
import { useDroppable } from '@dnd-kit/core';

export const Trash: React.FC = () => {
    const { setNodeRef, isOver } = useDroppable({ id: "trash" })

    return (
        <div
            ref={setNodeRef}
            style={{
                marginTop: "20px",
                padding: "20px",
                textAlign: "center",
                backgroundColor: isOver ? "red" : "#ccc",
                color: "white",
                borderRadius: "8px",
            }}
        >
            Arrastra aquí para eliminar
        </div>
    );



}