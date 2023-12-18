import * as React from 'react'
import { useEffect, useState } from "react"
import AddTour from '../../component/admin/tour/AddTour';
import Tour from '../../component/admin/tour/Tour';
import Link from "next/link";
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Header from '../../component/admin/header';
import Sidebar from '../../component/admin/sidebar';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { InferGetStaticPropsType } from 'next'
import { tours } from "../../services/tour.service";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { login } from '../../services/auth.service';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
export default function TourPage() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [getTour, setTour] = React.useState("");

  useEffect(() => {
    tours().then(
      async (response) => {
        setTour(response.tours);
      }
    );
  }, []);
  const getTourList: any = Array.from(getTour);
  return (
    <>
      {getTourList ? (
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
                <Box sx={{ flexGrow: 1 }}>
                  <h1>Tours</h1>
                  <Box sx={{ display: 'flex', alignItems: 'center', pb: 1, '& button': { mr: 1 } }}>
                    <Button variant="contained" size="medium" onClick={handleOpen}>
                      Create New Tour
                    </Button>
                  </Box>
                  <Divider />
                  {getTourList.map((item: any, i: React.Key | null | undefined) => {
                    return <Tour tourBox={item} />
                  })}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </>
      ) : (
        <></>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create new tour
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <AddTour />
          </Typography>
        </Box>
      </Modal>
    </>

  )
}

// export async function getStaticProps() {
//   const res = await fetch(API_URL)
//   const tours: IPost[] = await res.json()

//   return {
//     props: {
//       tourss,
//     },
//   }
// }