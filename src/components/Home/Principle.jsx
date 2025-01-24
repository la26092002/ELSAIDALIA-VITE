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
    <div sx={{ bgcolor: '#e0f7fa' }}>
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
                bgcolor: '#00796b',
                padding: '10px 20px',
                '&:hover': {
                  bgcolor: '#005f56',
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
                <Typography variant="h5" component="h3" sx={{ color: '#00796b', fontWeight: 'bold', mb: 2 }}>
                  Maximisez votre visibilité!
                </Typography>
                <Typography variant="body1" sx={{ color: '#555', mb: 2 }}>
                  Simplifiez la prospection et atteignez de nouveaux marchés avec facilité.
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box sx={{ textAlign: 'center', p: 2, backgroundColor: '#f5f5f5', borderRadius: '12px' }}>
                <Typography variant="h5" component="h3" sx={{ color: '#00796b', fontWeight: 'bold', mb: 2 }}>
                  Explorez nos fournisseurs partenaires
                </Typography>
                <Typography variant="body1" sx={{ color: '#555' }}>
                  Localisez et contactez{' '}
                  <Button
                    variant="text"
                    sx={{ color: '#00796b', fontWeight: 'bold' }}
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

        {/* Service Client Section */}
        <section className="service-client" style={{ textAlign: 'center', marginTop: '30px' }}>
          <Typography variant="h4" component="h2" sx={{ mb: 2 }}>Service Client</Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ textAlign: 'center', boxShadow: 3, borderRadius: 2, p: 2, width: '60%', marginLeft: '15%' }}>
                <Avatar src={`https://i.pravatar.cc/150?img=5`} alt="Service Client" sx={{ width: 90, height: 90, mx: 'auto' }} />
                <Typography variant="h6" sx={{ mt: 3, fontSize: '25px' }}>Sonia</Typography>
                
                {/* Email Section */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
                  <EmailIcon sx={{ color: '#00796b', mr: 1 }} /> {/* Email icon */}
                  <Typography variant="body1" sx={{ fontSize: '18px', fontWeight: 'bold', color: '#00796b' }}>
                    contact@elsaidaliya.com
                  </Typography>
                </Box>

                {/* Phone Section */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
                  <PhoneIcon sx={{ color: '#00796b', mr: 1 }} /> {/* Phone icon */}
                  <Typography variant="body1" sx={{ fontSize: '18px', fontWeight: 'bold', color: '#00796b' }}>
                    +213553720952
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </section>

        {/* Footer */}
        <footer>
          <Box sx={{ textAlign: 'center', py: 2, mt: 4 }}>
            <Typography variant="body2">&copy; 2024 ELSAIDALIYA. Tous droits réservés.</Typography>
          </Box>
        </footer>
      </Box>
    </div>
  );
};

export default Principle;