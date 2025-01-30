import React, { useState } from 'react';
import { AppBar, Box, Button, Typography, Toolbar, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const FournisseurDetail = () => {
  const [activeTab, setActiveTab] = useState('Products');
  const navigate = useNavigate();

  const navItems = [
    { text: 'Produits', link: '/produits' },
    { text: 'Offres', link: '/offres' },
    { text: 'Cotas', link: '/cotas' },
  ];

  const handleTabChange = (tab) => setActiveTab(tab);

  return (
    <Box>
      {/* Navbar */}
      <AppBar component="nav" sx={{ bgcolor: '#33a7b5' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
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
                  '&:hover': { backgroundColor: '#3cc35a' },
                }}
                onClick={() => navigate(item.link)}
              >
                {item.text}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box component="main" sx={{ p: 3, bgcolor: '#eff8fa' }}>
        <Toolbar />
        <Box sx={{ maxWidth: 900, mx: 'auto', bgcolor: 'white', p: 3, borderRadius: 2, boxShadow: 3, mt: 7 }}>
          <Typography
            variant="h4"
            align="center"
            color="#33a7b5"
            gutterBottom
            sx={{ p: 1, fontWeight: 'bold' }}
          >
            Nom du Fournisseur
          </Typography>
          <Typography variant="body1" align="justify" color="textSecondary" sx={{ p: 2, fontSize: '18px' }} paragraph>
            Ce fournisseur est reconnu pour la qualité exceptionnelle de ses produits.
          </Typography>

          {/* Tabs Section */}
          <Box sx={{ display: 'flex', justifyContent: 'space-evenly', borderBottom: 1, borderColor: 'divider' }}>
            <Button
              onClick={() => handleTabChange('Products')}
              sx={{
                color: activeTab === 'Products' ? '#33a7b5' : 'text.secondary',
                borderBottom: activeTab === 'Products' ? '3px solid #33a7b5' : 'none',
              }}
            >
              Produits
            </Button>
            <Button
              onClick={() => handleTabChange('Cotas')}
              sx={{
                color: activeTab === 'Cotas' ? '#33a7b5' : 'text.secondary',
                borderBottom: activeTab === 'Cotas' ? '3px solid #33a7b5' : 'none',
              }}
            >
              Cotas de Produits
            </Button>
            <Button
              onClick={() => handleTabChange('Offers')}
              sx={{
                color: activeTab === 'Offers' ? '#33a7b5' : 'text.secondary',
                borderBottom: activeTab === 'Offers' ? '3px solid #33a7b5' : 'none',
              }}
            >
              Offres
            </Button>
          </Box>

          {/* Tab Content */}
          <Box sx={{ mt: 3 }}>
            {activeTab === 'Products' && (
              <Box>
                <Typography
                  variant="h5"
                  gutterBottom
                  color="#33a7b5"
                  sx={{ fontSize: '25px', fontWeight: 'bold', padding: '6px 6px' }}
                >
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
                <Typography
                  variant="h5"
                  gutterBottom
                  color="#33a7b5"
                  sx={{ fontSize: '25px', fontWeight: 'bold', padding: '6px 6px' }}
                >
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
                <Typography
                  variant="h5"
                  gutterBottom
                  color="#33a7b5"
                  sx={{ fontSize: '25px', fontWeight: 'bold', padding: '6px 6px' }}
                >
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

          <footer>
                  <Box sx={{ textAlign: 'center', py: 2, mt: 4, backgroundColor: '#f5f5f5' }}>
                    <Typography variant="body2">&copy; 2024 ELSAIDALIYA. Tous droits réservés.</Typography>
                  </Box>
                </footer>
        </Box>
      </Box>
    </Box>
  );
};

export default FournisseurDetail;
