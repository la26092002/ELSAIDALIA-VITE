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
import FournisseurTable from './FournisseurTable';
import Fourniseur from './fourniseur/Fourniseur';

const FournisurSearch = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [nom, setNom] = useState('');
  const [wilaya, setWilaya] = useState('');

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
        <Box >
        <Fourniseur/>
        </Box>

        {/* Footer */}
        <footer>
          <Box 
          sx={{
            textAlign: 'center',
            py: 2,
            mt: 4,
            marginTop: wilaya.length !== 0 || nom.length !== 0 ? '90px' : '360px',
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
