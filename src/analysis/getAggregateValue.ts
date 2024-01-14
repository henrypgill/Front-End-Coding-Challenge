import { AggregateType } from "../redux/analysisSlice";
import { TableNumberColumn } from "../redux/tableSlice";




    const data: number[] = []
    for (let row in columnData) {
        data.push(columnData[row])
    }

    switch (type) {
        case "maximum":
            return Math.max(...data);
        case "minimum":
            return Math.min(...data);
    }

}


export default getAggregateValue