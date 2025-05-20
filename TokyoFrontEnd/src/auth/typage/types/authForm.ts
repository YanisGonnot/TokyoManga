import { AuthResponseInterface } from "../interfaces/authFormI";
import { User } from "../interfaces/user";


export type AuthFormType = {
    email: string,
    password: string,
    firstname?: string, 
    lastname?: string
}


export type AuthSignUpValidationResult =
  | { success: true; user: User }
  | { success: false; error: string };

  
export type AuthSignInValidationResult =
  | { success: true; response: AuthResponseInterface }
  | { success: false; error: string };


export type AuthFieldsValidation = {
  valid?: boolean;
  error?: string;
};


export type ErrorApiResponse = {
  message: [string];
  error: string;
  statusCode: number;
};
