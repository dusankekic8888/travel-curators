import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react"
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import TourIcon from '@mui/icons-material/Tour';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import GroupsIcon from '@mui/icons-material/Groups';
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import BookIcon from '@mui/icons-material/Book';
import Typography from '@mui/material/Typography';
import { Route } from '@mui/icons-material';
import { logout } from '../../services/auth.service';
export default function Sidebar() {
    const { push } = useRouter();
    const [user, setUser] = React.useState("");
    const handleLogout = () =>{
        logout();
        setUser('');
        push('/')
    }
    useEffect(() => {
        let value
        // Get the value from local storage if it exists
        value = localStorage.getItem("user") || ""
        setUser(value)
        let checkUser = null;
        if (value)
            checkUser = JSON.parse(value);
        if (checkUser?.user.role == 'admin' || checkUser?.user.role == 'editor') {
        } else {
            push('/')
        }
    }, [])
    let userData = null;
    if (user)
        userData = JSON.parse(user);
    console.log(userData);
    return (
        <>
            {userData ? (
                <>
                    <Box sx={{ width: '100%', margin: 0.5, border: '1px solid #ccc', borderRadius: '15px' }}>
                        <Box sx={{ display: "flex", width: '100%', padding: '10px', alignContent: 'center' }}>
                            <Avatar
                                alt="Remy Sharp"
                                src="/broken-image.jpg"
                            />
                            <Typography component="span" variant="h6" sx={{ ml: 1, mt: 0.5 }}>
                                {userData?.user.username}
                            </Typography>
                        </Box>
                        <Divider />
                        <nav aria-label="main mailbox folders">
                            <List>
                                {userData?.user.role == 'admin' || userData?.user.role == 'editor' ? (
                                    <ListItem disablePadding>
                                        <ListItemButton href="/admin/tour">
                                            <ListItemIcon>
                                                <TourIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Tour" />
                                        </ListItemButton>
                                    </ListItem>
                                ) : (
                                    <></>
                                )}
                                {userData?.user.role == 'admin' ? (
                                    <>
                                        <ListItem disablePadding>
                                            <ListItemButton href="/admin/booking">
                                                <ListItemIcon>
                                                    <BookIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Booking" />
                                            </ListItemButton>
                                        </ListItem>
{/* 
                                        <ListItem disablePadding>
                                            <ListItemButton href="/admin/customer">
                                                <ListItemIcon>
                                                    <SupervisorAccountIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Customer" />
                                            </ListItemButton>
                                        </ListItem> */}

                                        {/* <ListItem disablePadding>
                                            <ListItemButton href="/admin/user">
                                                <ListItemIcon>
                                                    <GroupsIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="User" />
                                            </ListItemButton>
                                        </ListItem> */}
                                    </>
                                ) : (
                                    <></>
                                )}

                            </List>
                        </nav>
                        <Divider />
                        <nav aria-label="secondary mailbox folders">
                            <List>
                                <ListItem disablePadding onClick={handleLogout}>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <LogoutIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Logout" />
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </nav>
                    </Box>
                </>
            ) : (
                <></>
            )}
        </>
    );
}