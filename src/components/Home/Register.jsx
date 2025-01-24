import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, Typography, Grid, MenuItem, FormControl, InputLabel, Select, Link, CircularProgress } from '@mui/material';
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
    "Adrar", "Chlef", "Laghouat", "Oum El Bouaghi", "Batna", "Béjaïa", "Biskra", "Béchar",
    "Blida", "Bouira", "Tamanrasset", "Tébessa", "Tlemcen", "Tiaret", "Tizi Ouzou", "Alger",
    "Djelfa", "Jijel", "Sétif", "Saïda", "Skikda", "Sidi Bel Abbès", "Annaba", "Guelma",
    "Constantine", "Médéa", "Mostaganem", "M’Sila", "Mascara", "Ouargla", "Oran", "El Bayadh",
    "Illizi", "Bordj Bou Arreridj", "Boumerdès", "El Tarf", "Tindouf", "Tissemsilt", "El Oued",
    "Khenchela", "Souk Ahras", "Tipaza", "Mila", "Aïn Defla", "Naâma", "Aïn Témouchent", "Ghardaïa",
    "Relizane", "Timimoun", "Bordj Badji Mokhtar", "Ouled Djellal", "Béni Abbès", "In Salah", "In Guezzam",
    "Touggourt", "Djanet", "El M’Ghair", "El Meniaa"
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
    // if (!prenom) newErrors.prenom = 'Le prénom est requis';
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    setSpinner(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("nom", nom);
    formData.append("prenom", prenom);
    formData.append("telephone", telephone);
    formData.append("email", email);
    formData.append("willaya", willaya);
    formData.append("category", role);
    formData.append("password", password);

    try {
      console.log(formData)
      const response = await fetch(URL + "/api/auth/register", {
        method: "POST",
        body: formData,
      });

      setSpinner(false);
      if (response.ok) {
        const result = await response.json();
        alert("Inscription réussie !");
        navigate("/Seconnect");
      } else {
        const error = await response.json();
        alert(`Échec de l'inscription: ${error.message}`);
      }
    } catch (err) {
      console.error("Erreur:", err);
      alert("Une erreur s'est produite. Veuillez réessayer.");
    }
  };

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar component="nav" sx={{ bgcolor: '#00796b' }}>
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
                <Button key={item.text} sx={{ color: '#fff', fontSize: '17px', fontWeight: 'bold', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)' }} onClick={() => navigate(item.link)}>
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
            ModalProps={{ keepMounted: true }}
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
          <Typography variant="h4" sx={{ mb: 3, textAlign: 'center', color: '#00796b' }}>
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
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth error={!!errors.willaya}>
                <InputLabel>Wilaya</InputLabel>
                <Select
                  value={willaya}
                  onChange={(e) => setWillaya(e.target.value)}
                  label="Wilaya"
                >
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
                onChange={(e) => setPassword(e.target.value)}
                error={!!errors.password}
                helperText={errors.password}
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
              <Button
                fullWidth
                variant="contained"
                sx={{ backgroundColor: '#00796b', color: '#fff' }}
                onClick={handleRegister}
              >
                S'inscrire
              </Button>
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography variant="body2">
                Si vous avez un compte,{' '}
                <Link
                  component={RouterLink}
                  to="/Seconnect"
                  sx={{ color: '#00796b', fontWeight: 'bold' }}
                >
                  Connectez-vous !
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      )}

       <footer>
                <Box sx={{ textAlign: 'center', py: 2, mt: 4 }}>
                  <Typography variant="body2">&copy; 2024 ELSAIDALIYA. Tous droits réservés.</Typography>
                </Box>
              </footer>
    </>
  );
};

export default Register;