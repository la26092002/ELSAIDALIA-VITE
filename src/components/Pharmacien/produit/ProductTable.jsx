import React, { useEffect, useState, useMemo } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import { Box, MenuItem, ListItemIcon, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { URL } from '../../../constants/Constants';

export default function ProductTable({ productName }) {
    const [data, setData] = useState([]);
    const [rowCount, setRowCount] = useState(0);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 5,
    });
    const [isLoading, setIsLoading] = useState(false); // New state for loading

    // Fetch data from the API
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); // Set loading to true before fetching
            try {
                const response = await fetch(
                    URL + `/api/product/search-in-pdf?page=${pagination.pageIndex}&size=${pagination.pageSize}&date=true&searchTerms=${productName}`
                );
                const result = await response.json();
                setData(result?.data || []); // Assuming API response includes `data`
                setRowCount(result?.totalItems || 0); // Adjust if API response differs
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false); // Set loading to false after fetching
            }
        };

        fetchData();
    }, [pagination.pageIndex, pagination.pageSize, productName]);

    const columns = useMemo(
        () => [
            {
                header: 'Listing',
                accessorKey: 'name',
            },
            {
                header: 'PDF',
                accessorKey: 'dataPdf',
                Cell: ({ cell }) => (
                    <a
                        href={URL + `/api/product/download?file=${cell.getValue()}`}  // Pass product ID as a query parameter
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
        <Box position="relative">
            {isLoading && (
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