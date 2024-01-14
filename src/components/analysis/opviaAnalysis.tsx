import { Card, CardList, Icon, Section, SectionCard } from "@blueprintjs/core";
import * as React from 'react';
import { Aggregate } from "../../redux/analysisSlice";
import { useAppSelector } from "../../redux/store";
import getAggregateIcon from "./getAggregateIcon";

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

