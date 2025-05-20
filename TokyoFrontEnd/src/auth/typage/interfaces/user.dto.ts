import { isUserRoleEnum, UserRoleEnum } from './user-role.enum.ts'; 

export interface UserDTO {
  id?: string,
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  role: UserRoleEnum;
}


export const isUserDTO = (obj: any): obj is UserDTO => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.email === 'string' &&
    typeof obj.password === 'string' &&
    typeof obj.firstname === 'string' &&
    typeof obj.lastname === 'string' &&
    isUserRoleEnum(obj.role)
  );
}