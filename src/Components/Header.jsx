import React from "react";
import {useSelector} from "react-redux";

export default function Header({children}) {
    const count = useSelector(state => state.itemCounterReducer.value)
    const completedCount = useSelector(state => state.itemCounterReducer.completedCount)

    return (
        <header>
            <div className="fs-1">ToDo list</div>
            <div className="d-flex ms-auto justify-content-end">
                <div>Total items: {count}</div>
                <div className="ms-3">Completed items: {completedCount}</div>
                {children}
            </div>
        </header>
    )
}