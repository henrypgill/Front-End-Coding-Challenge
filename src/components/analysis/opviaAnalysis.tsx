import { Card, CardList, Icon, Section, SectionCard } from "@blueprintjs/core";
import * as React from 'react';
import { Aggregate } from "../../redux/analysisSlice";
import { useAppSelector } from "../../redux/store";
import getAggregateIcon from "./getAggregateIcon";

interface AggregateCardProps {
    aggregate: Aggregate
}
const AggregateCard: React.FC<AggregateCardProps> = ({aggregate}) => {

    const table = useAppSelector(state => state.table)
    const column = table.columns.find(col => col.columnIndex === aggregate.columnIndex)!



    return (
        <Card style={{flexDirection: "column", gap: 8}}>
            <div>
                <Icon icon={getAggregateIcon(aggregate.type)} size={20}/>
            </div>
            <div>

                <h2>
                    {`${aggregate.type} ${column.columnName}`}
                </h2>
                <h3>{aggregate.value}</h3>
            </div>
        </Card>
        
    )
}



const Analysis = () => {

    const analysis = useAppSelector(state => state.analysis)

    if (!analysis.aggregates[0]) return (<></>)
    const aggregateCards = analysis.aggregates.map(agg => <AggregateCard aggregate={agg} key={agg.aggregateId}/>)

    return (
        <Section>
            <SectionCard>
                <CardList>
                    {aggregateCards}
                </CardList>
            </SectionCard> 
        </Section>
    )

}

export default Analysis