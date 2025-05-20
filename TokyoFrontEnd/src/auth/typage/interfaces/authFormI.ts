import { UserRoleEnum } from "./user-role.enum";

//TEST Interface
export interface AuthFormInterface{
    email : string,
    password: string,
    firstname?: string, 
    lastname?: string
}

export interface AuthResponseInterface {
  accessToken: string;
  user: {
    id: string;
    email: string;
    firstname: string;
    lastname: string;
    role: UserRoleEnum | string;
  };
}


export interface AuthFieldsValidationInterface {
  valid?: boolean;
  error?: string;
};


export interface ErrorApiResponseInterface {
  message: [string];
  error: string;
  statusCode: number;
};
