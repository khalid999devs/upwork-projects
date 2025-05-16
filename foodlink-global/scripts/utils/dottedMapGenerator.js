// import {getMapJSON} from "dotted-map";

export function generateMapJSON({height,width,countries=['IND'],region,grid}){
    return getMapJSON({
        height,
        width,
        countries,
        region,
        grid,
    })
}


