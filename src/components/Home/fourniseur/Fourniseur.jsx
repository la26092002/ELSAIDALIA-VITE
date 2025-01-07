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
        <Box component="main">
          <Toolbar />
          <Box sx={{ padding: '20px', textAlign: 'center' }}>
            {/* Centered Title */}
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>
              Recherchez votre fournisseur
            </Typography>

            {/* Form Fields */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mb: 4,
              }}
            >
              <Grid container spacing={3} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                <Grid item xs={12} sx={{ mt: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <TextField 
                    label="Nom"
                    variant="outlined"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    sx={{ width: '300px', marginBottom: '10px' }}
                  />
                </Grid>
                <Grid item xs={12} sx={{ mt: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <FormControl sx={{ width: '300px' }}>
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
                <Grid item xs={8} sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                  <FournisseurTable willaya={memoizedWilaya} nom={memoizedNom} />
                </Grid>
              </Grid>
            </Box>
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
