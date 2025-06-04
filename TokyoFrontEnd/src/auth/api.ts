import { AxiosError } from "axios"
import {LoginDto} from './typage/interfaces/login.dto';
import {ResponseLogin} from './typage/interfaces/resp.login';
import { API_BASE_URL, API_USER_URL } from "../utils/constantes";
import { UserDTO } from "./typage/interfaces/user.dto";
import { AuthFormInterface } from "./typage/interfaces/authFormI";
import { handleRequestErrors } from "../utils/errorHandler";
import { validateLogin, validateRegister } from "../utils/formValidations";
import { UserRoleEnum } from "./typage/interfaces/user-role.enum";
import { AuthSignInValidationResult, AuthSignUpValidationResult, EditResult } from "./typage/types/authForm";
import {axiosConfig} from '../network/axiosConfig'

export let errorString = "";

export const requestLoginUser = async (login: LoginDto) => {
    try{
        const response = await axiosConfig({
            method: 'post',
            url: API_BASE_URL + "/auth/login",
            data: {
                "email": login.email ,
                "password": login.password
            },

        });
        return response.data as ResponseLogin;    
    }
    catch(error){
        if (error instanceof AxiosError){
            return error;
        }
    }
}



export const requestRegisterUser = async(register: UserDTO) => {
    try{
        const response = await axiosConfig({
            method: 'post',
            url: API_BASE_URL + "/auth/register",
            data: {
                "email": register.email,
                "password": register.password,
                "firstname": register.firstname,
                "lastname": register.lastname,
                "role": register.role
            },
        });
        return response.data as UserDTO;    
    }
    catch(error){
        if (error instanceof AxiosError){
            return error;
        }
    }
}



//New Register
export const signUpAxios = async (formData: AuthFormInterface) : Promise<AuthSignUpValidationResult> => {
    try{
        validateRegister(formData);

        const res = await axiosConfig({
            method: 'post',
            url: API_BASE_URL + "/auth/register",
            data: {
                "email": formData.email,
                "password": formData.password,
                "firstname": formData.firstname,
                "lastname": formData.lastname,
                "role": UserRoleEnum.USER
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

        const res = await axiosConfig({
            method: 'post',
            url: API_BASE_URL + "/auth/login",
            data: {
                "email": formData.email,
                "password": formData.password,
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



export const editAxios = async (formData: AuthFormInterface): Promise<EditResult> => {
    try{
        validateRegister(formData);

        const res = await axiosConfig({
            method:'put',
            url: API_USER_URL + "users/edit",
            data:{
                "email": formData.email,
                "password": formData.password,
                "firstname": formData.firstname,
                "lastname": formData.lastname
            }
        })
        return { success: true, response: res.data};
    }
    catch(err: unknown){
        return {
            success: false,
            error: handleRequestErrors(err)
        }
    }
}
