import {
    SET_ITEM_CSV,
    CHECK_TO_EMPTY_DATA_ITEM_CSV,
    UPDATE_DATA_FOR_CHARTS_ITEM_CSV
} from "../action/actionCsvList";

const initialState = [
    {
        name: "gForce",
        data: [],
        nameFile: "",
        active: 2,
        typeForChart: [
            ["time", "gfx"],
            ["time", "gfy"],
            ["time", "gfz"],
        ],
        dataChart: []
    },
    {
        name: "acelerometer",
        data: [],
        nameFile: "",
        active: 2,
        typeForChart: [
            ["time", "ax"],
            ["time", "ay"],
            ["time", "az"]
        ],
        dataChart: {}
    },
    {
        name: "gyroscope",
        data: [],
        nameFile: "",
        active: 2,
        typeForChart: [
            ["time", "wx"],
            ["time", "wy"],
            ["time", "wz"]
        ],
        dataChart: []
    },
    {
        name: "gps",
        data: [],
        nameFile: "",
        active: 2,
        typeForChart: [["time", "latitude"], ["time", "longitude"], ["time", "speed__m_s_"]],
        dataChart: []
    }
];

function csvList(state = initialState, action) {
    switch (action && action.type) {
        case SET_ITEM_CSV:
            let copy = [...state];
            for(let item in action.data)  {
                let copyItem = {...action.data[item]};
                for(let list of copy){

                    let el = {};
                    for(let typeItem of list.typeForChart){
                        el[typeItem[1]] = typeof copyItem[typeItem[1]] === "string" ?
                            parseFloat(copyItem[typeItem[1]].replace(/\,/g, ".")):
                            copyItem[typeItem[1]];
                    }

                    list.data.push({"time": copyItem.time, ...el});
                }
            }
            return copy;
        default:
            return state;
    }
}

export default csvList;