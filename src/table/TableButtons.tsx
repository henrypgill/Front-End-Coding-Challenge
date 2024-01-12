import * as React from 'react';

import { Cell, Column, Table2 } from '@blueprintjs/table';
import { dummyTableData } from '../data/dummyData';
import { ButtonGroup, Button, AnchorButton } from '@blueprintjs/core';


const TableButtons: React.FC = () => {

    const buttons = () => {
        return (
            <>
            <Button icon="database">Queries</Button>
            <Button icon="function">Functions</Button>
            <AnchorButton rightIcon="caret-down">Options</AnchorButton>
            </>
            )
    }

    return (
        <div>
            <ButtonGroup minimal={true} children={buttons()}>
            </ButtonGroup>
        </div>
    )

};

export default TableButtons;
