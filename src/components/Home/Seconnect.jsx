import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Grid, Link, Divider, List, ListItem, ListItemButton, ListItemText, CssBaseline, AppBar, Toolbar, IconButton, Drawer, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { URL } from '../../constants/Constants';

const Seconnect = () => {
  const [numberPhone, setNumberPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [spinner, setSpinner] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const drawerWidth = 240;

  const navItems = [
    { text: 'Accueil', link: '/' },
    { text: 'À propos', link: '/about' },
    { text: 'Fournisseurs', link: '/fournisseurs' },
    { text: 'Contact', link: '/contact' },
    { text: 'Se connecter', link: '/Seconnect' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const validateInputs = () => {
    let isValid = true;

    if (!numberPhone) {
      setPhoneError('Le numéro de téléphone est requis.');
      isValid = false;
    } else if (!/^\d{10}$/.test(numberPhone)) {
      setPhoneError('Le numéro de téléphone doit contenir 10 chiffres.');
      isValid = false;
    } else {
      setPhoneError('');
    }

    if (!password) {
      setPasswordError('Le mot de passe est requis.');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Le mot de passe doit contenir au moins 6 caractères.');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const handleLogin = async () => {
    if (!validateInputs()) return;

    setSpinner(true);
    setError('');

    try {
      const response = await fetch(URL + '/api/auth/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ numberPhone: numberPhone, password: password }),
      });

      setSpinner(false);

      if (!response.ok) {
        throw new Error('Échec de la connexion. Vérifiez vos identifiants.');
      }

      const data = await response.json();
      console.log('Login successful:', data);

      if (data.category === "Fournisseur") {
        localStorage.setItem("tokenFournisseur", data.token);
        localStorage.setItem("categorieFournisseur", data.category);
        localStorage.setItem("actorFournisseur", data.id);
        navigate('/fournisseur');
      } else {
        localStorage.setItem("tokenPharmacien", data.token);
        localStorage.setItem("categoriePharmacien", data.category);
        localStorage.setItem("actorPharmacien", data.id);
        navigate('/Pharmacien');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message);
    }
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
          <Typography variant="h4" sx={{ mb: 4, color: '#00796b', fontWeight: 'bold' }}>
            Se Connecter
          </Typography>
          {error && (
            <Typography sx={{ color: 'red', mb: 2 }}>
              {error}
            </Typography>
          )}
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Numéro de Téléphone"
                variant="outlined"
                value={numberPhone}
                onChange={(e) => setNumberPhone(e.target.value)}
                sx={{ fontSize: '1.2rem' }}
                error={!!phoneError}
                helperText={phoneError}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mot de Passe"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ fontSize: '1.2rem' }}
                error={!!passwordError}
                helperText={passwordError}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: '#00796b',
                  color: '#fff',
                  fontSize: '1.1rem',
                  padding: '10px',
                  fontWeight: 'bold',
                  boxShadow: '0px 4px 10px rgba(0, 121, 107, 0.4)',
                }}
                onClick={handleLogin}
              >
                Se Connecter
              </Button>
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography variant="body2">
                <Link
                  component={RouterLink}
                  to="/forgetpassword"
                  underline="hover"
                  sx={{ color: '#00796b', fontWeight: 'bold' }}
                >
                  Mot de passe oublié ?
                </Link>
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography variant="body2">
                Vous n'avez pas de compte ?{' '}
                <Link
                  component={RouterLink}
                  to="/register"
                  underline="hover"
                  sx={{ color: '#00796b', fontWeight: 'bold' }}
                >
                  Inscrivez-vous
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

export default Seconnect;