import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleReviewClick = () => {
    navigate('/review');
  };

  const handleLogoClick = () =>{
    navigate('/')
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            {/* Logo/Image */}
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 1 }}
              onClick={handleLogoClick}
            >
              <img 
                src="/file.png" 
                alt="Logo" 
                style={{ 
                  width: isMobile ? '150px' : '200px', 
                  height: isMobile ? '50px' : '50px' 
                }} 
              />
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Login Button */}
            <Button 
              color="inherit" 
              sx={{ 
                fontSize: isMobile ? '0.75rem' : '1rem', // Responsive font size
                p: isMobile ? 0.5 : 1, // Responsive padding
                whiteSpace: 'nowrap' // Prevent text breaking
              }}
              onClick={handleLoginClick}
            >
              Login
            </Button>
            {/* Write Review Button */}
            <Button 
              variant="contained" 
              color="secondary" 
              sx={{ 
                ml: 2, 
                fontSize: isMobile ? '0.75rem' : '1rem', // Responsive font size
                p: isMobile ? 0.5 : 1, // Responsive padding
                whiteSpace: 'nowrap' // Prevent text breaking
              }}
              onClick={handleReviewClick}
            >
              Write review
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
