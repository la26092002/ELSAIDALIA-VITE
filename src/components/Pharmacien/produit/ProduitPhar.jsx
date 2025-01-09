import React, { useMemo, useState } from 'react';
import { Box, Typography, Grid, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import ProductTable from './ProductTable';

const ProduitPhar = () => {
  const [productName, setProductName] = useState('');

  // Memoized productName to optimize performance
  const memoizedProductName = useMemo(() => productName, [productName]);

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Toolbar />
      <Box
        component="main"
        sx={{
          padding: { xs: "10px", sm: "20px" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* Title */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            mb: 4,
            fontSize: { xs: "1.5rem", sm: "2rem" },
          }}
        >
          Recherchez votre produit
        </Typography>

        {/* Form Fields */}
        <Grid
          container
          spacing={3}
          sx={{
            justifyContent: "center",
            width: "100%",
            maxWidth: "800px",
          }}
        >
          {/* Product Search Input */}
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Nom du Produit"
              variant="outlined"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              fullWidth
              sx={{ mb: 4 }}
            />
          </Grid>

          {/* Product Table */}
          
            <Grid item xs={12}>
              <ProductTable productName={memoizedProductName} />
            </Grid>
        </Grid>
      </Box>

      {/* Footer */}
      <footer>
        <Box sx={{ textAlign: "center", py: 2, mt: 4 }}>
          <Typography variant="body2">&copy; 2024 ELSAIDALIYA. Tous droits réservés.</Typography>
        </Box>
      </footer>
    </Box>
  );
};

export default ProduitPhar;
