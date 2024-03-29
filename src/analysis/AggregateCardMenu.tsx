import {
    Button,
    ControlGroup,
    Divider,
    EntityTitle,
    H4,
    H6,
    Menu,
} from '@blueprintjs/core';
import React from 'react';
import TableColumnSelect from '../components/TableColumnSelect';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { tableActions } from '../redux/tableSlice';
import { Aggregate, AggregateType } from '../types/analysisTypes';
import AggregateTypeSelect from './AggregateTypeSelect';

interface AggregateCardMenuProps {
    aggregate: Aggregate;
    setMenuIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AggregateCardMenu: React.FC<AggregateCardMenuProps> = ({
    aggregate,
    setMenuIsOpen,
}) => {
    const dispatch = useAppDispatch();
    const { columns } = useAppSelector((state) => state.table);
    const [updateAggregate, setUpdateAggregate] = React.useState<Aggregate>({
        ...aggregate,
    });

    const handleAggregateUpdate = () => {
        dispatch(tableActions.updateAggregate(updateAggregate));
        setMenuIsOpen(false);
    };

    const handleAggregateColumnSelect = (columnIndex: number) => {
        setUpdateAggregate((agg) => {
            return { ...agg, columnIndex: columnIndex };
        });
    };

    const handleAggregateTypeSelect = (type: AggregateType) => {
        setUpdateAggregate((agg) => {
            return { ...agg, type: type };
        });
    };

    const handleAggregateDelete = () => {
        dispatch(tableActions.deleteAggregate({ ...aggregate }));
    };

    const filterColIndexes = columns
        .filter((col) => {
            if (col.columnType === 'function') return false;
            else if (col.columnType === 'number') return false;
            else return true;
        })
        .map((col) => col.columnIndex);

    return (
        <Menu style={{ padding: 8, width: 240 }}>
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
                    minimal={true}
                />
            </div>
            <Divider />
            <ControlGroup
                fill={false}
                vertical={false}
                style={{
                    padding: 8,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}
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
                        selectedColumnIndex={updateAggregate.columnIndex}
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
                        currentType={updateAggregate.type}
                        onItemSelect={(aggType) =>
                            handleAggregateTypeSelect(aggType)
                        }
                    />
                </div>
            </ControlGroup>
            <Divider />
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
            >
                <Button intent="danger" onClick={() => setMenuIsOpen(false)}>
                    Close
                </Button>
                <Button intent="success" onClick={handleAggregateUpdate}>
                    Save
                </Button>
            </div>
        </Menu>
    );
};

export default AggregateCardMenu;
