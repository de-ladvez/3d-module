import React from "react";
import button from "./button.scss"

const Button = (props) => {
    console.log(props.style);
    return(
        <button
            className={[button.button, props.class].join(" ")}
            style= {props.style}
            onClick= {props.action}>
            {props.title}
        </button>)
}

export default Button;