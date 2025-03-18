// CustomAppBar.js
import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

const CustomAppBar = ({ handleDrawerToggle, navItems }) => {
  const navigate = useNavigate();

  return (
    <AppBar component="nav" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' }, color: '#000' }} // Dark color for the menu icon
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#000' }}> {/* Dark color for the title */}
          ELSAIDALIYA
        </Typography>
        <Box sx={{ display: { xs: 'none', sm: 'block' }, mr: 6 }}>
          {navItems.map((item) => (
            <Button
              key={item.text}
              sx={{
                color: '#000', // Dark color for the navigation items
                textAlign: 'center',
                padding: '14px 20px',
                fontSize: '17px',
                fontWeight: 'bold',
                textShadow: '1px 1px 2px rgba(255, 255, 255, 0.5)', // Adjust text shadow for better visibility
              }}
              onClick={() => navigate(item.link)}
            >
              {item.text}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;