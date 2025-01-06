import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  CssBaseline,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

const FournisurDetail = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Products');
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
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
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

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
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
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
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
      </Box>

      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <Box sx={{ maxWidth: 900, mx: 'auto', bgcolor: 'white', p: 3, borderRadius: 2, boxShadow: 3 ,mt:7}}>
          <Typography variant="h4" align="center" color="#00796b" gutterBottom sx={{p:1,fontWeight:'bold'}}>
            Nom du Fournisseur
          </Typography>
          <Typography variant="body1" align="justify" color="textSecondary" sx={{p:2,fontSize:'18px'}} paragraph>
            Ce fournisseur est reconnu pour la qualité exceptionnelle de ses produits. Avec des années d'expérience dans
            l'industrie, il propose des solutions sur mesure adaptées aux besoins spécifiques des entreprises et des
            particuliers.
          </Typography>

          {/* Tabs Section */}
          <Box sx={{ display: 'flex', justifyContent: 'space-evenly', borderBottom: 1, borderColor: 'divider' }}>
            <Button
              onClick={() => handleTabChange('Products')}
              sx={{
                color: activeTab === 'Products' ? '#00796B' : 'text.secondary',
                borderBottom: activeTab === 'Products' ? '3px solid #00796B' : 'none',
              }}
            >
              Produits
            </Button>
            <Button
              onClick={() => handleTabChange('Cotas')}
              sx={{
                color: activeTab === 'Cotas' ? '#00796b' : 'text.secondary',
                borderBottom: activeTab === 'Cotas' ? '3px solid #00796B' : 'none',
              }}
            >
              Cotas de Produits
            </Button>
            <Button
              onClick={() => handleTabChange('Offers')}
              sx={{
                color: activeTab === 'Offers' ? '#00796B' : 'text.secondary',
                borderBottom: activeTab === 'Offers' ? '3px solid #00796B' : 'none',
              }}
            >
              Offres
            </Button>
          </Box>

          {/* Tab Content */}
          <Box sx={{ mt: 3 }}>
            {activeTab === 'Products' && (
              <Box>
                <Typography variant="h5" gutterBottom color="#00796b" sx={{fontSize:'25px',fontWeight:'bold',padding:'6px 6px'}}>
                  Liste des Produits
                </Typography>
                <Typography variant="body2">Voici la liste des produits proposés par ce fournisseur.</Typography>
                <Box sx={{ mt: 2 }}>
                  <ul>
                    <li>Produit 1</li>
                    <li>Produit 2</li>
                    <li>Produit 3</li>
                    <li>Produit 4</li>
                  </ul>
                </Box>
              </Box>
            )}
            {activeTab === 'Cotas' && (
              <Box>
                <Typography variant="h5" gutterBottom color="#00796b" sx={{fontSize:'25px',fontWeight:'bold',padding:'6px 6px'}}>
                  Cotas de Produits
                </Typography>
                <Typography variant="body2">
                  Ces cotas représentent les limites d'approvisionnement pour les produits proposés par ce fournisseur.
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <ul>
                    <li>Cota Produit 1</li>
                    <li>Cota Produit 2</li>
                    <li>Cota Produit 3</li>
                  </ul>
                </Box>
              </Box>
            )}
            {activeTab === 'Offers' && (
              <Box>
                <Typography variant="h5" gutterBottom color="#00796b" sx={{fontSize:'25px',fontWeight:'bold',padding:'6px 6px'}}>
                  Offres Spéciales
                </Typography>
                <Typography variant="body2">
                  Découvrez les offres spéciales et promotions proposées par ce fournisseur.
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <ul>
                    <li>Offre 1: 20% de réduction sur Produit 1</li>
                    <li>Offre 2: Livraison gratuite pour Produit 2</li>
                    <li>Offre 3: Achat groupé pour Produit 3</li>
                  </ul>
                </Box>
              </Box>
            )}
          </Box>
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

export default FournisurDetail;
