import React from "react";
import PropTypes from "prop-types";
import deflayout from "./Default.scss";
import LeftPanel from "../components/LeftPanel/LeftPanel"
import Header from "../components/Header/Header"

export default function DefaultLayout({children}) {
    return (
        <div className={deflayout.row}>
            <div>
                <LeftPanel/>
            </div>
            <div className={deflayout.container}>
                <Header/>
                {children}
            </div>

        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.element.isRequired
};