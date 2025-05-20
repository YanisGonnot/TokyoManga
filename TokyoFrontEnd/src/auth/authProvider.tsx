import { createContext, useState } from "react";

import { User } from "./typage/interfaces/user";
import { UserRoleEnum } from "./typage/interfaces/user-role.enum";

export const AuthContext = createContext('');

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<User>({
    _id: "",
    email: "",
    firstname: "",
    lastname: "",        
    password: "",
    recoveryToken: "" ,
    recoveryTokenExpires: "",
    role: UserRoleEnum.USER,
    deletedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return (
    <>
      <AuthContext.Provider value={{ user, setUser }}>
        {children}
      </AuthContext.Provider>
    </>
  );
}


/*
import createStore from 'react-auth-kit/createStore';

const store = createStore({
    authName: '_auth',
    authType: 'cookie',
    cookieDomain: window.location.hostname,
    cookieSecure: false
  });
*/
