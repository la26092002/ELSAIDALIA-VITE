import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MaterialReactTable } from 'material-react-table';
import { Box, Typography } from '@mui/material';
import { URL } from '../../../constants/Constants';

const CommandOfferTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${URL}/api/CommandOffer`);
                setData(response.data);
                console.log(response.data)
            } catch (error) {
                console.error("Erreur lors de la récupération des commandes :", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Définition des colonnes
    const columns = [
        {
            accessorKey: 'offers', 
            header: 'Offers',
            Cell: ({ cell }) => (
                <ul>
                    {cell.getValue().map((offer, index) => (
                        <li key={index}>{offer}</li> 
                    ))}
                </ul>
            ),
        },
        {
            accessorKey: 'status', 
            header: 'Status',
        },
    ];

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Command Offers
            </Typography>
            {loading ? (
                <Typography>Loading...</Typography>
            ) : (
                <MaterialReactTable
                    columns={columns}
                    data={data}
                    enableColumnFilters={false}
                    enablePagination={true}
                    enableSorting={true}
                    enableBottomToolbar={true}
                    enableTopToolbar={true}
                    initialState={{ density: 'compact' }}
                />
            )}
        </Box>
    );
};

export default CommandOfferTable;
