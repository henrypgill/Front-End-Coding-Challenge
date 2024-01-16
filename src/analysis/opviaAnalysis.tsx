import { Card, EntityTitle, H4, Section } from '@blueprintjs/core';
import { useAppSelector } from '../redux/store';
import { Aggregate } from '../types/analysisTypes';
import AggregateCard from './AggregateCard';

interface AnalysisColumnSectionProps {
    columnName: string;
    aggregates: Aggregate[];
}

const AnalysisColumnSection: React.FC<AnalysisColumnSectionProps> = ({
    columnName,
    aggregates,
}) => {
    const aggregateCards = () =>
        aggregates.map((agg) => (
            <AggregateCard key={agg.aggregateId} aggregate={agg} />
        ));
    return (
        <Card
            style={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: 8,
            }}
        >
            <EntityTitle title={columnName} heading={H4} />
            {aggregateCards()}
        </Card>
    );
};

const Analysis = () => {
    const {
        analysis: { aggregates },
        columns,
    } = useAppSelector((state) => state.table);

    if (!aggregates[0]) return <></>;
    const aggregateCards = aggregates.map((agg) => (
        <AggregateCard aggregate={agg} key={agg.aggregateId} />
    ));

    const analysisColumnSections = columns.map((col) => {
        const colAggregates = aggregates.filter(
            (agg) => agg.columnIndex === col.columnIndex,
        );
        if (!colAggregates[0]) return undefined;
        return (
            <AnalysisColumnSection
                columnName={col.columnName}
                aggregates={colAggregates}
                key={col.columnId}
            />
        );
    });

    return (
        <Section
            title={'Analysis'}
            icon="chart"
            style={{
                padding: 16,
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
            }}
        >
            <div
                style={{
                    padding: 8,
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    columnGap: 16,
                }}
            >
                {analysisColumnSections}
            </div>
        </Section>
    );
};

export default Analysis;
