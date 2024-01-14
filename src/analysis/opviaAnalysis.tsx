import {
    Button,
    Card,
    CardList,
    ControlGroup,
    Icon,
    Section,
    SectionCard,
} from '@blueprintjs/core';
import * as React from 'react';
import {
    Aggregate,
    AggregateType,
    AggregateUpdate,
    analysisActions,
} from '../redux/analysisSlice';
import { useAppDispatch, useAppSelector } from '../redux/store';
import getAggregateIcon from './getAggregateIcon';
import TableColumnSelect from '../components/TableColumnSelect';
import getAggregateValue from './getAggregateValue';
import AggregateTypeSelect from './AggregateTypeSelect';

interface AggregateCardProps {
    aggregate: Aggregate;
}
const AggregateCard: React.FC<AggregateCardProps> = ({ aggregate }) => {
    const dispatch = useAppDispatch();
    const {columns, data} = useAppSelector((state) => state.table);
    const column = columns.find(
        (col) => col.columnIndex === aggregate.columnIndex,
    )!;
    const [editing, setEditing] = React.useState(false);

    const handleAggregateUpdate = ({
        key,
        value,
    }: AggregateUpdate) => {
        let dispatchAction: Aggregate;
        if (key === 'type') {
            dispatchAction = {
                ...aggregate,
                type: value,
                value: getAggregateValue(data[column.columnIndex], value)
            };
        } else if (key === 'columnIndex') {
            dispatchAction = {
                ...aggregate,
                columnIndex: value,
                value: getAggregateValue(data[value], aggregate.type)

            };
        } else {
            dispatchAction = aggregate
        }

        dispatch(analysisActions.updateAggregate(dispatchAction));
    };

    const cardStyle: React.CSSProperties = {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: 200,
        rowGap: 8,
        height: 200,
    };

    const filterColIndexes = columns.filter((col) => col.columnType !== "number" ).map((col) => col.columnIndex)

    if (editing) {
        return (
            <Card
            style={cardStyle}
            interactive={true}
            >
                <div className='flex-col'>

                <TableColumnSelect
                    exclusionColumnIndexes={filterColIndexes}
                    selectedColumnIndex={aggregate.columnIndex}
                    onItemSelect={(col) =>
                        handleAggregateUpdate({
                            key: 'columnIndex',
                            value: col.columnIndex,
                        })
                    }
                    />
                <AggregateTypeSelect
                currentType={aggregate.type}
                onItemSelect={(aggType) =>
                    handleAggregateUpdate({
                        key: 'type',
                        value: aggType,
                    })
                }
                />
                <Button
                intent="primary"
                onClick={() => setEditing(false)}
                >
                    Done
                </Button>
                    </div>
            </Card>
        );
    }

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
                <h2>{`${aggregate.type} ${column.columnName}`}</h2>
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
        <Section title={"Aggregates"}>
            
                <div className='flex-row'>

                    {aggregateCards}
                </div>
        </Section>
    );
};

export default Analysis;
