import React from 'react';
import MenuAppBar from './MenuAppBar';
import { Outlet, useOutlet } from 'react-router-dom';
import { Box } from '@mui/material';

const ProductStatistics = () => {
  // Replace with actual data fetching and display logic
  return (
    <div>
      <h2>Product Statistics</h2>
      <p>Display statistics and insights for products here.</p>
    </div>
  );
};

const SupplierStatistics = () => {
  // Replace with actual data fetching and display logic
  return (
    <div>
      <h2>Supplier Statistics</h2>
      <p>Display statistics and insights for suppliers here.</p>
    </div>
  );
};

const AdminApp = () => {
  const outlet = useOutlet(); // Checks if there is content in Outlet

  return (
    <React.Fragment>
      <MenuAppBar />
      {/* Centering Content */}
      <Box
  sx={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "10vh",
    padding: { xs: "10px", sm: "20px" },
    width: "100%",
  }}
>

        {/* Show statistics only if there's no Outlet content */}
        {!outlet ? (
          <Box textAlign="center">
            <h1>Admin Dashboard</h1>
            {/* Statistics Sections */}
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

export default AdminApp;
