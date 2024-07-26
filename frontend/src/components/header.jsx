import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import TreeIcon from '@mui/icons-material/Forest'; // Example icon for the logo

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* Logo/Icon */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <TreeIcon /> {/* Use an appropriate icon for the logo */}
          </IconButton>
          {/* Company Name */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Luke Tree Service
          </Typography>
          {/* Login Button */}
          <Button color="inherit">Login</Button>
          {/* Write Review Button */}
          <Button variant="contained" color="secondary" sx={{ ml: 2 }}>
            Write review
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
