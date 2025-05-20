import { LockOutlined } from "@mui/icons-material";
import {Container, Box, Avatar, Typography, TextField, Button, Grid} from "@mui/material";
import { Link } from "react-router-dom";
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { AxiosError } from "axios";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";

import { checkFormAuth } from "../TokyoFrontEnd/src/utils/functions";
import { requestLoginUser } from "../TokyoFrontEnd/src/auth/api";
import { isResponseLogin } from "../TokyoFrontEnd/src/auth/typage/interfaces/resp.login";
import { AuthFormInterface } from "../TokyoFrontEnd/src/auth/typage/interfaces/authFormI";



const Login = () => {
  const signIn = useSignIn();
  const [emailToConnect, setEmailToConnect] = useState("");
  const [passwordToConnect, setPasswordToConnect] = useState("");
  const [messageAuth, setMessageAuth] = useState("");

  const [formData, setFormData] = useState<AuthFormInterface>({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
  });


  const handleLogin = async () => {
    if (checkFormAuth(emailToConnect, passwordToConnect)) {
      const response = await requestLoginUser({
        email: emailToConnect, 
        password: passwordToConnect});
      if (isResponseLogin(response)){
        signIn({
          auth: {
            token: response.accessToken
          },
          userState: {
            email: emailToConnect
          }
        });
        setMessageAuth(`Welcome ${response.user.firstname}`);
      } 
      else if (response instanceof AxiosError){
        setMessageAuth(response.response?.data.message[0])
        
      }
      enqueueSnackbar(messageAuth);   
    }
  };


  return (
    <>
      <Container maxWidth="xs">
        <Box
          sx={{
            mt: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
            <LockOutlined />
          </Avatar>

          <Typography variant="h5">Login</Typography>

          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoFocus
              value={emailToConnect}
              onChange={(e) => setEmailToConnect(e.target.value)}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={passwordToConnect}
              onChange={(e) => {
                setPasswordToConnect(e.target.value);
              }}
          
            />

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogin}
            >
              Login
            </Button>

            <Typography variant="h10">{messageAuth}</Typography>

            
            <Grid container justifyContent={"flex-end"}>
                <Link to="/register">Don't have an account? Register</Link>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login