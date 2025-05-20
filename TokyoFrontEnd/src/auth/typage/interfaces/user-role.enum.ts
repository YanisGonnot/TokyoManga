export enum UserRoleEnum {
  ADMIN = 'ADMIN',
  USER = 'USER',
}


export const isUserRoleEnum = (role: any): role is UserRoleEnum => {
  return Object.values(UserRoleEnum).includes(role);
}

