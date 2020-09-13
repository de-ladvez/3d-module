import {connect} from "react-redux";
import {useBus} from "react-bus";
import React, {useState} from "react";
import { useLocation } from 'react-router-dom';
import style from "./Notification.scss";

const mapStateToProps = state => ({
    notification: state.notification
});

const mapDispatchToProps = dispatch => ({});


const Notification = ({notification}) => {
    const location = useLocation();
    const bus = useBus();
    const [openNotifs, setOpenNotifs] = useState(true);

    const handlerOpenNotifs = () => {
        let res = notification.length ? !openNotifs : false;
        setOpenNotifs(res);
    };

    const handlerChangeCount = (index) => () => bus.emit("handlerChangeCount", index);

    const Link = (props) => {
        let pathname = location.pathname;
        if(pathname === "/show") {
            return(
                <div className={style.link} onClick={handlerChangeCount(props.index)}>Link</div>
            );
        }
        return "";

    };
    return (
        <div className={style.row}>
            <div className={style.head} onClick={() => handlerOpenNotifs()}>
                {notification.length}
            </div>

            <div className={[style.notifs, openNotifs ? style.active : ""].join(" ")}>
                {notification.map((item, index) => {
                    return (
                        <div key={index} className={style.item}>
                            <div className={style.close}></div>
                            <div className={style.text}>{item.text}</div>
                            <Link index={item.index}/>
                        </div>
                    )
                })}
            </div>
        </div>

    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Notification);


