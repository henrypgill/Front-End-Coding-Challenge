import {
    Button,
    Card,
    ControlGroup,
    Divider,
    EntityTitle,
    H4,
    H6,
    Icon,
    Menu,
    Popover,
} from '@blueprintjs/core';
import React from 'react';
import TableColumnSelect from '../components/TableColumnSelect';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { tableActions } from '../redux/tableSlice';
import { Aggregate, AggregateType } from '../types/analysisTypes';
import AggregateTypeSelect from './AggregateTypeSelect';
import getAggregateIcon from './getAggregateIcon';
interface AggregateCardProps {
    aggregate: Aggregate;
}
const AggregateCard: React.FC<AggregateCardProps> = ({ aggregate }) => {
    const dispatch = useAppDispatch();
    const { columns } = useAppSelector((state) => state.table);
    const [menuIsOpen, setMenuIsOpen] = React.useState(false);
    const updateAggregate = { ...aggregate };

    const handleAggregateUpdate = () => {
        dispatch(tableActions.updateAggregate(updateAggregate));
    };

    const handleAggregateColumnSelect = (columnIndex: number) => {
        updateAggregate.columnIndex = columnIndex;
    };

    const handleAggregateTypeSelect = (type: AggregateType) => {
        updateAggregate.type = type;
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
                                handleAggregateColumnSelect(col.columnIndex)
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
                                handleAggregateTypeSelect(aggType)
                            }
                        />
                    </div>
                </ControlGroup>
                <Divider />
                <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                    <Button intent="primary" onClick={handleAggregateUpdate}>
                        Save
                    </Button>
                </div>
            </Menu>
        );
    };

    return (
        <Card compact={true} style={cardStyle}>
            <Popover
                content={<AggregateCardMenuContent />}
                isOpen={menuIsOpen}
                placement="right"
            >
                <Button
                    icon="cog"
                    minimal={true}
                    intent="primary"
                    onClick={() => setMenuIsOpen(!menuIsOpen)}
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
