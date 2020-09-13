import React, {useState} from "react";
import input from "./input.scss";

const Input = (props) => {
    const [active, setActive] = useState(false);

    const handleBlur = (e) => {
        if(!e.currentTarget.value){
            setActive(false);
        }
    };

    return (
        <div className={[input.row, props.class].join(" ")}>
            <div className={[input.input, active && input.active].join(" ")}>
                <label htmlFor={props.id} >{props.title}</label>
                <input
                    id={props.id}
                    name={props.name}
                    type={props.type}
                    value={props.value}
                    onChange={props.handleChange}
                    onFocus={()=>setActive(true)}
                    onBlur={handleBlur}
                    placeholder={props.placeholder}
                />
            </div>
        </div>

    )
};

export default Input;