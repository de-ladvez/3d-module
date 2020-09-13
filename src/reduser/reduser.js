import {combineReducers} from "redux";
import csvList from "./reducerCsvList"
import notification from "./reduserNotif"
// import material from "./reduserMaterial"
// import containers from "./reduserContainer"
// import fillingContainers from "./reduserFillingContainer"
// import reservContainers from "./reduserReservContainer"
const reduserApp = combineReducers({
    notification,
    csvList,
    // material,
    // containers,
    // fillingContainers,
    // reservContainers
});

export default reduserApp;
