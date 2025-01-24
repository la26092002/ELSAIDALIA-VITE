import React, { useEffect, useState, useMemo } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import {
    Box,
    MenuItem,
    ListItemIcon,
    CircularProgress,
    Alert,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { URL } from '../../../constants/Constants';

export default function ProductTable({ refresh }) {
    const [data, setData] = useState([]);
    const [rowCount, setRowCount] = useState(0);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 5,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [refreshTable, setRefreshTable] = useState(false);

    // Fetch data from the API
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const id = await localStorage.getItem('actorFournisseur');
                const response = await fetch(
                    `${URL}/api/product?page=${pagination.pageIndex}&size=${pagination.pageSize}&date=true&id=${id}`
                );
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                const result = await response.json();
                setData(result?.data || []); // Assuming API response includes `data`
                setRowCount(result?.totalItems || 0); // Adjust if API response differs
            } catch (error) {
                setError('Erreur lors de la récupération des données');
                console.error('Erreur lors de la récupération des données:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [pagination.pageIndex, pagination.pageSize, refresh, refreshTable]);

    const columns = useMemo(
        () => [
            {
                header: 'Listing',
                accessorKey: 'name',
                // Allow editing
            },
            {
                header: 'PDF',
                accessorKey: 'dataPdf',
                Cell: ({ cell }) => (
                    <a
                        href={`${URL}/api/product/download?file=${cell.getValue()}`}  // Pass product ID as a query parameter
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {cell.getValue()}
                    </a>
                ),
                enableEditing: false, // Prevent editing
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
                enableEditing: false,
            },
            {
                header: 'Date',
                accessorKey: 'date',
                Cell: ({ cell }) => new Date(cell.getValue()).toLocaleString(),
                enableEditing: false,
            },
           
        ],
        []
    );

    // Handle saving edited row
    const handleEditingRowSave = async ({ row, values, exitEditingMode }) => {
        try {
            const response = await fetch(`${URL}/api/product/${row.original._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: values.name,
                    // Include other fields if necessary
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Échec de la mise à jour du produit');
            }

            // Update local data state
            setData((prevData) =>
                prevData.map((product) =>
                    product._id === row.original._id ? { ...product, ...values } : product
                )
            );

            exitEditingMode(); // Exit editing mode
        } catch (error) {
            setError(`Erreur lors de la mise à jour du produit: ${error.message}`);
            console.error('Erreur lors de la mise à jour du produit:', error);
        }
    };

    // Handle cancelling edit
    const handleEditingRowCancel = () => {
        console.log('Modification annulée');
    };

    // Handle delete or restore action
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${URL}/api/product/toggle-delete/${id}`, {
                method: 'PUT',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Échec de la suppression');
            }

            const result = await response.json();
            console.log('Statut de suppression modifié:', result);

            // Toggle refresh to refetch data
            setRefreshTable((prev) => !prev);
        } catch (error) {
            setError(`Erreur lors de la suppression: ${error.message}`);
            console.error('Erreur lors de la suppression:', error);
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
        onEditingRowSave: handleEditingRowSave,
        onEditingRowCancel: handleEditingRowCancel,
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
                {row.original.delete ? 'Restaurer' : 'Supprimer'}
            </MenuItem>,
        ],
    });

    return (
        <Box>
            {loading && (
                <Box display="flex" justifyContent="center" my={2}>
                    <CircularProgress />
                </Box>
            )}
            {error && (
                <Box my={2}>
                    <Alert severity="error">{error}</Alert>
                </Box>
            )}
            <MaterialReactTable
                table={table}
                enableEditing={true}
                editDisplayMode="modal"
                enableRowActions
                renderRowActionMenuItems={({ row, closeMenu }) => [
                    <MenuItem
                        key="edit"
                        onClick={() => {
                            closeMenu();
                            table.setEditingRow(row);
                        }}
                    >
                        <ListItemIcon>
                            <EditIcon />
                        </ListItemIcon>
                        Modifier
                    </MenuItem>,
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
                        {row.original.delete ? 'Restaurer' : 'Supprimer'}
                    </MenuItem>,
                ]}
                state={{
                    ...table.getState(),
                    isLoading: loading,
                }}
                onPaginationChange={({ pageIndex, pageSize }) =>
                    setPagination({ pageIndex, pageSize })
                }
                rowCount={rowCount}
                manualPagination
                pageCount={Math.ceil(rowCount / pagination.pageSize)}
            />
        </Box>
    );
}
