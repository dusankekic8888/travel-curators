import Link from "next/link";
import React from "react";
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { signOut } from "next-auth/react";
import Container from '@mui/material/Container';
import Header from '../../component/admin/header';
import Sidebar from '../../component/admin/sidebar';

const AdminPage = () => {
  return (
    <>
    <Header title="the-dynamic-title" description="the-dynamic-description" />
      <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ width: '100%', padding: '10px', alignContent:'center' }}>
                <img style={{ width: "150px" }} src="https://cdn.discordapp.com/attachments/1150632768972259330/1185451750631677982/tc.svg?ex=658fa8f9&is=657d33f9&hm=1ab01cc814a0d0117cc4ed5c95f726dc16f086d07e81c5f87e6e3ad3340492d2&" />
            </Box>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Sidebar/>
            </Grid>
            <Grid item xs={9}>
            </Grid>
          </Grid>
        </Box>
    </>
  );
};

export default AdminPage;
