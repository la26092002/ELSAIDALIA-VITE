import React, { useState } from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
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
import img1 from "./../../assets/img1.png";
const Aprops = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerWidth = 240;
  const navigate = useNavigate();

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
        ELSAIDALIYA
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
    <div sx={{ bgcolor: '#eff8fa' }}>
      <Box sx={{ display: 'flex' }}>
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

      <Box component="main">
        <Toolbar />
        <main>
          <Box
            sx={{
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              marginBottom: '20px',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
              },
            }}
          >
            <Typography variant="h1" sx={{ color: '#33a7b5', fontSize: '2rem', fontWeight: 'bold', mb: '15px' }}>
              Qui Sommes-Nous?
            </Typography>
            <Typography variant="body1" sx={{ color: '#333', fontSize: '1rem', lineHeight: '1.6', mb: '10px' }}>
              ELSAIDALIYA est une plateforme de liaison entre pharmaciens et fournisseurs, votre destination numérique
              pour simplifier et optimiser les échanges commerciaux dans le domaine pharmaceutique.
            </Typography>
            <Typography variant="body1" sx={{ color: '#333', fontSize: '1rem', lineHeight: '1.6', mb: '10px' }}>
              Notre site web est conçu pour offrir une expérience fluide et efficace, où les fournisseurs peuvent
              présenter leurs produits et où les pharmaciens peuvent passer des commandes en toute simplicité.
            </Typography>
          </Box>

          <Box
            sx={{
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              marginBottom: '20px',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
              },
            }}
          >
            <Typography variant="h2" sx={{ color: '#33a7b5', fontSize: '1.5rem', fontWeight: 'bold', mb: '15px' }}>
              Explorez, Comparez, Commandez
            </Typography>
            <Typography variant="body1" sx={{ color: '#333', fontSize: '1rem', lineHeight: '1.6', mb: '10px' }}>
              Notre plateforme offre une gamme d’outils pratiques pour parcourir les catalogues des fournisseurs,
              comparer les produits, vérifier les disponibilités en temps réel et passer des commandes en quelques clics.
            </Typography>
            <Typography variant="body1" sx={{ color: '#333', fontSize: '1rem', lineHeight: '1.6', mb: '10px' }}>
              Vous bénéficiez d’une visibilité totale sur les tarifs, les promotions en cours et les délais de livraison,
              ce qui vous permet de prendre des décisions éclairées et de gérer efficacement vos stocks.
            </Typography>
          </Box>

          <Box
            sx={{
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              marginBottom: '20px',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
              },
            }}
          >
            <Typography variant="h2" sx={{ color: '#33a7b5', fontSize: '1.5rem', fontWeight: 'bold', mb: '15px' }}>
              Créez Votre Compte et Mettez en Avant Vos Produits
            </Typography>
            <Typography variant="body1" sx={{ color: '#333', fontSize: '1rem', lineHeight: '1.6', mb: '10px' }}>
              En tant que fournisseur, vous avez la possibilité de créer un compte sur notre plateforme et de
              télécharger les informations détaillées sur vos produits, y compris les descriptions, les prix, les
              conditions commerciales et les disponibilités.
            </Typography>
            <Typography variant="body1" sx={{ color: '#333', fontSize: '1rem', lineHeight: '1.6', mb: '10px' }}>
              Vous pouvez également mettre en avant vos promotions spéciales et vos nouveautés pour attirer l’attention
              des pharmacies partenaires.
            </Typography>
          </Box>

          <Box
            sx={{
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
              },
            }}
          >
            <Typography variant="h1" sx={{ color: '#33a7b5', fontSize: '2rem', fontWeight: 'bold', mb: '15px' }}>
              Rejoignez-nous dès aujourd'hui!
            </Typography>
            <Typography variant="body1" sx={{ color: '#333', fontSize: '1rem', lineHeight: '1.6', mb: '10px' }}>
              Découvrez comment nous pouvons transformer votre expérience d'approvisionnement pharmaceutique pour le mieux!
            </Typography>
            <Box sx={{ textAlign: 'center', mt: '20px' }}>
              <Link to="/register" style={{ textDecoration: 'none' }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#3cc35a',
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: '#2e9e48',
                    },
                  }}
                >
                  Inscrivez-vous maintenant
                </Button>
              </Link>
            </Box>
          </Box>
        </main>

        {/* Footer */}
       <footer>
                   <Box sx={{ textAlign: 'center', py: 2, mt: 4, backgroundColor: '#f5f5f5' }}>
                     <Typography variant="body2">&copy; 2024 ELSAIDALIYA. Tous droits réservés.</Typography>
                   </Box>
                 </footer>
      </Box>
    </div>
  );
};

export default Aprops;
