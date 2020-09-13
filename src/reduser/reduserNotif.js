import {
    ADD_NOTIFICATION,
    DELETE_NOTIFICATION,
    DANGERES_MOMENTS_NOTIFICATION
} from "../action/actionsNotif";


function notification(state = [], action) {

    switch (action && action.type) {
        case DANGERES_MOMENTS_NOTIFICATION:
            let acumx = [];
            let acumy = [];
            let gfx = [];
            let gfy = [];

            const gforce = action.data.find(el => {
                return el.name === "gForce";
            });
            const gFdata = gforce.data;

            for(let index in gFdata) {
                if (gFdata[index].gfx > 0.5 || gFdata[index].gfx < -0.5) {
                    if (!gfx.length) {
                        gfx.push({...gFdata[index], index});
                    }
                } else {
                    if (gfx.length === 1) {
                        gfx.push({...gFdata[index], index});
                        acumx.push({
                            index: gfx[0].index,
                            text: `с ${gfx[0].time} по ${gfx[1].time} был опасный наклон по (X)`
                        });
                        gfx = [];
                    }
                }

                if (gFdata[index].gfy > 0.5 || gFdata[index].gfy < -0.5) {
                    if (!gfy.length) {
                        gfy.push({...gFdata[index], index});
                    }
                } else {
                    if (gfy.length === 1) {
                        gfy.push({...gFdata[index], index});
                        acumy.push({
                            index: gfy[0].index,
                            text: `с ${gfy[0].time} по ${gfy[1].time} был опасный наклон по (Y)`
                        });
                        gfy = [];
                    }
                }
            }
            return [...state, ...acumx, ...acumy];
        case ADD_NOTIFICATION:
            console.log([...state, ...action.data]);
            return [...state, ...action.data, "000"];
        case DELETE_NOTIFICATION:
            return;
        default:
            return state;
    }
}

export default notification;