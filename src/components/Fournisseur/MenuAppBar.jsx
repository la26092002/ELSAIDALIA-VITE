import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Link, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom

const drawerWidth = 240;

export default function MenuAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [sidebar, setSidebar] = React.useState(false);

  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeconnect = () => {
    setAnchorEl(null);
    localStorage.removeItem("token");
    navigate("/Seconnect");

  };

  const handleSideBar = () => {
    setSidebar(!sidebar);

  };

  return (
    <>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" sx={{backgroundColor:"#00796b"}}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            fournisseur  Dashboard
            </Typography>
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleDeconnect}>Deconnection</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            marginTop: '64px', // Adjust this value if AppBar height changes
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', paddingTop: '0px' }}>
          <List sx={{ paddingTop: '0px', marginTop: '-13px' }}>
            {[
              { text: 'Home', path: '/fournisseur' },
              { text: 'Offre', path: '/fournisseur/offre' },
              { text: 'Produit', path: '/fournisseur/produit' },
              { text: 'Produit Cota', path: '/fournisseur/produitCota' },
            ].map((item, index) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton component={Link} to={item.path}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
