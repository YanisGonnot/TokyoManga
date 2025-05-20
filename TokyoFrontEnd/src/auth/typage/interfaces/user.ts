import { UserRoleEnum } from "./user-role.enum";

export interface User{
    _id: string;
    email: string;
    firstname: string;
    lastname: string;
    password: string;
    recoveryToken: string | null;
    recoveryTokenExpires: string | null;
    role: UserRoleEnum | string;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}