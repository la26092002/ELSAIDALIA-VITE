import React, { useState } from 'react';
import { Box, Typography, Button, Grid, Avatar } from '@mui/material';
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
import pha from './../static/pha.jpg';
import ph6 from './../static/PH6.jpg';
import fourni from './../static/fourni.jpg';
import EmailIcon from '@mui/icons-material/ContactMail';
import PhoneIcon from '@mui/icons-material/ContactPhone';
import img1 from "./../../assets/img1.png";

const Principle = () => {
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

        <section className="hero">
          <Box
            sx={{
              textAlign: 'center',
              backgroundImage: `url(${pha})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '530px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#fff',
              margin: 0,
              padding: 0,
            }}
          >
            <Typography variant="h3" component="h1" sx={{ fontSize: '2.5em', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)' }}>
              Approvisionnement Pharmaceutique en un Clic!
            </Typography>
            <Typography variant="body1" sx={{ mt: 2, fontSize: '2.5em' }}>
              La plateforme de liaison entre pharmacien et fournisseur
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate('/about')}
              sx={{
                mt: 3,
                bgcolor: '#3cc35a',
                padding: '10px 20px',
                '&:hover': {
                  bgcolor: '#2a9a4b',
                },
              }}
            >
              En savoir plus
            </Button>
          </Box>
        </section>

        <section className="why-choose" sx={{ justifyContent: 'center' }}>
          <Grid container justifyContent="center" spacing={4} sx={{ mt: 2, px: { xs: 2, sm: 4, md: 8 } }}>
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <img src={ph6} alt="Pharmacien" style={{ maxWidth: '100%', borderRadius: '15px' }} />
                <Typography variant="body1" sx={{ mt: 2, fontSize: '16px', fontWeight: 'bold' }}>
                  Découvrez une sélection de produits pharmaceutiques de haute qualité pour répondre
                  aux besoins de vos patients.
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <img src={fourni} alt="Fournisseur" style={{ maxWidth: '100%', borderRadius: '15px' }} />
                <Typography variant="body1" sx={{ mt: 2, fontWeight: 'bold', fontSize: '16px' }}>
                  Connectez-vous avec des pharmaciens à la recherche de partenariats fiables pour
                  l'approvisionnement de leurs pharmacies.
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Grid container justifyContent="center" alignItems="center" spacing={4} sx={{ mt: 4, px: { xs: 2, sm: 6, md: 10 } }}>
            <Grid item xs={12} sm={6}>
              <Box sx={{ textAlign: 'center', p: 2, backgroundColor: '#f5f5f5', borderRadius: '12px' }}>
                <Typography variant="h5" component="h3" sx={{ color: '#33a7b5', fontWeight: 'bold', mb: 2 }}>
                  Maximisez votre visibilité!
                </Typography>
                <Typography variant="body1" sx={{ color: '#555', mb: 2 }}>
                  Simplifiez la prospection et atteignez de nouveaux marchés avec facilité.
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box sx={{ textAlign: 'center', p: 2, backgroundColor: '#f5f5f5', borderRadius: '12px' }}>
                <Typography variant="h5" component="h3" sx={{ color: '#33a7b5', fontWeight: 'bold', mb: 2 }}>
                  Explorez nos fournisseurs partenaires
                </Typography>
                <Typography variant="body1" sx={{ color: '#555' }}>
                  Localisez et contactez{' '}
                  <Button
                    variant="text"
                    sx={{ color: '#33a7b5', fontWeight: 'bold' }}
                    onClick={() => navigate('/fournisseurs')}
                  >
                    les fournisseurs
                  </Button>{' '}
                  qui offrent les produits dont vous avez besoin.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </section>

        <section className="service-client" style={{ textAlign: 'center', marginTop: '60px', padding: '40px 20px' }}>
          <Typography variant="h4" component="h2" sx={{ mb: 4, fontWeight: 'bold', color: '#33a7b5' }}>
            Service Client
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={8} md={6} lg={4}>
              <Box
                sx={{
                  textAlign: 'center',
                  boxShadow: 3,
                  borderRadius: '12px',
                  p: 4,
                  backgroundColor: '#fff',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 6,
                  },
                }}
              >
                <Avatar
                  src={`https://i.pravatar.cc/150?img=5`}
                  alt="Service Client"
                  sx={{
                    width: 120,
                    height: 120,
                    mx: 'auto',
                    border: '4px solid #33a7b5',
                  }}
                />
                <Typography variant="h5" sx={{ mt: 3, fontWeight: 'bold', color: '#333' }}>
                  Sonia
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 3 }}>
                  <EmailIcon sx={{ color: '#33a7b5', mr: 1, fontSize: '28px' }} />
                  <Typography
                    variant="body1"
                    sx={{ fontSize: '18px', fontWeight: 'bold', color: '#33a7b5', textDecoration: 'none' }}
                    component="a"
                    href="mailto:contact@elsaidaliya.com"
                  >
                    contact@elsaidaliya.com
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
                  <PhoneIcon sx={{ color: '#33a7b5', mr: 1, fontSize: '28px' }} />
                  <Typography
                    variant="body1"
                    sx={{ fontSize: '18px', fontWeight: 'bold', color: '#33a7b5' }}
                    component="a"
                    href="tel:+213553720952"
                  >
                    +213 553 720 952
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </section>

        <footer>
          <Box sx={{ textAlign: 'center', py: 2, mt: 4, backgroundColor: '#f5f5f5' }}>
            <Typography variant="body2">&copy; 2024 ELSAIDALIYA. Tous droits réservés.</Typography>
          </Box>
        </footer>
      </Box>
    </div>
  );
};

export default Principle;
