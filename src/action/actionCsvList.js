export const SET_ITEM_CSV = "SET_ITEM_CSV";
export const CHECK_TO_EMPTY_DATA_ITEM_CSV = "CHECK_TO_EMPTY_DATA_ITEM_CSV";
export const UPDATE_DATA_FOR_CHARTS_ITEM_CSV = "UPDATE_DATA_FOR_CHARTS_ITEM_CSV";

export function updateDataForChartItemCsv(data) {
    return {
        type: UPDATE_DATA_FOR_CHARTS_ITEM_CSV,
        data
    }
}

export function checkToEmptyDataItemCsv(data) {
    return {
        type: CHECK_TO_EMPTY_DATA_ITEM_CSV,
        data
    }
}

export function setItemCsv(data) {
    return {
        type: SET_ITEM_CSV,
        data
    }
}
