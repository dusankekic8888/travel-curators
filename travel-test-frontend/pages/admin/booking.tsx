import * as React from 'react'
import AddTour from '../../component/admin/tour/AddTour';
import Tour from '../../component/admin/tour/Tour';
import Link from "next/link";
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from "react"
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Header from '../../component/admin/header';
import Sidebar from '../../component/admin/sidebar';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { InferGetStaticPropsType } from 'next'
import Booking from '../../component/admin/booking/index';
import { bookedTour } from "../../services/book.service";
export default function BookingPage() {
  const [getBooking, setBooking] = React.useState("");
  const [openDetail, setOpenDetail] = React.useState(false);
  useEffect(() => {
    bookedTour().then(
      async (response) => {
        setBooking(response.bookings);
      }
    );
  }, []);
  return (
    <>
      <Header title="the-dynamic-title" description="the-dynamic-description" />
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ width: '100%', padding: '10px', alignContent: 'center' }}>
          <img style={{ width: "150px" }} src="https://cdn.discordapp.com/attachments/1150632768972259330/1185451750631677982/tc.svg?ex=658fa8f9&is=657d33f9&hm=1ab01cc814a0d0117cc4ed5c95f726dc16f086d07e81c5f87e6e3ad3340492d2&" />
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Sidebar />
          </Grid>
          <Grid item xs={9}>
            <Box sx={{ flexGrow: 1, border: "1px solid #ccc", padding: '10px', borderRadius: '15px' }}>
              <h1>Booking</h1>
                return <Booking bookingBox={getBooking} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>

  )
}