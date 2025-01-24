import React, { useEffect, useState, useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Box, MenuItem, ListItemIcon, CircularProgress, Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { URL } from '../../../constants/Constants';

export default function ProductCotaTable({ refreshTable }) {
    const [data, setData] = useState([]);
    const [rowCount, setRowCount] = useState(0);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 5,
    });
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const actorPharmId = localStorage.getItem('actorFournisseur');

                const response = await fetch(
                    `${URL}/api/productCota?page=${pagination.pageIndex}&size=${pagination.pageSize}&id=${actorPharmId}`
                );
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                const result = await response.json();
                console.log('API Response:', result);
                setData(result.data || []);
                setRowCount(result.totalItems || 0);
            } catch (error) {
                setError('Erreur lors de la récupération des données');
                console.error('Fetch error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [pagination, refreshTable, refresh]);

    const columns = useMemo(
        () => [
            // Hidden _id column
            {
                accessorKey: '_id', // Use 'id' if your API provides 'id' instead of '_id'
                header: 'ID',
                enableColumnOrdering: false,
                enableSorting: false,
                enableColumnFilter: false,
                enableEditing: false,
                muiTableHeadCellProps: {
                    sx: { display: 'none' },
                },
                muiTableBodyCellProps: {
                    sx: { display: 'none' },
                },
            },
            {
                header: 'Offre',
                accessorKey: 'name',
            },
            {
                header: 'Supprimer',
                accessorKey: 'delete',
                enableEditing: false,
                Cell: ({ cell }) => {
                    const isDeleted = cell.getValue();
                    const cellStyle = {
                        backgroundColor: isDeleted ? '#ffcccc' : '#ccffcc',
                        color: isDeleted ? '#cc0000' : '#006600',
                        padding: '5px',
                        borderRadius: '4px',
                        textAlign: 'center',
                    };
                    return (
                        <Box sx={cellStyle}>
                            {isDeleted ? 'Oui' : 'Non'}
                        </Box>
                    );
                },
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

    // Handle saving edited row
    const handleEditingRowSave = async ({ row, values, exitEditingMode }) => {
        try {
            const id = row.original._id; // Access the correct ID field
            if (!id) {
                throw new Error('Product ID is undefined');
            }

            const response = await fetch(`${URL}/api/productCota/${id}`, {
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

            // Option 1: Update local data state
            setData((prevData) =>
                prevData.map((product) =>
                    product._id === id ? { ...product, ...values } : product
                )
            );

            // Option 2: Refetch data (uncomment if preferred)
            // setRefresh(!refresh);

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
            if (!id) {
                throw new Error('Product ID is undefined');
            }

            const response = await fetch(`${URL}/api/productCota/toggle-delete/${id}`, {
                method: 'PUT',
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(`Échec de la suppression: ${errorData.message}`);
                return;
            }

            const result = await response.json();
            console.log('Statut de suppression modifié:', result);

            // Option 1: Toggle refresh to refetch data
            setRefresh(!refresh);

            // Option 2: Update local data state (alternative approach)
            /*
            setData((prevData) =>
                prevData.map((product) =>
                    product._id === id ? { ...product, delete: !product.delete } : product
                )
            );
            */
        } catch (error) {
            setError(`Erreur lors de la suppression: ${error.message}`);
            console.error('Erreur lors de la suppression:', error);
        }
    };

    return (
        <div>
            {loading && <div>Loading...</div>}
            {error && <Alert severity="error">{error}</Alert>}
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
                        {row.original.delete ? 'Restaurer' : 'Supprimer'}
                    </MenuItem>,
                ]}
            />
        </div>
    );
}
