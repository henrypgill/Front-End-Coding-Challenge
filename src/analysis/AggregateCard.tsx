import {
    Card,
    Button,
    Icon,
    Divider,
    Popover,
    MenuItem,
    Menu,
    ControlGroup,
    EntityTitle,
    H4,
    H5,
    H6,
} from '@blueprintjs/core';
import React from 'react';
import TableColumnSelect from '../components/TableColumnSelect';
import { useAppDispatch, useAppSelector } from '../redux/store';
import AggregateTypeSelect from './AggregateTypeSelect';
import getAggregateIcon from './getAggregateIcon';
import getAggregateValue from '../core/getAggregateValue';
import { Aggregate, AggregateUpdate } from '../types/analysisTypes';
import { tableActions } from '../redux/tableSlice';
interface AggregateCardProps {
    aggregate: Aggregate;
}
const AggregateCard: React.FC<AggregateCardProps> = ({ aggregate }) => {
    const dispatch = useAppDispatch();
    const { columns, data } = useAppSelector((state) => state.table);
    const [editing, setEditing] = React.useState(false);

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

        dispatch(tableActions.updateAggregate(dispatchAction));
    };

    const handleAggregateDelete = () => {
        dispatch(tableActions.deleteAggregate(aggregate));
    };

    const filterColIndexes = columns
        .filter((col) => {
            if (col.columnType === 'function') return false;
            else if (col.columnType === 'number') return false;
            else return true;
        })
        .map((col) => col.columnIndex);

    const cardStyle: React.CSSProperties = {
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        columnGap: 8,
        height: 60,
        width: 240,
    };
    const AggregateCardMenuContent: React.FC = () => {
        return (
            <Menu style={{ padding: 8 }}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <EntityTitle title={'Settings'} heading={H4} />
                    <Button
                        icon="trash"
                        intent="danger"
                        onClick={handleAggregateDelete}
                    ></Button>
                </div>
                <Divider />
                <ControlGroup
                    fill={false}
                    vertical={false}
                    style={{ padding: 8 }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            rowGap: 4,
                        }}
                    >
                        <EntityTitle title={'Column'} heading={H6} />

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
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            rowGap: 4,
                        }}
                    >
                        <EntityTitle title={'Type'} heading={H6} />

                        <AggregateTypeSelect
                            currentType={aggregate.type}
                            onItemSelect={(aggType) =>
                                handleAggregateUpdate({
                                    key: 'type',
                                    value: aggType,
                                })
                            }
                        />
                    </div>
                </ControlGroup>
            </Menu>
        );
    };

    return (
        <Card compact={true} style={cardStyle}>
            <Popover content={<AggregateCardMenuContent />} placement="right">
                <Button
                    icon="cog"
                    minimal={true}
                    onClick={() => setEditing(true)}
                />
            </Popover>
            <Divider style={{ height: '100%' }} />
            <Icon icon={getAggregateIcon(aggregate.type)} size={20} />
            <h4>{`${aggregate.type}:`.toLowerCase()}</h4>
            <h4>{aggregate.value}</h4>
        </Card>
    );
};

export default AggregateCard;
