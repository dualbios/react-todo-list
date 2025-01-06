import React from "react";
import Button from "bootstrap/js/src/button.js";

export default function ToDoItem({id, text, isCompleted, onDeleteHandler, onEditHandler}) {
    return (
        <div className="d-flex justify-content-between align-items-center p-2 border mb-2">
            <span className="text-start">{text}</span>
            <div className="d-flex gap-2">
                <button className="btn btn-outline-primary" onClick={onEditHandler}>Edit</button>
                <button className="btn btn-outline-danger" onClick={onDeleteHandler}>Delete</button>
            </div>
        </div>
    );
}