import axios, { AxiosError } from "axios"
import {LoginDto} from './typage/interfaces/login.dto';
import {ResponseLogin} from './typage/interfaces/resp.login';
import { API_BASE_URL, API_USER_URL } from "../utils/constantes";
import { UserDTO } from "./typage/interfaces/user.dto";
import { AuthFormInterface } from "./typage/interfaces/authFormI";
import { handleRequestErrors } from "../utils/errorHandler";
import { validateLogin, validateRegister } from "../utils/formValidations";
import { UserRoleEnum } from "./typage/interfaces/user-role.enum";
import { AuthSignInValidationResult, AuthSignUpValidationResult } from "./typage/types/authForm";
import {useAuth } from './useAuth';

export let errorString = "";

export const requestLoginUser = async (login: LoginDto) => {
    try{
        const response = await axios({
            method: 'post',
            url: API_BASE_URL + "/login",
            data: {
                "email": login.email ,
                "password": login.password
            },
            headers: {
                "Content-Type": "application/json"
            }
        });
        console.log("Login:", response);
        return response.data as ResponseLogin;    
    }
    catch(error){
        console.log("Error: ", error);  
        if (error instanceof AxiosError){
            return error;
        }
    }
}



export const requestRegisterUser = async(register: UserDTO) => {
    try{
        const response = await axios({
            method: 'post',
            url: API_BASE_URL + "/register",
            data: {
                "email": register.email,
                "password": register.password,
                "firstname": register.firstname,
                "lastname": register.lastname,
                "role": register.role
            },
            headers: {
                "Content-Type": "application/json"
            }
        });
        console.log("Register: ", response);
        return response.data as UserDTO;    
    }
    catch(error){
        console.log("Error: ", error);  
        if (error instanceof AxiosError){
            return error;
        }
    }
}



//New Register
export const signUpAxios = async (formData: AuthFormInterface) : Promise<AuthSignUpValidationResult> => {
    try{
        validateRegister(formData);

        const res = await axios({
            method: 'post',
            url: API_BASE_URL + "/register",
            data: {
                "email": formData.email,
                "password": formData.password,
                "firstname": formData.firstname,
                "lastname": formData.lastname,
                "role": UserRoleEnum.USER
            },
            headers: {
                "Content-Type": "application/json"
            }
        });

        return { success: true, user: res.data.data };
    } 
    catch(err: unknown){
        return {
            success: false,
            error: handleRequestErrors(err)
        }
    }
}


//New Login
export const signInAxios = async (formData: AuthFormInterface) : Promise<AuthSignInValidationResult> => {
    try{
        validateLogin(formData);

        const res = await axios({
            method: 'post',
            url: API_BASE_URL + "/login",
            data: {
                "email": formData.email,
                "password": formData.password,
            },
            headers: {
                "Content-Type": "application/json"
            }
        });

        return { success: true, response: res.data};

    }
    catch(err: unknown){
        return {
            success: false,
            error: handleRequestErrors(err)
        }
    }

} 



export const editAxios = async (formData: AuthFormInterface) => {
    try{
        validateRegister(formData);
        const {getToken} = useAuth();

        const res = await axios({
            method:'put',
            url: API_USER_URL + "/edit",
            data:{
                "email": formData.email,
                "password": formData.password,
                "firstname": formData.firstname,
                "lastname": formData.lastname,
                "token": getToken()
            },
            headers: {
                "Content-Type": "application/json"
            }
        })
        console.log("Axios Edit:" + res);
        return { success: true, response: res.data};
    }
    catch(err: unknown){
        return {
            success: false,
            error: handleRequestErrors(err)
        }
    }
}


