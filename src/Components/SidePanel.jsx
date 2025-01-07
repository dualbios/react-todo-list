import React, {useState} from "react";
import closeIconUrl from "../../src/assets/close.svg";

const SidePanel = ({children}) => {
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
                <div className="side-panel" style={{display: "flex", alignItems: "start"}}>
                    <button className="panelCloseButton "
                            onClick={togglePanel}>
                        <img src={closeIconUrl}
                             alt="close"
                             style={{width: "12px", height: "12px", marginRight: "0px", padding:"0px"}}/>
                    </button>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default SidePanel;
