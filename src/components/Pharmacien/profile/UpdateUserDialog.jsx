import * as React from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, Alert, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useState, useEffect } from 'react';
import { URL, wilayas } from '../../../constants/Constants';

const UpdateUserDialog = ({ open, onClose, user, onUpdate }) => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    telephone: '',
    email: '',
    willaya: '',
    category: '',
    nomSociete: '', // New Field
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        nom: user.nom || '',
        prenom: user.prenom || '',
        telephone: user.telephone || '',
        email: user.email || '',
        willaya: user.willaya || '',
        category: user.category || '',
        nomSociete: user.nomSociete || '', // Initialize with user data
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send the updated data to the server
    try {
      const actorPharmId = localStorage.getItem('actorPharmacien');
      const response = await fetch(`${URL}/api/auth/update/${actorPharmId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // Include auth token if required
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (data.msg === 'Actor updated successfully') {
        setSnackbarSeverity("success");
        setSnackbarMessage("Informations de l'utilisateur mises à jour avec succès !");
        onUpdate({ ...formData, dataPdf: user.dataPdf, logo: user.logo }); // Update the user state in the parent component
      } else {
        setSnackbarSeverity("error");
        setSnackbarMessage("Échec de la mise à jour de l'utilisateur.");
      }

      setOpenSnackbar(true);
      onClose(); // Close the dialog after saving
    } catch (error) {
      console.error('Error updating user:', error);
      setSnackbarSeverity("error");
      setSnackbarMessage("Erreur lors de la mise à jour de l'utilisateur.");
      setOpenSnackbar(true);
      onClose();
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Mettre à jour les informations de l'utilisateur</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              required
              margin="dense"
              id="nom"
              name="nom"
              label="Nom"
              value={formData.nom}
              onChange={handleChange}
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              id="prenom"
              name="prenom"
              label="Prénom"
              value={formData.prenom}
              onChange={handleChange}
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              id="telephone"
              name="telephone"
              label="Téléphone"
              value={formData.telephone}
              onChange={handleChange}
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              id="email"
              name="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              variant="standard"
            />
            
            <FormControl sx={{ marginTop: '10px' }} fullWidth>
              <InputLabel>Wilaya</InputLabel>
              <Select
                value={formData.willaya}
                onChange={handleChange}
                required
                margin="dense"
                id="willaya"
                name="willaya"
                label="Wilaya"
              >
                {wilayas.map((wilay, index) => (
                  <MenuItem key={index} value={wilay}>
                    {wilay}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* New Field: Nom de la Société */}
            <TextField
              required
              margin="dense"
              id="nomSociete"
              name="nomSociete"
              label="Nom de la Société"
              value={formData.nomSociete}
              onChange={handleChange}
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Annuler</Button>
            <Button type="submit">Sauvegarder</Button>
          </DialogActions>
        </form>
      </Dialog>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default UpdateUserDialog;
