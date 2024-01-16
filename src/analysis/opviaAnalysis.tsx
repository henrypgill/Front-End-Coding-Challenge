import { OpviaTableColumn } from '../types/tableTypes';

    return (
        <Card
            style={cardStyle}
            onClick={() => setEditing(true)}
            interactive={true}
        >
            <div>
                <Icon icon={getAggregateIcon(aggregate.type)} size={20} />
            </div>
            <div>
                <h2>
                    {`${aggregate.type} ${column.columnName}`.toLowerCase()}
                </h2>
                <h3>{aggregate.value}</h3>
            </div>
        </Card>
    );
};

const Analysis = () => {
    const analysis = useAppSelector((state) => state.analysis);

    if (!analysis.aggregates[0]) return <></>;
    const aggregateCards = analysis.aggregates.map((agg) => (
        <AggregateCard aggregate={agg} key={agg.aggregateId} />
    ));

    return (
        <Section title={'Aggregates'}>
            <div className="flex-row">{aggregateCards}</div>
        </Section>
    );
};

export default Analysis;
