import React from 'react';
import {connect} from "react-redux";
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import InputCsv from "./InputCsv";
import style from "./root.scss";
import VueModel from "./VueModel";
import DefaultLayout from "../layouts/Default"
import {RouteWrapper} from "../util/route";

function ScreensRoot({csvList}) {

    return (
        <div className={style.App}>
            <Switch>
                <Route exact path="/" component={InputCsv} />
                    <RouteWrapper path="/show" component={VueModel} layout={DefaultLayout} isData={csvList[0].data.length}/>
                </Switch>
        </div>
    );
}

const mapStateToProps = state => ({
    csvList: state.csvList
});

export default connect(
mapStateToProps,
{}
)(ScreensRoot);

