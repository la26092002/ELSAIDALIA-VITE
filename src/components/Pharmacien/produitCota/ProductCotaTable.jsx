import React, { useEffect, useState, useMemo } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import { Box, MenuItem, ListItemIcon, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { URL } from '../../../constants/Constants';

export default function ProductCotaTable() {
    const [data, setData] = useState([]);
    const [rowCount, setRowCount] = useState(0);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 5,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [refresh, setRefresh] = useState(false); // Added to trigger data refresh

    // Fetch data from the API
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(
                    `${URL}/api/productCota?page=${pagination.pageIndex}&size=${pagination.pageSize}&date=true`
                );
                const result = await response.json();
                console.log('API Response:', result);
                setData(result.data || []);
                setRowCount(result.totalItems || 0);
            } catch (error) {
                setError('Error fetching data');
                console.error('Fetch error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [pagination, refresh]);

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
                        href={`${URL}/api/productCota/download?file=${cell.getValue()}`}
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
                        ? `${actor.nom} ${actor.prenom} (${actor.email}) (${actor.telephone})`
                        : 'N/A';
                },
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
        try {
            await fetch(`${URL}/api/productCota/${values._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: values.name,
                }),
            });
            setRefresh(!refresh); // Trigger data refresh
            table.setEditingRow(null); // Exit editing mode
        } catch (error) {
            console.error('Error saving row:', error);
        }
    };

    const handleEditingRowCancel = () => {
        console.log('Edit canceled');
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${URL}/api/productCota/toggle-delete/${id}`, {
                method: 'PUT',
            });

            if (!response.ok) {
                console.error('Failed to toggle delete:', await response.json());
                return;
            }

            const result = await response.json();
            console.log('Delete toggled:', result);
            setRefresh(!refresh); // Trigger data refresh
        } catch (error) {
            console.error('Error toggling delete:', error);
        }
    };

    const table = useMaterialReactTable({
        columns,
        data,
        manualPagination: true,
        onPaginationChange: setPagination,
        rowCount,
        state: { pagination },
        enableEditing: true,
        editDisplayMode: 'modal',
        onEditingRowSave: handleEditingRowSave,
        onEditingRowCancel: handleEditingRowCancel,
        enableColumnFilterModes: true,
        enableColumnOrdering: true,
        enableGrouping: true,
        enableColumnPinning: true,
        enableFacetedValues: true,
        enableRowActions: true,
        renderRowActionMenuItems: ({ row, closeMenu }) => [
            <MenuItem
                key="delete"
                onClick={() => {
                    closeMenu();
                    handleDelete(row.original._id);
                }}
            >
                <ListItemIcon>
                    <DeleteIcon />
                </ListItemIcon>
                {row.original.delete ? 'Restore' : 'Delete'}
            </MenuItem>,
        ],
    });

    return (
        <Box position="relative">
            {loading && (
                <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    bgcolor="rgba(255, 255, 255, 0.7)"
                    zIndex={1}
                >
                    <CircularProgress />
                </Box>
            )}
            {error && <div>{error}</div>}
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
        </Box>
    );
}