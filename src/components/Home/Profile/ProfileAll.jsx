import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Grid, Snackbar, Alert, AppBar, Toolbar, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RefreshIcon from '@mui/icons-material/Refresh';

import { URL as API_URL } from '../../../constants/Constants';

const ProfileAll = () => {
  const { actorPharmId } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    _id: '',
    nom: '',
    prenom: '',
    telephone: '',
    email: '',
    willaya: '',
    category: '',
    dataPdf: '',
    logo: '',
    nomSociete: '',
  });
  const [loading, setLoading] = useState(false);
  const [changes, setChanges] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/auth/Data/${actorPharmId}`);
        const data = await response.json();

        if (data.success) {
          setUser(data.actor);
        } else {
          console.error('Échec de la récupération des données utilisateur');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur:', error);
      }
    };

    if (actorPharmId) {
      fetchUserData();
    }
  }, [actorPharmId, changes]);

  const handleImageDownload = () => {
    const link = document.createElement('a');
    link.href = `${API_URL}/api/auth/download?file=${user.dataPdf}`;
    link.download = 'registre_commerce_image';
    link.click();
  };

  const handleLogoDownload = () => {
    const link = document.createElement('a');
    link.href = `${API_URL}/api/auth/downloadlogos?file=${user.logo}`;
    link.download = 'logo';
    link.click();
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/auth/logo/679bf08a4b198f0bb237aff7`);
        if (!response.ok) throw new Error("Failed to fetch image");

        const blob = await response.blob(); // Convert response to Blob
        const imageUrl = globalThis.URL.createObjectURL(blob);

        setImageSrc(imageUrl);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();

    return () => {
      if (imageSrc) {
        URL.revokeObjectURL(imageSrc); // Clean up object URL
      }
    };
  }, []);

  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '20px',
        minHeight: '100vh',
        backgroundColor: '#eff8fa', // Updated background color
      }}
    >
      {/* Navigation Bar with Updated Color */}
      <AppBar position="static" sx={{ marginBottom: 4, backgroundColor: '#33a7b5' }}> {/* Updated navbar color */}
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="go back"
            onClick={handleGoBack}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
            Informations de l'utilisateur
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="refresh"
            onClick={handleRefresh}
          >
            <RefreshIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Rest of the Component */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          maxWidth: '800px',
          marginTop: 2,
          padding: 3,
          border: '1px solid #ddd',
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: '#fff',
        }}
      >
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
              Nom:
            </Typography>
            <Typography variant="body1" sx={{ textAlign: 'center' }}>
              {user.nom}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
              Prénom:
            </Typography>
            <Typography variant="body1" sx={{ textAlign: 'center' }}>
              {user.prenom}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
              Téléphone:
            </Typography>
            <Typography variant="body1" sx={{ textAlign: 'center' }}>
              {user.telephone}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
              Email:
            </Typography>
            <Typography variant="body1" sx={{ textAlign: 'center' }}>
              {user.email}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
              Willaya:
            </Typography>
            <Typography variant="body1" sx={{ textAlign: 'center' }}>
              {user.willaya}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
              Nom de la Société:
            </Typography>
            <Typography variant="body1" sx={{ textAlign: 'center' }}>
              {user.nomSociete}
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {/* Image Section */}
      <Typography
        variant="h6"
        sx={{ marginTop: 4, textAlign: 'center', fontWeight: 'bold' }}
      >
        Image du registre de commerce
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          maxWidth: '800px',
          marginTop: 2,
          padding: 2,
          border: '1px solid #ddd',
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: '#fff',
        }}
      >
        {user.dataPdf ? (
          <>
            <Typography variant="body1" sx={{ marginBottom: 2, textAlign: 'center' }}>
              Vous avez une image du registre de commerce associée à ce profil.
            </Typography>
            <Button
              variant="contained"
              sx={{
                marginBottom: 2,
                width: '200px',
                backgroundColor: '#3cc35a', // Updated button color
                '&:hover': { backgroundColor: '#2e9f4a' }, // Updated hover color
              }}
              onClick={handleImageDownload}
            >
              Télécharger le registre de commerce
            </Button>
          </>
        ) : (
          <Typography variant="body1" sx={{ marginBottom: 2, textAlign: 'center' }}>
            Aucune image disponible pour votre profil.
          </Typography>
        )}
      </Box>

      {/* Logo Section */}
      <Typography
        variant="h6"
        sx={{ marginTop: 4, textAlign: 'center', fontWeight: 'bold' }}
      >
        Logo de la Société
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          maxWidth: '800px',
          marginTop: 2,
          padding: 2,
          border: '1px solid #ddd',
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: '#fff',
        }}
      >
        {user.logo ? (
          <>
            <Typography variant="body1" sx={{ marginBottom: 2, textAlign: 'center' }}>
              Vous avez un logo associé à ce profil.
            </Typography>
            <img src={imageSrc} alt="Actor Logo" style={{ width: "150px", height: "150px" }} />

            <Button
              variant="contained"
              sx={{
                marginBottom: 2,
                width: '200px',
                backgroundColor: '#3cc35a', // Updated button color
                '&:hover': { backgroundColor: '#2e9f4a' }, // Updated hover color
              }}
              onClick={handleLogoDownload}
            >
              Télécharger le logo
            </Button>
          </>
        ) : (
          <Typography variant="body1" sx={{ marginBottom: 2, textAlign: 'center' }}>
            Aucun logo disponible pour votre profil.
          </Typography>
        )}
      </Box>

      {/* Snackbar for Notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: '100%', textAlign: 'center' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <footer>
        <Box sx={{ textAlign: 'center', py: 2, mt: 4 }}>
          <Typography variant="body2">&copy; 2024 ELSAIDALIYA. Tous droits réservés.</Typography>
        </Box>
      </footer>
    </Box>
  );
};

export default ProfileAll;