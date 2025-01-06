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

export default function ProductTable() {
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
                    `${URL}/api/product?page=${pagination.pageIndex}&size=${pagination.pageSize}`
                );
                const result = await response.json();
                setData(result?.data || []);
                setRowCount(result?.totalItems || 0);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [pagination.pageIndex, pagination.pageSize]);

    const columns = useMemo(
        () => [
            
            {
                header: 'ID',
                accessorKey: '_id',

                enableEditing: false,
            },
            {
                header: 'Name',
                accessorKey: 'name',
            },
            {
                header: 'PDF',
                accessorKey: 'dataPdf',
                enableEditing: false,
                Cell: ({ cell }) => (
                    <a
                        href={`${URL}/api/product/download?file=${cell.getValue()}`}
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
                enableEditing: false,
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
                enableEditing: false,
            },
            {
                header: 'Date',
                accessorKey: 'date',
                enableEditing: false,
                Cell: ({ cell }) =>
                    new Date(cell.getValue()).toLocaleString(),
            },
        ],
        []
    );

        const handleEditingRowSave = async ({ table, values }) => {
            
            // Validate data and save it to the API
            console.log('Saving edited row values:', values);
    
            await fetch(`${URL}/api/product/${values._id}`, {
                            method: 'PUT',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                              // Replace these with your actual data fields
                              name: values.name,
                            }),
                          });
                         // setChange(!change)
            //values.name
            // Example of saving data
            // fetch(URL + '/api/save', { method: 'POST', body: JSON.stringify(values) });
    
            // Exit editing mode
            table.setEditingRow(null);
        };
    
        const handleEditingRowCancel = () => {
            // Clear any validation errors
            console.log('Edit canceled');
        };

    const table = useMaterialReactTable({
        columns,
        data,

        manualFiltering: true,
        manualSorting: true,
        manualPagination: true,


        enableEditing: true,
                editDisplayMode: 'modal',
                onEditingRowSave: handleEditingRowSave, // Correct
onEditingRowCancel: handleEditingRowCancel, // Correct



        enableColumnFilterModes: true,
        enableColumnOrdering: true,
        enableGrouping: true,
        enableColumnPinning: true,
        enableFacetedValues: true,
        enableRowActions: true,
        onPaginationChange: setPagination,
        rowCount,
        state: { pagination },
        renderRowActionMenuItems: ({ row, closeMenu }) => [
            
            
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
