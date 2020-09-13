import React from "react";
// import TopBar from "./TopBar/TopBar"
import Notification from "../Notification/Notification";
import { useLocation } from 'react-router-dom'

const Header = () => {
    const location = useLocation();

    const HandlerTopBar = () => {
        // if(location.pathname !== "/") {
            return (
                <div>
                    {/*<TopBar/>*/}
                    <Notification/>
                </div>
            )
        // }
        return "";
    };

    return (
        <HandlerTopBar/>
    );
};

export default Header;