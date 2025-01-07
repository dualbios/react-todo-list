import React from "react";
import {useSelector} from "react-redux";

export default function Header() {
    const count = useSelector(state => state.counter.value)
    
    return (
        <header>
            <div className="fs-1">ToDo list</div>
            <div className="ms-auto">Total items : {count}</div>
        </header>
    )
}