import React, { useEffect, useState, useMemo } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import { Box, MenuItem, ListItemIcon, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import BlockIcon from '@mui/icons-material/Block';
import EditIcon from '@mui/icons-material/Edit';
import { URL } from '../../../constants/Constants';
import { useNavigate } from 'react-router-dom';

export default function FournisseurTable({ willaya, nom }) {
      const navigate = useNavigate(); // Initialize navigate
    const [data, setData] = useState([]);
    const [rowCount, setRowCount] = useState(0);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 5,
    });
    const [change, setChange] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedActor, setSelectedActor] = useState(null);
    const [newSubscribeDate, setNewSubscribeDate] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `${URL}/api/auth?willaya=${willaya}&nom=${nom}&page=${pagination.pageIndex}&size=${pagination.pageSize}&category=Fournisseur`
                );
                const result = await response.json();
                setData(result?.data || []);
                setRowCount(result?.totalItems || 0);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [pagination.pageIndex, pagination.pageSize, willaya, nom, change]);

    const handleSuspend = async (data) => {
        try {
            await fetch(`${URL}/api/auth/update/${data._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: !data.status,
                }),
            });
            setChange(!change);
            console.log(`Status updated for ID: ${data._id}, New Status: ${!data.status}`);
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const handleSubscribeUpdate = async () => {
        try {
            await fetch(`${URL}/api/auth/update-subscribe/${selectedActor._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    subscribes: newSubscribeDate,
                }),
            });
            setChange(!change);
            setOpenDialog(false);
            console.log(`Subscribes updated for ID: ${selectedActor._id}, New Date: ${newSubscribeDate}`);
        } catch (error) {
            console.error('Error updating subscribes:', error);
        }
    };

    const columns = useMemo(
        () => [
            {
                header: 'Name',
                accessorKey: 'nom',
                        // Make the "Name" cell clickable
                        Cell: ({ row }) => (
                          <Button
                            onClick={() => navigate(`/ProfileAll/${row.original._id}`)}
                            color="primary"
                            variant="text"
                            style={{ textTransform: 'none', padding: 0 }}
                          >
                            {`${row.original.nom} ${row.original.prenom}`}
                          </Button>
                        ),
            },
            {
                header: 'Status',
                accessorKey: 'status',
                Cell: ({ cell }) => {
                    const isActive = cell.getValue();
                    return (
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '4px',
                                backgroundColor: isActive ? 'green' : 'red',
                                color: 'white',
                                borderRadius: '4px',
                                fontWeight: 'bold',
                            }}
                        >
                            {isActive ? 'Active' : 'Inactive'}
                        </Box>
                    );
                },
            },
            {
                header: 'Subscribe Date',
                accessorKey: 'subscribes',
                Cell: ({ cell }) => {
                    const subscribeDate = new Date(cell.getValue());
                    const now = new Date();
                    const isFuture = subscribeDate > now;

                    return (
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '4px',
                                backgroundColor: isFuture ? 'green' : 'red',
                                color: 'white',
                                borderRadius: '4px',
                                fontWeight: 'bold',
                            }}
                        >
                            {subscribeDate.toLocaleDateString()}
                        </Box>
                    );
                },
            },
            { header: 'Telephone', accessorKey: 'telephone' },
            { header: 'Email', accessorKey: 'email' },
            { header: 'Willaya', accessorKey: 'willaya' },
            {
                header: 'PDF',
                accessorKey: 'dataPdf',
                Cell: ({ cell }) => (
                    <a
                        href={`${URL}/api/auth/download?file=${cell.getValue()}`}
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
        manualFiltering: true,
        manualSorting: true,
        manualPagination: true,

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
                key="suspend"
                onClick={() => {
                    closeMenu();
                    handleSuspend(row.original);
                }}
            >
                <ListItemIcon>
                    <BlockIcon />
                </ListItemIcon>
                {row.original.status ? 'Inactiver' : 'Activer'}
            </MenuItem>,
            <MenuItem
                key="update-subscribe"
                onClick={() => {
                    closeMenu();
                    setSelectedActor(row.original);
                    setNewSubscribeDate('');
                    setOpenDialog(true);
                }}
            >
                <ListItemIcon>
                    <EditIcon />
                </ListItemIcon>
                Update Subscribe
            </MenuItem>,
        ],
    });

    return (
        <>
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
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Update Subscribes</DialogTitle>
                <DialogContent>
                    <TextField
                        type="date"
                        fullWidth
                        value={newSubscribeDate}
                        onChange={(e) => setNewSubscribeDate(e.target.value)}
                        label="New Subscribe Date"
                        InputLabelProps={{ shrink: true }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button onClick={handleSubscribeUpdate} disabled={!newSubscribeDate}>
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
