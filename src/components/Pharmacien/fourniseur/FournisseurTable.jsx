import React, { useEffect, useState, useMemo } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import { Box, MenuItem, ListItemIcon } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { URL } from '../../../constants/Constants';

export default function FournisseurTable({willaya,nom}) {
    const [data, setData] = useState([]);
    const [rowCount, setRowCount] = useState(0);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 5,
    });

    // Fetch data from the API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    URL+`/api/auth?willaya=${willaya}&nom=${nom}&page=${pagination.pageIndex}&size=${pagination.pageSize}&category=Fournisseur`
                );
                const result = await response.json();
                setData(result?.data || []); // Assuming API response includes `data`
                setRowCount(result?.totalItems || 0); // Adjust if API response differs
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [pagination.pageIndex, pagination.pageSize,willaya,nom]);

    const columns = useMemo(
        () => [
            
            {
                header: 'Name',
                accessorKey: 'nom',
                Cell: ({ row }) => `${row.original.nom} ${row.original.prenom}`,
            },
            {
                header: 'Telephone',
                accessorKey: 'telephone',
            },
            {
                header: 'Email',
                accessorKey: 'email',
            },
            {
                header: 'Willaya',
                accessorKey: 'willaya',
            },
           
            {
                header: 'PDF',
                accessorKey: 'dataPdf',
                Cell: ({ cell }) => (
                    <a
                        href={URL+`/api/auth/download?file=${cell.getValue()}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {cell.getValue()}
                    </a>
                ),
            },
            {
                header: 'Date',
                accessorKey: 'date',
                Cell: ({ cell }) => new Date(cell.getValue()).toLocaleString(),
            },
        ],
        []
    );

    const table = useMaterialReactTable({
        columns,
        data,
        manualPagination: true,
        onPaginationChange: setPagination,
        rowCount,
        state: { pagination },
        renderRowActionMenuItems: ({ row, closeMenu }) => [
            <MenuItem
                key="view"
                onClick={() => {
                    closeMenu();
                    console.log('View:', row.original);
                }}
            >
                <ListItemIcon>
                    <VisibilityIcon />
                </ListItemIcon>
                View
            </MenuItem>,
            <MenuItem
                key="edit"
                onClick={() => {
                    closeMenu();
                    console.log('Edit:', row.original);
                }}
            >
                <ListItemIcon>
                    <EditIcon />
                </ListItemIcon>
                Edit
            </MenuItem>,
            <MenuItem
                key="delete"
                onClick={() => {
                    closeMenu();
                    console.log('Delete:', row.original);
                }}
            >
                <ListItemIcon>
                    <DeleteIcon />
                </ListItemIcon>
                Delete
            </MenuItem>,
        ],
    });

    return (
        <MaterialReactTable
            table={table}
            pagination={{
                pageIndex: pagination.pageIndex,
                pageSize: pagination.pageSize,
                onPageChange: (pageIndex) =>
                    setPagination((prev) => ({ ...prev, pageIndex })),
                onPageSizeChange: (pageSize) =>
                    setPagination((prev) => ({ ...prev, pageSize })),
            }}
        />
    );
}
