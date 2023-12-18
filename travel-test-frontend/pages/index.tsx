import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react"
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Header from "../component/header";
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Textarea from '@mui/joy/Textarea';
import Detail from "../component/admin/tour/Detail";
import { booking } from "../services/book.service";
import { tours } from "../services/tour.service";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { login } from '../services/auth.service';
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
  width: '310px',
  backgroundColor: '#ffffff !important'
};

const styleDetail = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  width: '80%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface UserInput {
  name: string;
  email: string;
  phone: string;
  address: string;
  tourId: number;
}

const defaultValues: UserInput = {
  name: "",
  email: "",
  phone: "",
  address: "",
  tourId: 0
};

const validationSchema = yup.object({
  name: yup
    .string()
    .required("Name is required"),
  email: yup.string().required("Email is required"),
  phone: yup.string().required("Phone is required"),
  address: yup.string().required("Address is required"),
  tourId: yup.number().required("Tour is required"),
});

const HomePage: NextPage = () => {
  const [open, setOpen] = React.useState(false);
  const [openDetail, setOpenDetail] = React.useState(false);
  const [user, setUser] = React.useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [openAlert, setOpenAlert] = React.useState(false);
  const [getTour, setTour] = React.useState("");
  const [detailTour, setDetailTour] = React.useState<any>("");
  useEffect(() => {
    let value
    // Get the value from local storage if it exists
    value = localStorage.getItem("user") || ""
    setUser(value)
  }, [])
  console.log(user);
  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>, value: any) => {
    console.log(e);
    console.log(value)
    setOpen(true);
  };
  const handleOpenDetail = (e: React.MouseEvent<HTMLButtonElement>, value: any) => {
    console.log(e);
    console.log(value)
    setOpenDetail(true);
  };
  const handleClose = () => {
    setOpen(false)
  };
  const handleCloseDetail = () => {
    setOpenDetail(false)
  };

  const {
    register,
    handleSubmit,
    formState: { errors }, // get errors of the form
  } = useForm<UserInput>({
    defaultValues,
    resolver: yupResolver(validationSchema),
    mode: "onTouched", // default is "onSubmit"
  });
  const tourId: number = detailTour.id
  console.log(tourId);
  const onSubmitHandler = (values: UserInput) => {
    console.log(`Submitted`);
    console.table(values);

    booking(values.name, values.email, values.phone, values.address, tourId).then(
      async (response) => {
        console.log(response);
        setOpen(false);
        setOpenAlert(true);
        setTimeout(
          () => setOpenAlert(false),
          3000
        );
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setMessage(resMessage);
      }
    );

  };
  useEffect(() => {
    tours().then(
      async (response) => {
        setTour(response.tours);
      }
    );
  }, []);
  const tourList: any = Array.from(getTour);
  console.log(detailTour);
  return (
    <>
      <Header title="Travel" description="Founded in 2016, Travel Curators is a fast-growing travel tech company that is leading the digitalization of the travel agency industry in a post-Covid 19 landscape. Travel Curators’ unique business model comprises a B-to-B division providing our proprietary ToraQ SaaS services (CMS for travel agency / company and mobile app for consumer) to Asia’s leading travel agencies (Singapore’s one of the biggest travel agency Dynasty Travel, and other boutique agency and foreign agencies are existing users), and a B-to-C unit supporting luxury clients with their travel needs around the world. Travel Curators is also a strong advocate of sustainable travel, and in everything we do, we strive to create a positive impact on the people, economy and environment of the different places we are privileged to visit. Read more about us here" />
      <>
        <Container maxWidth="lg" className="mt100">
          <Box sx={{ width: '200px', position: 'fixed', zIndex: 100, top: 100, right: 0 }}>
            <Collapse in={openAlert}>
              <Alert
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpenAlert(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
              >
                Close me!
              </Alert>
            </Collapse>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <h2 className="text-4xl">Featured Australia Tours</h2>
            <Grid container spacing={1}>
              {tourList.map((item: any, i: React.Key | null | undefined) => {
                return (
                  <Grid item xs={12} md={4} key={item.id}>
                    <Card sx={{ display: 'flex' }}>
                      <Grid container spacing={0}>
                        <Grid item xs={12} md={12}>
                          <CardMedia
                            component="img"
                            sx={{ width: "100%", height: "100%" }}
                            image={item.thumbnail}
                          />
                        </Grid>
                        <Grid item xs={12} md={12}>
                          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                              <Typography component="div" variant="h6" className="titleTour">
                                {item.title}
                              </Typography>
                              {/* <br />
                              <Typography variant="subtitle2" component="div">
                                Price: <Typography className="priceTour" component="span">$8000</Typography>
                              </Typography> */}
                            </CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1, '& button': { m: 1 } }}>
                              <Button variant="contained" size="medium" onClick={(e) => handleOpen(e, setDetailTour(item))}>
                                Book Now
                              </Button>
                              <Button variant="outlined" size="medium" onClick={(e) => handleOpenDetail(e, setDetailTour(item))}>
                                View detail
                              </Button>
                            </Box>
                          </Box>
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                )
              })}

            </Grid>
          </Box>
        </Container>
      </>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Featured Australia Tours
          </Typography>
          <br />
          <Box
            component="form"
            sx={{
              '& > :not(style)': { mb: 2 },
            }}
            onSubmit={handleSubmit(onSubmitHandler)}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="name"
              label="Name"
              style={{ width: '100%' }}
              {...register("name")}
            />
            <br />
            <TextField
              id="email"
              {...register("email")}
              label="Email"
              style={{ width: '100%' }}
            />
            <br />
            <TextField
              id="phone"
              {...register("phone")}
              label="Phone"
              style={{ width: '100%' }}
            />
            <br />
            <TextField
              id="address"
              {...register("address")}
              label="Address"
              style={{ width: '100%' }}
            />

            <Box sx={{ display: 'flex', alignItems: 'center', '& button': { mr: 1 } }}>
              <Button
                variant="contained"
                size="medium"
                type='submit'
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Box>

      </Modal>

      {/* Detail */}

      <Modal
        open={openDetail}
        onClose={handleCloseDetail}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container>
          <Box sx={styleDetail}>
            <Detail detailTour = {detailTour}/>
          </Box>
        </Container>
      </Modal>

      {/* )} */}
    </>
  );
};

export default HomePage;
