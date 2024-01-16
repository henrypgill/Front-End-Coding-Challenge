import { Card, Button, Icon, Divider, Popover, MenuItem } from '@blueprintjs/core';
import React from 'react';
import TableColumnSelect from '../components/TableColumnSelect';
import {
    Aggregate,
    AggregateUpdate,
    analysisActions,
} from '../redux/analysisSlice';
import { useAppDispatch, useAppSelector } from '../redux/store';
import AggregateTypeSelect from './AggregateTypeSelect';
import getAggregateIcon from './getAggregateIcon';
import getAggregateValue from './getAggregateValue';
import { Menu } from '@blueprintjs/icons';
interface AggregateCardProps {
    aggregate: Aggregate;
}
const AggregateCard: React.FC<AggregateCardProps> = ({ aggregate }) => {
    const dispatch = useAppDispatch();
    const { columns, data } = useAppSelector((state) => state.table);
    const column = columns.find(
        (col) => col.columnIndex === aggregate.columnIndex,
    )!;

    const handleAggregateUpdate = ({ key, value }: AggregateUpdate) => {
        let dispatchAction: Aggregate;
        if (key === 'type') {
            dispatchAction = {
                ...aggregate,
                type: value,
                value: getAggregateValue(data[column.columnIndex], value),
            };
        } else if (key === 'columnIndex') {
            dispatchAction = {
                ...aggregate,
                columnIndex: value,
                value: getAggregateValue(data[value], aggregate.type),
            };
        } else {
            dispatchAction = aggregate;
        }

        dispatch(analysisActions.updateAggregate(dispatchAction));
    };

    const filterColIndexes = columns
        .filter((col) => {
            if (col.columnType === 'function') return false;
            else if (col.columnType === 'number') return false;
            else return true;
        })
        .map((col) => col.columnIndex);

    const AggregateCardMenuContent: React.FC = () => {
        return (
            <>
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
                <Button intent="primary" onClick={() => {}}>
                    save
                </Button>
            </>
        );
    };

    return (
        <Card
            compact={true}
            style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
            }}
        >
            <Popover
            content={<AggregateCardMenuContent />}
            placement='bottom'
            
            >
                <Button
                    icon="cog"
                    minimal={true}
                    onClick={() => {}}
                />
            </Popover>
            <Icon icon={getAggregateIcon(aggregate.type)} size={20} />
            <Divider />
            <h2>{`${aggregate.type} ${column.columnName}`.toLowerCase()}</h2>
            <Divider />
            <h3>{aggregate.value}</h3>
        </Card>
    );
};

export default AggregateCard;
