import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid, Snackbar, Alert } from '@mui/material';
import UpdateUserDialog from './UpdateUserDialog';
import { URL } from '../../../constants/Constants';

const ProfilePharm = () => {
  const [user, setUser] = useState({
    _id: '',
    nom: '',
    prenom: '',
    telephone: '',
    email: '',
    willaya: '',
    category: '',
    dataPdf: '',  // Existing Image Field
    logo: '',     // New Logo Field
    nomSociete: '', // New Company Name Field
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [changes, setChanges] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const actorPharmId = localStorage.getItem('actorPharmacien');
        const response = await fetch(`${URL}/api/auth/Data/${actorPharmId}`);
        const data = await response.json();

        if (data.success) {
          setUser(data.actor);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [changes]);

  const handleModifyClick = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleUpdateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setLoading(true);

      const formData = new FormData();
      formData.append('file', file);

      try {
        const actorPharmId = localStorage.getItem('actorPharmacien');
        const response = await fetch(`${URL}/api/auth/update-image/${actorPharmId}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          },
          body: formData,
        });

        const data = await response.json();

        if (response.ok) {
          setUser((prevState) => ({
            ...prevState,
            dataPdf: data.dataPdf,
          }));
          setChanges(!changes);
          setSnackbarMessage('Image mise à jour avec succès!');
          setSnackbarSeverity('success');
        } else {
          console.error('Error updating image:', data.error);
          setSnackbarMessage("Erreur lors de la mise à jour de l'image.");
          setSnackbarSeverity('error');
        }
      } catch (error) {
        console.error('Error during image upload:', error);
        setSnackbarMessage("Erreur lors de l'upload de l'image.");
        setSnackbarSeverity('error');
      } finally {
        setLoading(false);
        setSnackbarOpen(true);
      }
    }
  };

  // New Handler for Logo Change
  const handleLogoChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setLoading(true);

      const formData = new FormData();
      formData.append('file', file);

      try {
        const actorPharmId = localStorage.getItem('actorPharmacien');
        const response = await fetch(`${URL}/api/auth/update-logo/${actorPharmId}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          },
          body: formData,
        });

        const data = await response.json();

        if (response.ok) {
          setUser((prevState) => ({
            ...prevState,
            logo: data.logo,
          }));
          setChanges(!changes);
          setSnackbarMessage('Logo mis à jour avec succès!');
          setSnackbarSeverity('success');
        } else {
          console.error('Error updating logo:', data.error);
          setSnackbarMessage("Erreur lors de la mise à jour du logo.");
          setSnackbarSeverity('error');
        }
      } catch (error) {
        console.error('Error during logo upload:', error);
        setSnackbarMessage("Erreur lors de l'upload du logo.");
        setSnackbarSeverity('error');
      } finally {
        setLoading(false);
        setSnackbarOpen(true);
      }
    }
  };

  const handleImageDownload = () => {
    const link = document.createElement('a');
    link.href = `${URL}/api/auth/download?file=${user.dataPdf}`;
    link.download = 'registre_commerce_image';
    link.click();
  };


  const handleLogoDownload = () => {
    const link = document.createElement('a');
    link.href = `${URL}/api/auth/downloadlogos?file=${user.logo}`; // Corrected to use user.logo
    link.download = 'logo'; // Optional: Specify a default download name
    link.click();
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <Box
        component="main"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          padding: '20px',
          minHeight: 'calc(100vh - 64px)',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            marginBottom: 4,
            textAlign: 'center',
            marginTop: '30px',
          }}
        >
          Informations de l'utilisateur
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
            padding: 3,
            border: '1px solid #ddd',
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Nom:
              </Typography>
              <Typography variant="body1">{user.nom}</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Prénom:
              </Typography>
              <Typography variant="body1">{user.prenom}</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Téléphone:
              </Typography>
              <Typography variant="body1">{user.telephone}</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Email:
              </Typography>
              <Typography variant="body1">{user.email}</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Willaya:
              </Typography>
              <Typography variant="body1">{user.willaya}</Typography>
            </Grid>

            {/* New Field: Nom de la Société */}
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Nom de la Société:
              </Typography>
              <Typography variant="body1">{user.nomSociete}</Typography>
            </Grid>
          </Grid>

          <Button
            variant="outlined"
            color="success"
            sx={{ marginTop: 3, width: '200px' }}
            onClick={handleModifyClick}
          >
            Modifier Les informations
          </Button>
        </Box>

        {/* Image Display and Modify Section */}
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
          }}
        >
          {user.dataPdf ? (
            <>
              
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                Vous avez une image du registre de commerce associée à votre profil.
              </Typography>
              <Button
                variant="contained"
                sx={{
                  marginBottom: 2,
                  width: '200px',
                  backgroundColor: '#D32F2F',
                  '&:hover': { backgroundColor: '#C2185B' },
                }}
                onClick={handleImageDownload}
              >
                Télécharger l'image
              </Button>
            </>
          ) : (
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              Aucune image disponible pour votre profil.
            </Typography>
          )}

          <Button
            variant="outlined"
            color="success"
            component="label"
            sx={{
              marginTop: 2,
              width: '200px',
            }}
            disabled={loading}
          >
            {loading ? 'Téléchargement en cours...' : "Modifier l'image"}
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
          </Button>
        </Box>

        {/* New Section: Logo Display and Modify */}
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
          }}
        >
          
          {user.logo ? (
            <>
              
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                Vous avez un logo associé à votre profil.
              </Typography>
              <Button
                variant="contained"
                sx={{
                  marginBottom: 2,
                  width: '200px',
                  backgroundColor: '#D32F2F',
                  '&:hover': { backgroundColor: '#C2185B' },
                }}
                onClick={handleLogoDownload}
              >
                Télécharger le logo
              </Button>
            </>
          ) : (
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              Aucun logo disponible pour votre profil.
            </Typography>
          )}

          <Button
            variant="outlined"
            color="success"
            component="label"
            sx={{
              marginTop: 2,
              width: '200px',
            }}
            disabled={loading}
          >
            {loading ? 'Téléchargement en cours...' : "Modifier le logo"}
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleLogoChange}
            />
          </Button>
        </Box>
      </Box>

      <UpdateUserDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        user={user}
        onUpdate={handleUpdateUser}
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ProfilePharm;
