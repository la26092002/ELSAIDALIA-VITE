import React, { useEffect, useState, useMemo } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import { Box, MenuItem, ListItemIcon } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BlockIcon from '@mui/icons-material/Block'; // For suspension
import { URL } from '../../../constants/Constants';

export default function FournisseurTable({ willaya, nom }) {
    const [data, setData] = useState([]);
    const [rowCount, setRowCount] = useState(0);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 5,
    });
    const [change, setChange] = useState(false);

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
    }, [pagination.pageIndex, pagination.pageSize, willaya, nom,change]);

    const handleDelete = async (id) => {
        try {
            await fetch(`${URL}/api/auth/${id}`, { method: 'DELETE' });
            setData((prev) => prev.filter((item) => item.id !== id));
            console.log(`Fournisseur with ID ${id} deleted.`);
        } catch (error) {
            console.error('Error deleting fournisseur:', error);
        }
    };

    const handleModify = (id) => {
        console.log(`Modify action for ID: ${id}`);
        // Add your modify logic here, such as opening a dialog or navigating to a form.
    };

    const handleSuspend = async (data) => {
        try {
            await fetch(`${URL}/api/auth/update/${data._id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  // Replace these with your actual data fields
                  status: !data.status,
                }),
              });
              setChange(!change)
            console.log(data._id,!data.status)
        } catch (error) {
            console.error('Error suspending fournisseur:', error);
        }
    };

    const columns = useMemo(
        () => [
            {
                header: 'Name',
                accessorKey: 'nom',
                Cell: ({ row }) => `${row.original.nom} ${row.original.prenom}`,
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
                header: 'Status',
                accessorKey: 'status',
                Cell: ({ cell }) =>  cell.getValue() == false ? (<a style={{color:'green'}}>Actif</a>): (<a  style={{color:'red'}}>Inactif</a>),
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
                Suspend
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
