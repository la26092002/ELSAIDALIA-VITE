import React, { useEffect, useState, useMemo } from 'react';
import {
    MaterialReactTable,
} from 'material-react-table';
import { MenuItem, ListItemIcon } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { URL } from '../../../constants/Constants';

export default function ProductCotaTable() {
    const [dataa, setData] = useState([]);
    const [rowCount, setRowCount] = useState(0);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 5,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [change, setChange] = useState(false);
  

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(
                    URL+`/api/productCota?page=${pagination.pageIndex}&size=${pagination.pageSize}`
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
    }, [pagination,change]);

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
                        href={URL+`/api/productCota/download?file=${cell.getValue()}`}
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

        await fetch(`${URL}/api/productCota/${values._id}`, {
                        method: 'PUT',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          // Replace these with your actual data fields
                          name: values.name,
                        }),
                      });
                      setChange(!change)
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

    return (
        <div>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            <MaterialReactTable
                columns={columns}
                data={dataa}
                manualFiltering={true}
                manualSorting={true}
                manualPagination={true}

                enableEditing= {true}
                editDisplayMode= 'modal'
                onEditingRowSave={handleEditingRowSave}
                onEditingRowCancel={handleEditingRowCancel}
                

                enableColumnFilterModes={true}
                enableColumnOrdering={true}
                enableGrouping={true}
                enableColumnPinning={true}
                enableFacetedValues={true}
                enableRowActions={true}
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
                            console.log('Delete:', row.original);
                        }}
                    >
                        <ListItemIcon>
                            <DeleteIcon />
                        </ListItemIcon>
                        Delete
                    </MenuItem>,
                ]}
            />
        </div>
    );
}
