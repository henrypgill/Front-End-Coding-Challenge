import { Card, Section } from '@blueprintjs/core';
import { useAppSelector } from '../redux/store';
import AggregateCard from './AggregateCard';
import { OpviaTableColumn } from '../types/tableTypes';

const AnalysisColumnSection: React.FC<OpviaTableColumn> = (column) => {
    return <Card></Card>;
};

const Analysis = () => {
    const { analysis } = useAppSelector((state) => state.table);

    if (!analysis.aggregates[0]) return <></>;
    const aggregateCards = analysis.aggregates.map((agg) => (
        <AggregateCard aggregate={agg} key={agg.aggregateId} />
    ));

    return (
        <Section
            title={'Analysis'}
            style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                columnGap: 16,
            }}
        >
            {aggregateCards}
        </Section>
    );
};

export default Analysis;
