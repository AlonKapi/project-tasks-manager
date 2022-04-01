import React, { useState, useContext } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { callLogoutService } from '../utils/authServices';
import AppContext from '../context/AppContext';

export default function Header() {
    const { appState, logout } = useContext(AppContext);
    const [anchorEl, setAnchorEl] = useState(null);
  
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleSignOut = async () => {
        await callLogoutService();
        logout();
    };

	return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Project Tasks Manager
                </Typography>
                {appState.isLoggedIn && (
                <div className="user-header-details">
                    <Typography variant="h8" component="div" sx={{ flexGrow: 1 }}>
                        {appState.email}
                    </Typography>
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
                        <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
                    </Menu>
                </div>)}
            </Toolbar>
        </AppBar>
    );
}
