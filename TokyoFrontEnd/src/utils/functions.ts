import { enqueueSnackbar } from "notistack";

export default function range(start: number, end: number, step: number = 1): number[] {
  const result: number[] = [];
  for (let i = start; step > 0 ? i < end : i > end; i += step) {      
    result.push(i);
  }
  return result;
}


export const checkFormAuth = (email: string, password: string, lastname?: string, firstname?: string) => {
  let res: boolean;
  let message = "";
  if (lastname?.trim() === '' || email.trim() === '' || password.trim() === '' || firstname?.trim() === ''){
    message = "Fill all the fields";
  }
  else if (!email.match("[0-9a-zA-Z-_]+[.0-9a-zA-Z-_]*@[a-zA-Z-_]+.(com|fr)")){
    message = "Email not valid, try again";
  }
  if (message === ""){
    res = true;
  } 
  else {
    enqueueSnackbar(message);
    res = false;
  }
  return res;
}  