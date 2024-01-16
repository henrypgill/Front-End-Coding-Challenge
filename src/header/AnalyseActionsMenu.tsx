import { Button, Menu, MenuItem, Popover } from '@blueprintjs/core';
import getAggregateValue from '../core/getAggregateValue';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { tableActions } from '../redux/tableSlice';

const NavAnalysisMenu: React.FC = () => {
    const dispatch = useAppDispatch();
    const data = useAppSelector((state) => state.table.data);

    const addMaximumAggregate = () => {
        dispatch(
            tableActions.addAggregate({
                type: 'maximum',
                columnIndex: 1,
                value: getAggregateValue(data[1], 'maximum'),
            }),
        );
    };
    const addMinimumAggregate = () => {
        dispatch(
            tableActions.addAggregate({
                type: 'minimum',
                columnIndex: 1,
                value: getAggregateValue(data[1], 'minimum'),
            }),
        );
    };

    const columnMenu = (
        <Menu>
            <MenuItem
                icon="arrow-top-right"
                onClick={() => addMaximumAggregate()}
                text="Maximum"
            />
            <MenuItem
                icon="arrow-bottom-left"
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

export default NavAnalysisMenu;
