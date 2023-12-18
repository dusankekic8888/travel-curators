import { useRouter } from "next/router";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {login} from '../services/auth.service';
interface UserInput {
  email: string;
  password: string;
}

const defaultValues: UserInput = {
  email: "",
  password: "",
};

const validationSchema = yup.object({
  email: yup
    .string()
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});


const SignInPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const callbackUrl = decodeURI((router.query?.callbackUrl as string) ?? "/");

  const {
    register,
    handleSubmit,
    formState: { errors }, // get errors of the form
  } = useForm<UserInput>({
    defaultValues,
    resolver: yupResolver(validationSchema),
    mode: "onTouched", // default is "onSubmit"
  });

  const onSubmitHandler = (values: UserInput) => {
    console.log(`Submitted`);
    console.table(values);

    login(values.email, values.password).then(
      async (response) => {
        console.log(response);
        window.location.href="/admin/tour";
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
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmitHandler)} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              autoFocus
              {...register("email")}
            />
            {errors.email && (
              <p className="error-message">{errors.email.message}</p>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              {...register("password")}
              autoComplete="current-password"
            />
            {errors.password && (
              <p className="error-message">{errors.password.message}</p>
            )}
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </>

  );
};

export default SignInPage;
