import * as React from 'react'
import { styled } from '@mui/material/styles';
import { useEffect, useState } from "react"
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Textarea from '@mui/joy/Textarea';
import EditTour from './EditTour';
import Container from '@mui/material/Container';
import { booking } from "../../../services/book.service";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { login } from '../../../services/auth.service';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    p: 4,
    backgroundColor: "#ffffff !important"
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
    tourId: yup.string().required("Tour is required"),
});
const Detail = ({ detailTour }: {
    detailTour: any,
  }) => {
    console.log(detailTour);
    const [openAlert, setOpenAlert] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
    const handleOpen = (e: React.MouseEvent<HTMLButtonElement>, value: any) => {
        setOpen(true);
    };
    const [user, setUser] = React.useState("");
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [error, setError] = useState<string>("");

    const handleForm = () => {
        alert('handleForm');
    }
    const bookTour = () => {
        alert('bookTour');
    }

    const {
        register,
        handleSubmit,
        formState: { errors }, // get errors of the form
    } = useForm<UserInput>({
        defaultValues,
        mode: "onTouched", // default is "onSubmit"
    });
    const tourId: any = detailTour.id;
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
    return (
        <>
            <Paper
                sx={{
                    margin: 'auto',
                    boxShadow: 'none'
                }}
            >
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
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <ButtonBase sx={{ width: "100%", height: "100%" }}>
                            <Img alt="complex" src={detailTour.thumbnail} />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2} mt={5}>
                            <Grid>
                            <h2 style={{marginLeft: 20}}>
                                {detailTour.title}
                            </h2>
                            <p style={{marginLeft: 20}}>
                                {detailTour.description}
                            </p>
                            </Grid>
                        </Grid>
                        {/* <Grid item>
                            <Typography variant="subtitle1" component="div">
                                $19.00
                            </Typography>
                        </Grid> */}
                    </Grid>
                    <br />
                </Grid>
                <br />
                <Button variant="contained" size="medium" onClick={(e) => handleOpen(e, detailTour)}>
                    Book Now
                </Button>
            </Paper>

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
                            {...register("name")}
                            label="Name"
                            style={{ width: '100%' }}
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
        </>

    )
}

export default Detail