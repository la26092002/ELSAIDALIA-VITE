import React, { useEffect, useState, useMemo } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import { MenuItem, ListItemIcon } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { URL } from '../../../constants/Constants';

export default function ProductCotaTable({ refresh }) {
    const [dataa, setData] = useState([]);
    const [rowCount, setRowCount] = useState(0);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 5,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const id = await localStorage.getItem('actor');
                const response = await fetch(
                    URL + `/api/productCota?page=${pagination.pageIndex}&size=${pagination.pageSize}&date=true&id=${id}`
                );
                const result = await response.json();
                console.log('API Response:', result);
                setData(result.data || []);
                setRowCount(result.totalItems || 0);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchData();
    }, [pagination, refresh]);

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
                        href={URL + `/api/productCota/download?file=${cell.getValue()}`}
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
                header: 'Date',
                accessorKey: 'date',
                Cell: ({ cell }) => new Date(cell.getValue()).toLocaleString(),
            },
        ],
        []
    );

    const table = useMaterialReactTable({
        columns,
        data: dataa,
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
