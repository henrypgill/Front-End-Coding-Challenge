
import { useAppSelector } from '../../redux/store';
import OpviaTable from './OpviaTable';

const TableGroup = () => {
    const { data, columns } = useAppSelector((state) => state.opviaTable);

    return (
        <>
            <OpviaTable />
        </>
    );
};

export default TableGroup;
