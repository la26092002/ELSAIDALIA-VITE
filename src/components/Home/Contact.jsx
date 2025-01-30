import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  TextField,
  CssBaseline,
  Divider,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { URL } from '../../constants/Constants';
import MapComponent from './MapComponent';

const Contact = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Success:', data);
        alert('Message envoyé avec succès!');
        setFormData({ name: '', email: '', message: '' }); // Reset form fields
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData);
        alert('Échec de l\'envoi du message. Veuillez réessayer.');
      }
    } catch (error) {
      console.error('Network Error:', error);
      alert('Une erreur réseau s\'est produite. Veuillez vérifier votre connexion.');
    }
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
            <ListItemButton
              onClick={() => navigate(item.link)}
              sx={{ textAlign: 'center' }}
            >
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

      <Box component="main">
        <Toolbar />
        <main>
          {/* Main Content Grid */}
          <Grid container spacing={4} sx={{ px: 4, py: 4 }}>
            {/* Left Side: Contact Information */}
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: 'left', mb: 4 }}>
                <Typography variant="h4" sx={{ color: '#33a7b5', fontWeight: 'bold', mb: 2 }}>
                  Nous Contacter
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  Pour toute question ou demande, n'hésitez pas à nous contacter via les informations ci-dessous.
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6" sx={{ color: '#33a7b5', mb: 1 }}>
                    Suivez-nous sur les réseaux sociaux :
                  </Typography>
                  <Box>
                    <IconButton
                      aria-label="Facebook"
                      href="https://www.facebook.com/share/15YtywS4Kp/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FacebookIcon sx={{ color: '#3b5998', fontSize: '2rem' }} />
                    </IconButton>
                    <IconButton
                      aria-label="Instagram"
                      href="https://www.instagram.com/el_saidaliya?igsh=M2w3dHRlNnU3ZmQz"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <InstagramIcon sx={{ color: '#E1306C', fontSize: '2rem' }} />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </Grid>

            {/* Right Side: Contact Form */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  backgroundColor: '#f5f5f5', // Dialog background
                  padding: '20px',
                  borderRadius: '10px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}
              >
                <Typography variant="h4" sx={{ color: '#33a7b5', fontWeight: 'bold', mb: 2 }}>
                  Formulaire de Contact
                </Typography>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Nom"
                        name="name"
                        variant="outlined"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        variant="outlined"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Message"
                        name="message"
                        variant="outlined"
                        multiline
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{ backgroundColor: '#3cc35a', color: '#fff' }} // Button background
                      >
                        Envoyer
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Box>
            </Grid>

            {/* MapComponent at the bottom */}
            <Grid item xs={12}>
              <Box sx={{ width: '100%', height: '400px', mt: 4 }}>
                <Typography variant="h6" sx={{ color: '#33a7b5', mb: 2 }}>
                  Nos Coordonnées GPS :
                </Typography>
                <MapComponent />
              </Box>
            </Grid>
          </Grid>
        </main>

        {/* Footer */}
        <footer >
                <Box sx={{ textAlign: 'center', py: 2, mt: 4, backgroundColor: '#f5f5f5',marginTop: '220px' }}>
                  <Typography variant="body2">&copy; 2024 ELSAIDALIYA. Tous droits réservés.</Typography>
                </Box>
              </footer>
      </Box>
    </div>
  );
};

export default Contact;
