import React, { useState } from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
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

const OffreDetails = () => {
  const offres = [
    {
      title: 'Offre Bronze',
      price: '10 000 DZ / mois | 100 000 DZ / an',
      benefits: ['Les produits sont visibles dans les résultats de recherche, mais sans priorité.'],
    },
    {
      title: 'Offre Argent',
      price: '15 000 DZ / mois | 150 000 DZ / an',
      benefits: [
        'Les produits sont mis en avant dans les résultats de recherche pour une meilleure visibilité.',
        'Notification pour pharmaciens lorsque de nouveaux produits sont publiés.',
      ],
    },
    {
      title: 'Offre Or',
      price: '25 000 DZ / mois | 250 000 DZ / an',
      benefits: [
        'Vous bénéficiez de la priorité maximale sur les résultats de recherche pour un meilleur positionnement.',
        'Notification aux pharmaciens chaque fois que de nouveaux produits sont publiés.',
        'Annonces dédiées sur la page d’accueil de la plateforme, maximisant ainsi votre exposition.',
        'Newsletter mensuelle : les produits sont envoyés dans une newsletter ciblée, atteignant des milliers de pharmaciens.',
      ],
    },
  ];

  return (
    <Box sx={{ bgcolor: '#f5f5f5', py: 4, px: 2 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ color: '#00796b', mb: 4 }}>
        Nos Offres
      </Typography>
      <Grid container spacing={3}>
        {offres.map((offre, index) => (
          <Grid item xs={12} md={4} key={index} sx={{ display: 'flex' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                backgroundColor: '#fff',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
                },
                height: '100%',
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: '#00796b',
                  fontWeight: 'bold',
                  mb: '10px',
                  textAlign: 'center',
                }}
              >
                {offre.title}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: '#333',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  mb: 2,
                }}
              >
                Prix : {offre.price}
              </Typography>
              <Box component="ul" sx={{ flexGrow: 1 }}>
                {offre.benefits.map((benefit, i) => (
                  <li key={i}>
                    <Typography variant="body2" sx={{ color: '#333', lineHeight: '1.6' }}>
                      {benefit}
                    </Typography>
                  </li>
                ))}
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const FournisurSearch = () => {
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
      <Typography variant="h6" sx={{ mx: 2 }}>
        New Company Name
      </Typography>
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
    <Box sx={{ bgcolor: '#f5f5f5' }}>
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
      <Box component="main">
        <Toolbar />
        <OffreDetails />
        <footer>
          <Box
            sx={{
              textAlign: 'center',
              py: 2,
              mt: 4,
            }}
          >
            <Typography variant="body2">&copy; 2024 ELSAIDALIYA. Tous droits réservés.</Typography>
          </Box>
        </footer>
      </Box>
    </Box>
  );
};

export default FournisurSearch;
