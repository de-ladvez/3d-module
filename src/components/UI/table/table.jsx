import React from "react";
import style from "./table.scss";

const Thead = (props) => {
    const allHead = () => props.body && props.body.length ? Object.keys(props.body[0]) : [];

    return (
        <thead>
        <tr>
            {props.head ?
                props.head.map((item, index) => (
                    <th key={index}>{item}</th>
                )) :
                allHead().map((item, index) => (
                    <th key={index}>{item}</th>
                ))}
        </tr>
        </thead>
    )
};

const Tbody = (props) => {
    const allElements = (item) => {
        const keys = Object.keys(item);
        return keys.reduce((acum, i) => {
            acum.push(item[i]);
            return acum;
        }, []);
    };

    const keysElement = (item) => props.bodyKeys.reduce((acum, i) => {
        acum.push(item[i]);
        return acum;
    }, []);

    return (
        <tbody>
        {props.body.map((item, index) => (
            <tr key={index}>

                {props.bodyKeys ?
                    keysElement(item).map((el, index) => (
                        <td key={index}>{el}</td>
                    )) :
                    allElements(item).map((el, index) => (
                        <td key={index}>{el}</td>
                    ))}
            </tr>
        ))}
        </tbody>
    );
};


export const Table = (props) => {
    return (
        <table className={style.table}>
            <Thead head={props.head} body={props.body}/>
            <Tbody body={props.body} bodyKeys={props.bodyKeys}/>
        </table>
    );
};

export default Table;