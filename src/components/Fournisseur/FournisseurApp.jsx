import React from 'react';
import MenuAppBar from './MenuAppBar';
import { Outlet, useOutlet } from 'react-router-dom';
import { Box } from '@mui/material';

const ProductStatistics = () => {
  return (
    <div>
      <h2>Product Statistics</h2>
      <p>Display statistics and insights for products here.</p>
    </div>
  );
};

const SupplierStatistics = () => {
  return (
    <div>
      <h2>Supplier Statistics</h2>
      <p>Display statistics and insights for suppliers here.</p>
    </div>
  );
};

const FournisseurApp = () => {
  const outlet = useOutlet(); // Checks if there is content in Outlet

  return (
    <React.Fragment>
      <MenuAppBar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "50vh",
          padding: "20px",
        }}
      >
        {!outlet ? (
          <Box textAlign="center">
            <h1>Fournisseur Dashboard</h1>
            <SupplierStatistics />
            <ProductStatistics />
          </Box>
        ) : (
          <Outlet />
        )}
      </Box>
    </React.Fragment>
  );
};

export default FournisseurApp;
