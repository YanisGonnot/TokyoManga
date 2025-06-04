import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
//import useSignIn from "react-auth-kit/hooks/useSignIn";

import { AuthContext } from "./authProvider";
import { AuthFormInterface } from "./typage/interfaces/authFormI";
import { editAxios, signInAxios, signUpAxios } from "./api";
import { User } from "./typage/interfaces/user";



export const useAuth = () => {
  const [isSuccess, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { user, setUser } = useContext(AuthContext);

  const navigate = useNavigate();

  //const signIn = useSignIn();

  // Register
  async function signUpUser(formData: AuthFormInterface) {
    setIsLoading(true);
    setError("");
    setSuccess(false);
    const resSignUp = await signUpAxios(formData);

    if (resSignUp.success) {
      setSuccess(true);
      setUser(resSignUp.user);
      setIsLoading(false);
      /*
      setCookie(
        resSignUp.user.recoveryToken!,
        {
          email: resSignUp.user.email,
          id: resSignUp.user._id
        }
      );
      */  
      return "success";
    } else {
      setError(resSignUp.error);
      setIsLoading(false);
      return resSignUp.error;
    }
  }

  // Login
  async function signInUser(formData: AuthFormInterface) {
    setIsLoading(true);
    setError("");
    setSuccess(false);
    const resSignIn = await signInAxios(formData);

    if (resSignIn.success) {
      setSuccess(true);
      setUser(resSignIn.response.user);
      localStorage.setItem("token", resSignIn.response.accessToken);
      /*setCookie(
        resSignIn.response.accessToken, 
        {
          email: resSignIn.response.user.email,
          id: resSignIn.response.user.id
        }
      ); 
      */ 
      setIsLoading(false);
      navigate("/profile");
      return "success";
    } else {
      setError(resSignIn.error);
      setIsLoading(false);
      return resSignIn.error;
    }
  }


  //Edit
  const editUser = async (formData: AuthFormInterface ) => {
    setIsLoading(true);
    setError("");
    setSuccess(false);
    const reEdit = await editAxios(formData);

    if (reEdit.success){
      setSuccess(true);
      setUser(reEdit.response.user);
      return "success";
    } else {
      setError(reEdit.error);
      setIsLoading(false);
      return reEdit.error;
    }

  }

  // GET USER
  function getUser(): User {
    return user;
  }

  // GET TOKEN
  function getToken() {
    return localStorage.getItem("token");
  }

  // LOGOUT
  function logout() {
    setUser(null);
    localStorage.removeItem("token");
    //setCookie("", {email: "", id: ""});
    navigate("/auth");
  }

  // AUTOGETME
  function getMe() {}

  return {
    isLoading,
    isSuccess,
    user,
    error,
    getUser,
    signInUser,
    signUpUser,
    editUser,
    getToken,
    logout,
    getMe,
  };
};



/*
const setCookie = (token: string, userState:{email: string, id: string}) => {
  const signIn = useSignIn();

  signIn({
    auth: {
      token: token
    },
    userState:{

    }
  })
}
*/
