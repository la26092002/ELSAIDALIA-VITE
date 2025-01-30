import React, { useState } from 'react';
import {
  Box, TextField, Button, Typography, Grid, Link, Divider, List, ListItem, ListItemButton, ListItemText,
  CssBaseline, AppBar, Toolbar, IconButton, Drawer, CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { URL } from '../../constants/Constants';

const Valid = () => {
  const [number, setNumber] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
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

  const handleValidate = async () => {
    setSpinner(true);
    setError('');
    setSuccess('');

    const token = localStorage.getItem('email'); // Retrieve the token from localStorage

    if (!token) {
      setSpinner(false);
      setError('Token is missing. Please try the process again.');
      return;
    }

    try {
      const response = await fetch(`${URL}/api/auth/validate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({
          number: parseInt(number),
          newPassword,
        }),
      });

      setSpinner(false);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Validation failed');
      }

      const data = await response.json();
      setSuccess('Validation and password reset successful!');
      setTimeout(() => {
        navigate('/seconnect'); // Navigate to the login page or any other page
      }, 2000);
    } catch (err) {
      console.error('Validation error:', err);
      setError(err.message || 'Validation failed.');
    }
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
            Validate and Reset Password
          </Typography>
          {error && (
            <Typography sx={{ color: 'red', mb: 2 }}>
              {error}
            </Typography>
          )}
          {success && (
            <Typography sx={{ color: 'green', mb: 2 }}>
              {success}
            </Typography>
          )}
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Enter Code"
                variant="outlined"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                sx={{ fontSize: '1.2rem' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="New Password"
                variant="outlined"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
                onClick={handleValidate}
              >
                Validate and Reset Password
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default Valid;