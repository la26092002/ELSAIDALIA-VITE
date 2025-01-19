import React, { useState, useEffect, useMemo } from 'react';
import { Box, Typography, Button, Grid, TextField, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import ProductCotaTable from './ProductCotaTable';
import { URL } from '../../../constants/Constants';

const ProduitCota = () => {
  const [productName, setProductName] = useState('');
  const [actor, setActor] = useState('');
  const [file, setFile] = useState(null);
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const [refresh, setRefresh] = useState(false);

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' or 'error'

  // Using useMemo to pass the refresh state as a dependency to ProductTable
  const memoizedProductTable = useMemo(() => <ProductCotaTable refresh={refresh} />, [refresh]);

  // Fetch actor from localStorage on component mount
  useEffect(() => {
    const storedActor = localStorage.getItem('actorFournisseur');
    if (storedActor) {
      setActor(storedActor);
    }
  }, []);

  const handleAddProduct = async () => {
    if (!file || !productName || !actor) {
      setSnackbarMessage('Veuillez remplir tous les champs et ajouter un fichier.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', productName);
    formData.append('actor', actor);

    try {
      const response = await fetch(URL + '/api/productCota', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        console.log(response.error);
        throw new Error('Erreur lors de l’ajout du offre.');
      } else {
        setRefresh((prev) => !prev);
        setSnackbarMessage('offre ajouté avec succès!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Erreur lors de l’ajout du offre:', error);
      setSnackbarMessage('vous avez quelque problème.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

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
              Ajouter votre offre
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
              <Grid item xs={12} sx={{ mt: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <TextField
                  label="Nom du Produit"
                  variant="outlined"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  style={{ width: '30%', marginBottom: '10px' }}
                />
              </Grid>
              <Grid item xs={12} sx={{ mt: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ width: '30%', marginBottom: '10px' }}
                />
              </Grid>
              <Grid item xs={12} sx={{ mt: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button
                  variant="contained"
                  onClick={handleAddProduct}
                  sx={{ backgroundColor: '#00796b', color: '#fff', height: '55px', width: '30%' }}
                >
                  Ajouter l'offre
                </Button>
              </Grid>

              {/* ProductCotaTable aligned to the right */}
              <Grid item xs={12}>{memoizedProductTable}</Grid>
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

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ProduitCota;
