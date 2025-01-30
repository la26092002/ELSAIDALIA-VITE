import React, { useEffect, useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Link,
  CircularProgress,
  Snackbar,
  Alert,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import { URL } from '../../constants/Constants';

const Register = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [role, setRole] = useState('');
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [willaya, setWillaya] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [file, setFile] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [errors, setErrors] = useState({});
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const navigate = useNavigate();

  const drawerWidth = 240;

  const navItems = [
    { text: 'Accueil', link: '/' },
    { text: 'À propos', link: '/about' },
    { text: 'Fournisseurs', link: '/fournisseurs' },
    { text: 'Contact', link: '/contact' },
    { text: 'Se connecter', link: '/Seconnect' },
  ];

  const wilayas = [
    'Adrar', 'Chlef', 'Laghouat', 'Oum El Bouaghi', 'Batna', 'Béjaïa', 'Biskra', 'Béchar',
    'Blida', 'Bouira', 'Tamanrasset', 'Tébessa', 'Tlemcen', 'Tiaret', 'Tizi Ouzou', 'Alger',
    'Djelfa', 'Jijel', 'Sétif', 'Saïda', 'Skikda', 'Sidi Bel Abbès', 'Annaba', 'Guelma',
    'Constantine', 'Médéa', 'Mostaganem', 'M’Sila', 'Mascara', 'Ouargla', 'Oran', 'El Bayadh',
    'Illizi', 'Bordj Bou Arreridj', 'Boumerdès', 'El Tarf', 'Tindouf', 'Tissemsilt', 'El Oued',
    'Khenchela', 'Souk Ahras', 'Tipaza', 'Mila', 'Aïn Defla', 'Naâma', 'Aïn Témouchent', 'Ghardaïa',
    'Relizane', 'Timimoun', 'Bordj Badji Mokhtar', 'Ouled Djellal', 'Béni Abbès', 'In Salah', 'In Guezzam',
    'Touggourt', 'Djanet', 'El M’Ghair', 'El Meniaa',
  ];

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ mx: 2 }}>ELSAIDALIYA</Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => navigate(item.link)} sx={{ textAlign: 'center' }}>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const validate = () => {
    const newErrors = {};

    if (!nom) newErrors.nom = 'Le nom est requis';
    if (!role) newErrors.role = 'Le rôle est requis';
    if (!telephone) newErrors.telephone = 'Le numéro de téléphone est requis';
    if (!email) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'L\'email est invalide';
    }
    if (!willaya) newErrors.willaya = 'La wilaya est requise';
    if (!password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = 'La confirmation du mot de passe est requise';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }
    if (!file) newErrors.file = 'Une image est requise';
    if (!acceptedTerms) newErrors.acceptedTerms = 'Vous devez accepter les conditions d\'utilisation';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const checkPasswordStrength = (password) => {
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    const mediumRegex = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;

    if (strongRegex.test(password)) {
      setPasswordStrength('Fort');
    } else if (mediumRegex.test(password)) {
      setPasswordStrength('Moyen');
    } else {
      setPasswordStrength('Faible');
    }
  };

  const handleRegister = async () => {
    if (!validate()) return;

    const isConfirmed = window.confirm('Êtes-vous sûr de vouloir vous inscrire ?');
    if (!isConfirmed) return;

    setSpinner(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('nom', nom);
    formData.append('prenom', prenom);
    formData.append('telephone', telephone);
    formData.append('email', email);
    formData.append('willaya', willaya);
    formData.append('category', role);
    formData.append('password', password);

    try {
      const response = await fetch(URL + '/api/auth/register', {
        method: 'POST',
        body: formData,
      });

      setSpinner(false);
      if (response.ok) {
        setSnackbarMessage('Inscription réussie !');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
        setTimeout(() => {
          navigate('/Seconnect');
        }, 2000);
      } else {
        const error = await response.json();
        setSnackbarMessage(`Échec de l'inscription: ${error.message}`);
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      }
    } catch (err) {
      console.error('Erreur:', err);
      setSnackbarMessage('Une erreur s\'est produite. Veuillez réessayer.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setFile(file);
    } else {
      setErrors({ ...errors, file: 'Veuillez télécharger une image valide' });
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <>
      <Box sx={{ display: 'flex', backgroundColor: '#eff8fa' }}>
        <CssBaseline />
        <AppBar component="nav" sx={{ bgcolor: '#33a7b5' }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              ELSAIDALIYA
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' }, mr: 6 }}>
              {navItems.map((item) => (
                <Button
                  key={item.text}
                  sx={{
                    color: '#fff',
                    textAlign: 'center',
                    padding: '14px 20px',
                    fontSize: '17px',
                    fontWeight: 'bold',
                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
                  }}
                  onClick={() => navigate(item.link)}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
        <nav>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
        </nav>
      </Box>

      {spinner ? (
        <Box
          sx={{
            width: '100%',
            maxWidth: 480,
            mx: 'auto',
            mt: 15,
            p: 5,
            backgroundColor: '#f7f7f7',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            width: '100%',
            maxWidth: 600,
            mx: 'auto',
            mt: 15,
            p: 3,
            backgroundColor: '#fff',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography variant="h4" sx={{ mb: 3, textAlign: 'center', color: '#33a7b5' }}>
            Inscription
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="pharmacie/Fournisseur"
                variant="outlined"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                error={!!errors.nom}
                helperText={errors.nom}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={!!errors.role}>
                <InputLabel>Rôle</InputLabel>
                <Select value={role} onChange={(e) => setRole(e.target.value)} label="Rôle">
                  <MenuItem value="Pharmacien">Pharmacien</MenuItem>
                  <MenuItem value="Fournisseur">Fournisseur</MenuItem>
                </Select>
                {errors.role && <Typography variant="caption" color="error">{errors.role}</Typography>}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Numéro de Téléphone"
                variant="outlined"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                error={!!errors.telephone}
                helperText={errors.telephone}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth error={!!errors.willaya}>
                <InputLabel>Wilaya</InputLabel>
                <Select value={willaya} onChange={(e) => setWillaya(e.target.value)} label="Wilaya">
                  {wilayas.map((wilay, index) => (
                    <MenuItem key={index} value={wilay}>
                      {wilay}
                    </MenuItem>
                  ))}
                </Select>
                {errors.willaya && <Typography variant="caption" color="error">{errors.willaya}</Typography>}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button variant="outlined" component="label">
                Ajouter une photo du registre de commerce
                <input type="file" hidden accept="image/*" onChange={handleFileUpload} />
              </Button>
              {file && <Typography variant="body2" sx={{ mt: 1 }}>{file.name}</Typography>}
              {errors.file && <Typography variant="caption" color="error">{errors.file}</Typography>}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Mot de Passe"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  checkPasswordStrength(e.target.value);
                }}
                error={!!errors.password}
                helperText={errors.password || (password && `Force du mot de passe: ${passwordStrength}`)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Confirmer le Mot de Passe"
                type="password"
                variant="outlined"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    color="primary"
                  />
                }
                label={
                  <Typography variant="body2">
                    J'accepte les{' '}
                    <Link
                      component={RouterLink}
                      to="/ConditionsEtPolitique"
                      sx={{ color: '#33a7b5', fontWeight: 'bold' }}
                    >
                      Conditions d'Utilisation et la{' '} Politique de Confidentialité
                    </Link>
                  </Typography>
                }
              />
              {errors.acceptedTerms && (
                <Typography variant="caption" color="error">
                  {errors.acceptedTerms}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                sx={{ backgroundColor: '#3cc35a', color: '#fff', '&:hover': { backgroundColor: '#33a7b5' } }}
                onClick={handleRegister}
                disabled={spinner}
              >
                {spinner ? <CircularProgress size={24} /> : "S'inscrire"}
              </Button>
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography variant="body2">
                Si vous avez un compte,{' '}
                <Link
                  component={RouterLink}
                  to="/Seconnect"
                  sx={{ color: '#33a7b5', fontWeight: 'bold' }}
                >
                  Connectez-vous !
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      )}

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

    <footer>
            <Box sx={{ textAlign: 'center', py: 2, mt: 4, backgroundColor: '#f5f5f5' }}>
              <Typography variant="body2">&copy; 2024 ELSAIDALIYA. Tous droits réservés.</Typography>
            </Box>
          </footer>
    </>
  );
};

export default Register;