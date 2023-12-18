import * as React from 'react';
import { useEffect, useState } from "react"
import ListItemIcon from '@mui/material/ListItemIcon';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Link from '@mui/material/Link';
import Logout from '@mui/icons-material/Logout';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
interface Props {
  window?: () => Window;
}
const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];

export default function Nav(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [user, setUser] = React.useState("");
  useEffect(() => {
    let value
    // Get the value from local storage if it exists
    value = localStorage.getItem("user") || ""
    setUser(value)
  }, [])
  let userData: any = null;
  if(user)
  userData = JSON.parse(user);
  console.log(userData);
  
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
      <img style={{width:"150px"}} src="https://cdn.discordapp.com/attachments/1150632768972259330/1185451750631677982/tc.svg?ex=658fa8f9&is=657d33f9&hm=1ab01cc814a0d0117cc4ed5c95f726dc16f086d07e81c5f87e6e3ad3340492d2&"/>
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  
  return (
    <>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" className='menuNav'>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' }, color: '#000' }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            <img style={{width:"150px"}} src="https://cdn.discordapp.com/attachments/1150632768972259330/1185451750631677982/tc.svg?ex=658fa8f9&is=657d33f9&hm=1ab01cc814a0d0117cc4ed5c95f726dc16f086d07e81c5f87e6e3ad3340492d2&"/>
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: '#000' }}>
                {item}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
              {user ? (
                <>
                  <Button
                    color="inherit"
                    href={"/admin/tour"}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    sx={{ color: '#000000'}}
                  ><Avatar sx={{ mr: 2 }} /> {userData?.user?.username}</Button>
                </>
              ) : (
                <>
                  <Link color="inherit" underline="none" href="/signin">
                    <ListItemIcon>
                      <Logout fontSize="small" style={{marginRight:5}} /> Sign In
                    </ListItemIcon>
                  </Link>
                </>
              )}

              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {/* <MenuItem key={0} href="/admin/tour">
                    <Typography textAlign="center">Tour</Typography>
                </MenuItem> */}
              </Menu>
            </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
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
    </>
  );
}