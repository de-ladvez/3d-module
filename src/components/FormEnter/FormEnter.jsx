import React, {useRef} from "react";
import {connect} from "react-redux";
import {
    setItemCsv,
    checkToEmptyDataItemCsv,
    updateDataForChartItemCsv
} from "../../action/actionCsvList";
import {dendersMomentsNotification} from "../../action/actionsNotif";
import CSVReader from "react-csv-reader";
import * as PapaParse from 'papaparse'
import style from "./FormEnter.css";
import csvFile from "./file/recordSensor.csv";
import {useHistory} from "react-router-dom";

let defaultCsvFile = "./file/recordSensor.csv";
const FormEnter = ({
                       csvList,
                       setItemCsv,
                       checkNotifs,
                       checkToEmptyDataItemCsv,
                       updateDataForChartItemCsv
                   }) => {
    let history = useHistory();

    const papaparseOptions = {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        transformHeader: header => header.toLowerCase().replace(/\W/g, "_")
    };

    function handleSendData() {
        checkToEmptyDataItemCsv().then(res => {
            updateDataForChartItemCsv();
            checkNotifs(csvList);

            history.push("/show");
            for (let item of csvList) {
                if (!item.active) {
                    return;
                }
            }
            console.log("OK!");
        });
    }

    return (
        <div className={style.row}>
            <div className={style.descriptionText}>
                Суть здесь в том что вы закидываете csv файл в котором хранятся записанные данные с устройства IoT
                и он выдает 3д модель с предупреждениями, например: что где-то модель наклонилось слишком сильно.
                Есть приложение на телефон Physics Toolbar Sensor Suite - это приложение записывает физическое состояние
                телефона по одному из параметров
                или нескольким параметрам, и там есть параметр g-Force meter и он был взят за основу в этом примере.<br/>
                Есть тестовая запись телефона /public/recordSensor.csv.
            </div>
            <div className={style.item}>
                <CSVReader
                    label="Select 'csv' file with file data"
                    onFileLoaded={(data, fileInfo) =>
                        setItemCsv({...data})
                    }
                    parserOptions={papaparseOptions}
                    value={defaultCsvFile}
                />
            </div>
            <div className={style.button} onClick={handleSendData}>
                Open 3d model
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    csvList: state.csvList
});

const mapDispatchToProps = dispatch => ({
    setItemCsv: data => {
        dispatch(setItemCsv(data));
    },
    checkNotifs: data => {
        dispatch(dendersMomentsNotification(data));
    },
    checkToEmptyDataItemCsv: async () => {
        try {
            await dispatch(checkToEmptyDataItemCsv());
            return "ok";
        } catch (e) {
            console.log("err ", e);
        }
    },
    updateDataForChartItemCsv: () => dispatch(updateDataForChartItemCsv())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FormEnter);
