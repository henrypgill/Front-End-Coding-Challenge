import * as React from 'react';

import { Cell, Column, Table2 } from '@blueprintjs/table';
import { dummyTableData } from '../../data/dummyData';
import { ButtonGroup, Button, AnchorButton } from '@blueprintjs/core';
import { useAppDispatch } from '../../redux/store';
import { opviaTableActions } from '../../redux/opviaTableSlice';
import ColumnActionsMenu from './ColumnActionsMenu';
import AnalyseActionsMenu from './AnalyseActionsMenu';

const TableButtons: React.FC = () => {
    return (
        <div>
            <ButtonGroup minimal={true}>
                <ColumnActionsMenu />
            </ButtonGroup>
        </div>
    );
};

export default TableButtons;
