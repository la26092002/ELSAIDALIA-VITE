import React, { useEffect, useState, useMemo } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import { Box, CircularProgress } from '@mui/material';
import { URL } from '../../../constants/Constants';
import { Button } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export default function ProductCotaTable() {
    const [data, setData] = useState([]);
    const [rowCount, setRowCount] = useState(0);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 5,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [refresh, setRefresh] = useState(false);

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

    // Function to add all offer information to localStorage
    const handleAddToLocalStorage = (offre) => {
        console.log( offre);
        // Retrieve the existing array from localStorage
        const storedOffres = JSON.parse(localStorage.getItem('offres')) || [];
        
        // Check if the offer is already in the array (based on ID)
        const isAlreadyAdded = storedOffres.some((item) => item._id === offre._id);
        
        if (!isAlreadyAdded) {
            // Add the new offer to the array
            storedOffres.push(offre);
            
            // Save the updated array back to localStorage
            localStorage.setItem('offres', JSON.stringify(storedOffres));
            
            console.log(`Offre added to localStorage:`, offre);
        } else {
            console.log(`Offre ID ${offre._id} is already in localStorage.`);
        }
    };

    const columns = useMemo(
        () => [
            {
                header: 'Actions',
                accessorKey: '_id', 
                enableEditing: false,
                Cell: ({ row }) => (
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        startIcon={<AddShoppingCartIcon />}
                        onClick={() => handleAddToLocalStorage(row.original)}
                        sx={{
                            textTransform: 'none', // Prevents uppercase text
                            fontSize: '0.875rem', // Adjust font size
                            fontWeight: 'bold',
                            borderRadius: '8px', // Rounded corners
                            padding: '6px 12px', // Padding
                        }}
                    >
                        Ajouter au Panier
                    </Button>
                ),
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
    // Rest of the component remains unchanged...
    const table = useMaterialReactTable({
        columns,
        data,
        manualPagination: true,
        onPaginationChange: setPagination,
        rowCount,
        state: { pagination },
        enableEditing: false,
        editDisplayMode: 'modal',
        enableColumnFilterModes: true,
        enableColumnOrdering: true,
        enableGrouping: true,
        enableColumnPinning: true,
        enableFacetedValues: true,
        enableRowActions: false,
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