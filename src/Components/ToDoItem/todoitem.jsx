import React from "react";
import Button from "bootstrap/js/src/button.js";

export default function ToDoItem({id, text, isCompleted, onDeleteHandler, onEditHandler, onCompleteHandler}) {
    return (
        <div className="d-flex justify-content-between align-items-center p-2 border mb-2">
            <div className="form-check me-2">
                <input className="form-check-input" type="checkbox" id="checkbox" checked={isCompleted}/>
                <label className="form-check-label" htmlFor="checkbox">
                    {/* Optional label text */}
                </label>
            </div>
            <span className={`text-start flex-grow-1 ${isCompleted ? 'text-decoration-line-through' : ''}`}>{text}</span>
            <div className="d-flex gap-2">
                <button className="btn btn-outline-primary" onClick={onEditHandler} disabled={isCompleted}>Edit</button>
                <button className="btn btn-outline-danger" onClick={onDeleteHandler} disabled={isCompleted}>Delete
                </button>
                <button className="btn btn-outline-info" onClick={onCompleteHandler} disabled={isCompleted}>Complete
                </button>
            </div>
        </div>
    );
}