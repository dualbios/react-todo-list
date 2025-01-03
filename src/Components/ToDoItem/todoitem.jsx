import React from "react";
import Button from "bootstrap/js/src/button.js";

export default function ToDoItem({id, text, isCompleted, onDeleteHandler, onEditHandler}) {
    return (
        <div className="container-xl text-center p-1">
            <div className="row bg-secondary rounded-1">
                <div className="col col-1">
                    <input type="checkbox"/>
                </div>
                <div className="col col-lg-1 text-end fs-5">
                    {text}
                </div>
                <div className="col col-lg-1 text-end fs-5">
                    {id}
                </div>
                <div className="col col-lg-3">
                    <div className="container">
                        <div className="row">
                            <div className="col col-6">
                                <button className="btn btn-primary">Edit</button>
                            </div>
                            <div className="col col-6">
                                <button className="btn btn-outline-danger" onClick={onDeleteHandler}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}