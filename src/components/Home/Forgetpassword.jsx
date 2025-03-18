import React, { useState } from 'react';
import {
  Box, TextField, Button, Typography, Grid, Link, Divider, List, ListItem, ListItemButton, ListItemText,
  CssBaseline, AppBar, Toolbar, IconButton, Drawer, CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { URL } from '../../constants/Constants';
import img1 from "./../../assets/img1.png";
const Forgetpassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
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

  const handleLogin = async () => {
    setSpinner(true);
    setError('');
    try {
      const response = await fetch(`${URL}/api/auth/email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      setSpinner(false);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors?.[0]?.msg || 'Failed to process request');
      }

      const data = await response.json();
      // Save the token to localStorage
      localStorage.setItem('email', data.token);

      // Navigate to the validate route
      navigate('/validate');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Failed to process request.');
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex', backgroundColor: '#eff8fa' }}>
        <CssBaseline />
        <AppBar component="nav" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
                  <Toolbar>
                    <IconButton
                      color="inherit"
                      aria-label="open drawer"
                      edge="start"
                      onClick={handleDrawerToggle}
                      sx={{ mr: 2, display: { md: 'none' }, color: '#000' }} // Show menu icon on medium and smaller screens
                    >
                      <MenuIcon />
                    </IconButton>
                    <div style={{ flexGrow: 1, height: 50 }}>
                      <img src={img1} alt="Logo" style={{ height: 50 }} />
                    </div>
        
                    <Box sx={{ display: { xs: 'none', md: 'block' }, mr: 6 }}> {/* Show nav items on medium and larger screens */}
                      {navItems.map((item) => (
                        <Button
                          key={item.text}
                          sx={{
                            color: '#33a7b5',
                            textAlign: 'center',
                            padding: { xs: '8px 12px', sm: '10px 16px', md: '14px 20px' }, // Responsive padding
                            fontSize: { xs: '14px', sm: '16px', md: '17px' }, // Responsive font size
                            fontWeight: 'bold',
                            textShadow: '1px 1px 2px rgba(255, 255, 255, 0.5)',
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
            backgroundColor: '#fff',
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
            backgroundColor: '#fff',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" sx={{ mb: 4, color: '#33a7b5', fontWeight: 'bold' }}>
            Mot de passe oublié
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
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ fontSize: '1.2rem' }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: '#3cc35a',
                  color: '#fff',
                  fontSize: '1.1rem',
                  padding: '10px',
                  fontWeight: 'bold',
                  boxShadow: '0px 4px 10px rgba(60, 195, 90, 0.4)',
                  '&:hover': { backgroundColor: '#33a7b5' },
                }}
                onClick={handleLogin}
              >
                Cliquez et vérifiez votre email.
              </Button>
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography variant="body2">
                Vous n'avez pas de compte ?{' '}
                <Link
                  component={RouterLink}
                  to="/register"
                  underline="hover"
                  sx={{ color: '#33a7b5', fontWeight: 'bold' }}
                >
                  Inscrivez-vous
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default Forgetpassword;