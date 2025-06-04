import {
    Avatar,
    Box,
    Button,
    Container,
    Grid,
    TextField,
    Typography,
  } from "@mui/material";

import { LockOutlined } from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom";
import {checkFormAuth} from '../TokyoFrontEnd/src/utils/functions';
import { requestRegisterUser } from "../TokyoFrontEnd/src/auth/api";
import { UserRoleEnum } from "../TokyoFrontEnd/src/auth/typage/interfaces/user-role.enum";
import { AxiosError } from "axios";
import { enqueueSnackbar } from "notistack";
import { isUserDTO } from "../TokyoFrontEnd/src/auth/typage/interfaces/user.dto";

  
  const Register = () => {
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [emailToConnect, setEmailToConnect] = useState("");
    const [passwordToConnect, setPasswordToConnect] = useState("");
    const [messageAuth, setMessageAuth] = useState("");
    
  
    const handleRegister = async () => {
      if (checkFormAuth(emailToConnect, passwordToConnect, lastName, firstName)){
        const response = await requestRegisterUser({
          email: emailToConnect, 
          password: passwordToConnect, 
          firstname: firstName, 
          lastname: lastName, 
          role: UserRoleEnum.USER
        });
        
        if ((isUserDTO(response))){
          setMessageAuth(`${response.firstname} is now registered, please login`);
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

            <Typography variant="h5">Register</Typography>

            <Box sx={{ mt: 3 }}>

              <Grid container spacing={3}>
                <TextField
                    name="LastName"
                    required
                    fullWidth
                    id="lastName"
                    label="LastName"
                    autoFocus
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />

                <TextField
                  name="FirstName"
                  required
                  fullWidth
                  id="firstName"
                  label="FirstName"
                  autoFocus
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />

                <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={emailToConnect}
                    onChange={(e) => setEmailToConnect(e.target.value)}
                />


                <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={passwordToConnect}
                    onChange={(e) => setPasswordToConnect(e.target.value)}
                />

              </Grid>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleRegister}
              >
                Register
              </Button>

              <Typography variant="h10">{messageAuth}</Typography>

              <Grid container justifyContent="flex-end">
                <Link to="/login">Already have an account? Login</Link>
              </Grid>

            </Box>
          </Box>
        </Container>
      </>
    );
  };
  
  export default Register;


