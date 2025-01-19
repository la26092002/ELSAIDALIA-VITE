import React, { useEffect, useState, useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Box, MenuItem, ListItemIcon } from '@mui/material';
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
                    `${URL}/api/productCota?page=${pagination.pageIndex}&size=${pagination.pageSize}`
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
                header: 'Deleted',
                accessorKey: 'delete',
                enableEditing: false,
                Cell: ({ cell }) => (
                    <Box
                        sx={{
                            backgroundColor: cell.getValue() ? '#ffcccc' : '#ccffcc',
                            color: cell.getValue() ? '#cc0000' : '#006600',
                            padding: '5px',
                            borderRadius: '4px',
                            textAlign: 'center',
                        }}
                    >
                        {cell.getValue() ? 'Yes' : 'No'}
                    </Box>
                ),
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

    return (
        <div>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            <MaterialReactTable
                columns={columns}
                data={data}
                manualFiltering
                manualSorting
                manualPagination
                enableEditing
                editDisplayMode="modal"
                onEditingRowSave={handleEditingRowSave}
                onEditingRowCancel={handleEditingRowCancel}
                enableColumnFilterModes
                enableColumnOrdering
                enableGrouping
                enableColumnPinning
                enableFacetedValues
                enableRowActions
                rowCount={rowCount}
                onPaginationChange={({ pageIndex, pageSize }) =>
                    setPagination({ pageIndex, pageSize })
                }
                state={{ pagination }}
                renderRowActionMenuItems={({ row, closeMenu }) => [
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
                ]}
            />
        </div>
    );
}