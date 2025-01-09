import React, { useMemo, useState } from 'react';
import { Box, Typography, Grid, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import FournisseurTable from './FournisseurTable';
import { wilayas } from '../../../constants/Constants';

const Fourniseur = () => {
  const [nom, setNom] = useState('');
  const [wilaya, setWilaya] = useState('');

  // Memoized to optimize performance
  const memoizedNom = useMemo(() => nom, [nom]);
  const memoizedWilaya = useMemo(() => wilaya, [wilaya]);



  return (
    <div>
      <div sx={{ bgcolor: '#f5f5f5' }}>
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
              Recherchez votre fournisseur
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
              <Grid item xs={12} sm={12} md={12}>
                <TextField
                  label="Nom"
                  variant="outlined"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  sx={{ width: '300px', marginBottom: '10px' }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}> <FormControl sx={{ width: '300px' }}>
                <InputLabel>Wilaya</InputLabel>
                <Select
                  value={wilaya}
                  onChange={(e) => setWilaya(e.target.value)}
                  label="Wilaya"
                >
                  {wilayas.map((wilay, index) => (
                    <MenuItem key={index} value={wilay}>
                      {wilay}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              </Grid>

              {/* FournisseurTable aligned to the right */}
              <Grid item xs={12}>
                <FournisseurTable willaya={memoizedWilaya} nom={memoizedNom} />
              </Grid>
            </Grid>
          </Box>

          {/* Footer */}
          <footer>
            <Box sx={{ textAlign: 'center', py: 2, mt: 4 }}>
              <Typography variant="body2">&copy; 2024 ELSAIDALIYA. Tous droits réservés.</Typography>
            </Box>
          </footer>
        </Box>
      </div>
    </div>
  );
};

export default Fourniseur;