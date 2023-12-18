import * as React from 'react'
import { useEffect, useState } from "react"
import TextField from '@mui/material/TextField';
import Textarea from '@mui/joy/Textarea';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateTour } from "../../../services/tour.service";
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

const EditTour = ({ getTour }: {
  getTour: any,
}) => {
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [openAlert, setOpenAlert] = React.useState(false);

  interface TourInput {
    id:number,
    title: string;
    description: string;
    thumbnail: string;
  }
  
  const defaultValues: TourInput = {
    id:getTour.id,
    title: getTour.title,
    description: getTour.description,
    thumbnail: getTour.thumbnail,
  };
  
  console.log(getTour);
  const {
    register,
    handleSubmit,
    formState: { errors }, // get errors of the form
  } = useForm<TourInput>({
    defaultValues,
    mode: "onTouched", // default is "onSubmit"
  });
  const onSubmitHandler = (values: TourInput) => {
    console.log(`Submitted`);
    console.table(values);

    updateTour(values.title, values.description, values.thumbnail, values.id).then(
      async (response) => {
        console.log(response);
        setTimeout(
          () => setOpenAlert(false),
          3000
        );
        window.location.reload();
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
      <Box
        component="form"
        sx={{
          '& > :not(style)': { mb: 2, width: '25ch' },
        }}
        onSubmit={handleSubmit(onSubmitHandler)}
        noValidate
        autoComplete="off"
      >
          <TextField
            id="title"
            {...register("title")}
            label="Title"
            style={{width:'500px'}}
            defaultValue={getTour.title}
          />
          <Textarea 
            id="description"
            {...register("description")}
            placeholder="Description..." 
            style={{width:'500px'}}
            minRows={5}
            defaultValue={getTour.description}
          />
          <TextField
            id="thumbnail"
            {...register("thumbnail")}
            label="Featured Image"
            style={{width:'500px'}}
            defaultValue={getTour.thumbnail}
          />
          <br/>
          <img src={getTour.thumbnail}/>
          <Box sx={{ display: 'flex', alignItems: 'center','& button': { mr: 1 } }}>
            <Button
              variant="contained"
              size="medium"
              type='submit'
            >
              Update Tour
            </Button>
          </Box>
      </Box>
    </>
  )
}

export default EditTour