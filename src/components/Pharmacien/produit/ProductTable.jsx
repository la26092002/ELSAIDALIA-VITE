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

export default function ProductTable({productName}) {
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
                    URL+`/api/product?page=${pagination.pageIndex}&size=${pagination.pageSize}&productName=${productName}`
                );
                const result = await response.json();
                setData(result?.data || []); // Assuming API response includes `data`
                setRowCount(result?.totalItems || 0); // Adjust if API response differs
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [pagination.pageIndex, pagination.pageSize,productName]);

    const columns = useMemo(
        () => [
            
            {
                header: 'Name',
                accessorKey: 'name',
            },
            {
                header: 'PDF',
                accessorKey: 'dataPdf',
                Cell: ({ cell }) => (
                    <a
    href={URL+`/api/product/download?file=${cell.getValue()}`}  // Pass product ID as a query parameter
    target="_blank"
    rel="noopener noreferrer"
>
    {cell.getValue()}
</a>

                ),
            },
            {
                header: 'Actor',
                accessorKey: 'actor',
                Cell: ({ cell }) => {
                    const actor = cell.getValue();
                    return actor
                        ? `${actor.nom} ${actor.prenom} (${actor.email})`
                        : 'N/A';
                },
            },
            {
                header: 'Category',
                accessorKey: 'actor.category',
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
