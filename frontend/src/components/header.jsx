import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TreeIcon from '@mui/icons-material/Forest'; // Example icon for the logo

export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
            {/* Logo/Icon */}
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 1 }} // Reduce margin between logo and text
            >
              <TreeIcon fontSize={isMobile ? 'small' : 'medium'} /> {/* Responsive icon size */}
            </IconButton>
            {/* Company Name */}
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                fontSize: isMobile ? '1rem' : '1.5rem', // Responsive font size
                overflow: 'hidden', 
                textOverflow: 'ellipsis', 
                whiteSpace: 'nowrap'
              }}
            >
              Luke Tree Service
            </Typography>
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
            >
              Write review
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
