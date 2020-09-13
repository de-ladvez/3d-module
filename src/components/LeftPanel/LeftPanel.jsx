import React from "react";
import {
    Link
} from "react-router-dom";
import leftPanel from "./LeftPanel.scss";

const LeftPanel = (props) => {
    return (
        <div className={leftPanel.row}>
            <Link to="/loadfile">Show 3D simulation</Link>
        </div>
    );
};

export default LeftPanel;