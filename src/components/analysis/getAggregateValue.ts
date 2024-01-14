import { AggregateType } from "../../redux/analysisSlice";



const getAggregateValue = (columnData: {
    [key: string]:  number;
}, type: AggregateType) => {

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