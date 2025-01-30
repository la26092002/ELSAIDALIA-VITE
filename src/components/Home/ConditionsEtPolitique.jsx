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

const ConditionsEtPolitique = () => {
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
    <div style={{ backgroundColor: '#e0f7fa' }}>
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
        <div className="container">
          {/* Conditions d'Utilisation */}
          <section className="section">
            <h2 className="header">I. Conditions d'Utilisation</h2>
            <h3 className="subHeader">Bienvenue sur EL SAIDALIYA</h3>
            <p className="text">
              En utilisant ce site, vous acceptez de vous conformer aux présentes Conditions d'Utilisation. Si vous n'êtes pas d'accord avec ces termes, veuillez ne pas utiliser notre site.
            </p>
            <h3 className="subHeader">1. Rôle d’ELSAIDALIYA</h3>
            <p className="text">
              • EL SAIDALIYA agit uniquement en tant qu'intermédiaire entre les pharmaciens et les fournisseurs. Elle permet aux pharmaciens de rechercher des produits, de consulter les catalogues des fournisseurs, et aux fournisseurs d’exposer leurs produits. ELSAIDALIYA ne gère pas directement les transactions commerciales, les paiements, ni les livraisons, qui sont à la charge exclusive des pharmaciens et des fournisseurs concernés.
            </p>
            <p className="text">
              • En tant qu’intermédiaire, ELSAIDALIYA ne peut être tenue responsable des erreurs ou des litiges liés aux transactions entre les pharmaciens et les fournisseurs.
            </p>

            <h3 className="subHeader">2. Responsabilités des utilisateurs</h3>
            <p className="text">
              • Pharmaciens : Les pharmaciens s’engagent à :
              <br /> - Vérifier les informations des produits qu'ils recherchent.
              <br /> - Fournir des informations exactes et complètes lors de la commande.
              <br /> - Communiquer directement avec le fournisseur pour toute question concernant les produits, la disponibilité ou les livraisons.
            </p>
            <p className="text">
              • Fournisseurs : Les fournisseurs s’engagent à :
              <br /> - Mettre à jour les informations concernant les produits (prix, disponibilités, etc.).
              <br /> - Assurer la conformité des produits livrés et les délais de livraison.
              <br /> - Assumer la gestion des paiements et des livraisons une fois la commande passée.
            </p>

            <h3 className="subHeader">3. Utilisation interdite</h3>
            <p className="text">
              • L'utilisateur s'engage à ne pas utiliser la plateforme à des fins frauduleuses, comme la diffusion d’informations erronées ou la tentative d’usurpation d’identité.
              <br /> • Toute utilisation de la plateforme à des fins autres que celles prévues (recherche de produits pharmaceutiques et commande) est interdite.
            </p>

            <h3 className="subHeader">4. Transactions</h3>
            <p className="text">
              • Transaction commerciale : Les transactions entre pharmaciens et fournisseurs sont effectuées directement entre ces deux parties. ELSAIDALIYA sert uniquement à faciliter la mise en relation et la gestion des informations.
              <br /> • Paiements et livraisons : Les paiements et livraisons sont gérés exclusivement entre le pharmacien et le fournisseur. ELSAIDALIYA ne gère pas les paiements ni la logistique.
            </p>

            <h3 className="subHeader">5. Limitation de responsabilité</h3>
            <p className="text">
              • Responsabilité d’ELSAIDALIYA: En tant qu’intermédiaire, ELSAIDALIYA ne sera pas responsable des problèmes qui peuvent survenir lors de la transaction entre le pharmacien et le fournisseur, comme les défauts de produit, les retards de livraison, ou les litiges sur les prix.
              <br /> • Responsabilité du pharmacien et du fournisseur: Chaque utilisateur (pharmacien ou fournisseur) est responsable de la qualité de ses informations et des engagements pris dans le cadre de la transaction.
            </p>
          </section>

          {/* Politique de Confidentialité */}
          <section className="section">
            <h2 className="header">II. Politique de Confidentialité</h2>
            <h3 className="subHeader">1. Collecte des Informations</h3>
            <p className="text">
              Nous collectons des informations personnelles lorsque vous vous inscrivez sur notre site, passez une commande ou interagissez avec notre service client. Les informations collectées peuvent inclure votre nom, adresse, adresse e-mail, numéro de téléphone, et informations de paiement.
            </p>

            <h3 className="subHeader">2. Utilisation des Informations</h3>
            <p className="text">
              Les informations collectées sont utilisées pour traiter vos commandes, améliorer notre site, et fournir un service client efficace.
              <br /> Nous pouvons également utiliser vos informations pour vous envoyer des mises à jour sur votre commande, ainsi que des informations promotionnelles, sauf si vous choisissez de ne pas recevoir ces communications.
            </p>

            <h3 className="subHeader">3. Partage des Informations</h3>
            <p className="text">
              Nous ne vendons, n'échangeons, ni ne transférons vos informations personnelles à des tiers sans votre consentement, sauf si cela est nécessaire pour fournir les services que vous avez demandés.
              <br /> Nous pouvons partager vos informations avec des prestataires de services tiers qui nous aident à exploiter notre site et à mener nos affaires.
            </p>

            <h3 className="subHeader">4. Sécurité des Données</h3>
            <p className="text">
              Nous prenons des mesures de sécurité appropriées pour protéger vos informations personnelles contre toute perte, mauvaise utilisation, ou accès non autorisé. Cependant, aucune méthode de transmission sur Internet n’est entièrement sécurisée.
            </p>

            <h3 className="subHeader">5. Accès et Modification des Informations</h3>
            <p className="text">
              Vous pouvez accéder, corriger ou supprimer vos informations personnelles en vous connectant à votre compte ou en nous contactant directement.
            </p>

            <h3 className="subHeader">6. Cookies</h3>
            <p className="text">
              Nous utilisons des cookies pour améliorer l'expérience utilisateur sur notre site. Vous pouvez gérer les paramètres des cookies dans votre navigateur.
            </p>

            <h3 className="subHeader">7. Consentement</h3>
            <p className="text">
              En utilisant notre site, vous consentez à notre politique de confidentialité et acceptez la collecte et l’utilisation de vos informations comme décrit.
            </p>

            <h3 className="subHeader">8. Modifications de la Politique</h3>
            <p className="text">
              Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Toute modification sera publiée sur cette page avec la date de mise à jour.
            </p>
          </section>
        </div>
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

export default ConditionsEtPolitique;
