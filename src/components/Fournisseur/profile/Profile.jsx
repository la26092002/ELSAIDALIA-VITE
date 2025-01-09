import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid, Snackbar, Alert } from '@mui/material';
import UpdateUserDialog from './UpdateUserDialog';
import { URL } from '../../../constants/Constants';

const Profile = () => {
  const [user, setUser] = useState({
    _id: '',
    nom: '',
    prenom: '',
    telephone: '',
    email: '',
    willaya: '',
    category: '',
    dataPdf: '',  // Store the PDF URL or file here
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);  // To show loading during the file upload
  const [changes, setChanges] = useState(false);  // To trigger a re-fetch of user data
  const [snackbarOpen, setSnackbarOpen] = useState(false);  // Control Snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = useState('');  // Message to display in the Snackbar
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');  // Severity type for the Snackbar

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const actorFournisseur = localStorage.getItem('actorFournisseur');
        const response = await fetch(URL + '/api/auth/Data/' + actorFournisseur);
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

  const handlePdfChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setLoading(true);  // Set loading state to true

      const formData = new FormData();
      formData.append('file', file);

      try {
        const actorFournisseur = localStorage.getItem('actorFournisseur');
        const response = await fetch(`${URL}/api/auth/update-pdf/${actorFournisseur}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,  // Pass token if required
          },
          body: formData,
        });

        const data = await response.json();

        if (response.ok) {
          // Update user data after successful PDF update
          setUser((prevState) => ({
            ...prevState,
            dataPdf: data._id,  // Assuming the API returns the actor's _id or the new PDF data
          }));
          setChanges(!changes);
          setSnackbarMessage('PDF mis à jour avec succès!');
          setSnackbarSeverity('success');
        } else {
          console.error('Error updating PDF:', data.error);
          setSnackbarMessage('Erreur lors de la mise à jour du PDF.');
          setSnackbarSeverity('error');
        }
      } catch (error) {
        console.error('Error during PDF upload:', error);
        setSnackbarMessage('Erreur lors de l\'upload du PDF.');
        setSnackbarSeverity('error');
      } finally {
        setLoading(false);  // Set loading state back to false
        setSnackbarOpen(true);  // Open the Snackbar
      }
    }
  };

  const handlePdfDownload = () => {
    const link = document.createElement('a');
    link.href = `${URL}/api/auth/download?file=${user.dataPdf}`;
    link.download = 'user_profile.pdf'; // Default name for the downloaded PDF
    link.click();
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);  // Close the Snackbar
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
      ><Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 4, textAlign: 'center' }}>
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
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Nom:</Typography>
              <Typography variant="body1">{user.nom}</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Prénom:</Typography>
              <Typography variant="body1">{user.prenom}</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Téléphone:</Typography>
              <Typography variant="body1">{user.telephone}</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Email:</Typography>
              <Typography variant="body1">{user.email}</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Willaya:</Typography>
              <Typography variant="body1">{user.willaya}</Typography>
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

        {/* PDF Display and Modify Section */}
        <Typography variant="h6" sx={{ marginTop: 4, textAlign: 'center', fontWeight: 'bold' }}>
          PDF du profil
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
                Vous avez un PDF associé à votre profil.
              </Typography>
              <Button
                variant="contained"
                sx={{
                  marginBottom: 2,
                  width: '200px',
                  backgroundColor: '#D32F2F',  // PDF red
                  '&:hover': { backgroundColor: '#C2185B' }, // Darker red on hover
                }}
                onClick={handlePdfDownload}
              >
                Télécharger le PDF
              </Button>
            </>
          ) : (
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              Aucun PDF disponible pour votre profil.
            </Typography>
          )}

          <Button
             variant="outlined"
             color="success"  // Change color to success to match the first button
             
            component="label"
            sx={{
              marginTop: 2,
              width: '200px',
               }}
            disabled={loading}  // Disable when loading
          >
            {loading ? 'Téléchargement en cours...' : 'Modifier le PDF'}
            <input
              type="file"
              accept="application/pdf"
              hidden
              onChange={handlePdfChange}
            />
          </Button>
        </Box>
      </Box>

      {/* Update User Dialog */}
      <UpdateUserDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        user={user}
        onUpdate={handleUpdateUser}
      />

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Profile;
