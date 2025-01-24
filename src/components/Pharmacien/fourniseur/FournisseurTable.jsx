import React, { useEffect, useState, useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { Box, MenuItem, ListItemIcon, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { URL } from '../../../constants/Constants';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function FournisseurTable({ willaya, nom }) {
  const [data, setData] = useState([]);
  const [rowCount, setRowCount] = useState(0);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const navigate = useNavigate(); // Initialize navigate

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${URL}/api/auth?willaya=${willaya}&nom=${nom}&page=${pagination.pageIndex}&size=${pagination.pageSize}&category=Fournisseur`
        );
        const result = await response.json();
        setData(result?.data || []); // Assuming API response includes `data`
        setRowCount(result?.totalItems || 0); // Adjust if API response differs
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [pagination.pageIndex, pagination.pageSize, willaya, nom]);

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
        header: 'Telephone',
        accessorKey: 'telephone',
      },
      {
        header: 'Email',
        accessorKey: 'email',
      },
      {
        header: 'Willaya',
        accessorKey: 'willaya',
      },
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
    [navigate] // Add navigate as a dependency
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
          navigate(`/ProfileAll/${row.original.actorId}`); // Navigate to profile
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
          // You can add navigation to an edit page here if needed
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
          // Implement delete functionality here
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
      // Optional: Add row hover effect
      muiTableBodyRowProps={{
        hover: true,
      }}
      pagination={{
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
        onPageChange: (pageIndex) =>
          setPagination((prev) => ({ ...prev, pageIndex })),
        onPageSizeChange: (pageSize) =>
          setPagination((prev) => ({ ...prev, pageSize })),
      }}
      // Optional: Enable row actions
      enableRowActions
      positionActionsColumn="last"
    />
  );
}
