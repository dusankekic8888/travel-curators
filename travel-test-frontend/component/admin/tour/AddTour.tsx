import * as React from 'react'
import { useEffect, useState } from "react"
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Textarea from '@mui/joy/Textarea';
import { tours } from "../../../services/tour.service";
import { createTour } from "../../../services/tour.service";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

interface TourInput {
  title: string;
  description: string;
  thumbnail: string;
}

const defaultValues: TourInput = {
  title: "",
  description: "",
  thumbnail: "",
};

const validationSchema = yup.object({
  title: yup
    .string()
    .required("Title is required"),
  description: yup.string().required("Description is required"),
  thumbnail: yup.string().required("Thumbnail is required"),
});

const AddTour = () => {
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [openAlert, setOpenAlert] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }, // get errors of the form
  } = useForm<TourInput>({
    defaultValues,
    resolver: yupResolver(validationSchema),
    mode: "onTouched", // default is "onSubmit"
  });
  const onSubmitHandler = (values: TourInput) => {
    console.log(`Submitted`);
    console.table(values);

    createTour(values.title, values.description, values.thumbnail).then(
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
          style={{ width: '500px' }}
        />
        <Textarea
          id="description"
          {...register("description")}
          placeholder="Description..."
          style={{ width: '500px' }}
          minRows={5}
        />
        <TextField
          id="thumbnail"
          {...register("thumbnail")}
          label="Featured Image"
          style={{ width: '500px' }}
        />
        <Box sx={{ display: 'flex', alignItems: 'center', '& button': { mr: 1 } }}>
          <Button
            variant="contained"
            size="medium"
            type='submit'
          >
            Add Tour
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default AddTour