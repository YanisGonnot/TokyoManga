import {isUserDTO, UserDTO} from './user.dto.ts';

export interface ResponseLogin {
  accessToken: string;
  user: UserDTO;
}


export function isResponseLogin(obj: any): obj is ResponseLogin {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.accessToken === 'string' &&
    isUserDTO(obj.user)
  );
}