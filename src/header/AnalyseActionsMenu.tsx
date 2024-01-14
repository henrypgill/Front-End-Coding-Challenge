import { Button, Menu, MenuItem, Popover } from '@blueprintjs/core';
import getAggregateValue from '../analysis/getAggregateValue';
import { analysisActions } from '../redux/analysisSlice';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { TableNumberColumn } from '../redux/tableSlice';

const AnalyseActionsMenu: React.FC = () => {
    const dispatch = useAppDispatch();
    const data = useAppSelector((state) => state.table.data);

    const addMaximumAggregate = () => {
        dispatch(
            analysisActions.addAggregate({
                type: 'maximum',
                columnIndex: 1,
                value: getAggregateValue(
                    data[1] as TableNumberColumn,
                    'maximum',
                ),
            }),
        );
    };
    const addMinimumAggregate = () => {
        dispatch(
            analysisActions.addAggregate({
                type: 'minimum',
                columnIndex: 1,
                value: getAggregateValue(
                    data[1] as TableNumberColumn,
                    'minimum',
                ),
            }),
        );
    };

    const columnMenu = (
        <Menu>
            <MenuItem
                icon="add"
                onClick={() => addMaximumAggregate()}
                text="Maximum"
            />
            <MenuItem
                icon="minus"
                onClick={() => addMinimumAggregate()}
                text="Minimum"
            />
        </Menu>
    );

    return (
        <Popover content={columnMenu} fill={true} placement="bottom">
            <Button
                alignText="left"
                fill={true}
                icon="chart"
                rightIcon="caret-down"
                text="Analysis"
            />
        </Popover>
    );
};

export default AnalyseActionsMenu;
