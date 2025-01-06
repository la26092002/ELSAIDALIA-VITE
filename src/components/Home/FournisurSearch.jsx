import React, { useState } from 'react';
import { Box, Typography, Button, Grid, TextField } from '@mui/material';
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

const FournisurSearch = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [nom, setNom] = useState('');
  const [wilaya, setWilaya] = useState('');
  const [results, setResults] = useState([]);
  
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

  const handleSearch = () => {
    // Simulated search results based on input
    setResults([
      { title: 'Résultat 1', description: 'Description du premier résultat.' },
      { title: 'Résultat 2', description: 'Description du deuxième résultat.' },
      { title: 'Résultat 3', description: 'Description du troisième résultat.' },
    ]);
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
    <div sx={{ bgcolor: '#f5f5f5' }}>
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
        <Box sx={{ padding: '20px' }}>
          {/* Search Bar */}
          <Box
            sx={{
              display: 'flex',
              gap: '20px',
              mb: 4,
              justifyContent: 'center',
            }}
          >
            <TextField
              label="Nom"
              variant="outlined"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              sx={{ width: '300px' }}
            />
            <TextField
              label="Wilaya"
              variant="outlined"
              value={wilaya}
              onChange={(e) => setWilaya(e.target.value)}
              sx={{ width: '300px' }}
            />
            <Button
              variant="contained"
              onClick={handleSearch}
              sx={{ backgroundColor: '#00796b', color: '#fff', height: '55px' }}
            >
              Rechercher
            </Button>
          </Box>

          {/* Search Results */}
          {results.length > 0 && (
            <Grid container spacing={4}>
              {results.map((result, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Box
                    sx={{
                      backgroundColor: '#fff',
                      padding: '20px',
                      borderRadius: '10px',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
                      },
                    }}
                  >
                    <Typography variant="h5" sx={{ color: '#00796b', fontWeight: 'bold', mb: '10px' }}>
                      {result.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#333', mb: '15px' }}>
                      {result.description}
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: '#00796b', color: '#fff' }}
                      onClick={() => navigate(`/details/${index}`)}
                    >
                      Voir plus
                    </Button>
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>

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

export default FournisurSearch;
