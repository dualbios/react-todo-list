import React, { useState } from "react";
//import "./SidePanel.css"; // Import CSS for styling

const SidePanel = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const togglePanel = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <button className="toggle-button" onClick={togglePanel}>
                {isOpen ? "-" : "+"}
            </button>
            <div className={`side-panel-container ${isOpen ? "open" : "closed"}`}>
            <div className="side-panel">
                <h2>Side Panel</h2>
                <div>{children}</div>
            </div>
        </div>
        </div>
    );
};

export default SidePanel;
