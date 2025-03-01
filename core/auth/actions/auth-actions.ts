import { productsApi } from '../api/productsApi';
import { User } from '../interface/user';

export interface AuthResponse {
  id: string;
  email: string;
  fullName: string;
  isActive: boolean;
  roles: string[];
  token: string;
  ok : boolean;
}

const returnUserToken = ( data: AuthResponse  ): { user: User; token: string; ok: boolean } => {
  const { id, email, fullName, isActive, roles, token , ok } = data;

  const user: User = { id, email, fullName, isActive, roles,  };

  return {
    user,
    token,
    ok,
  };
};

export const authLogin = async (email: string, pas: string) => {
  email = email.toLowerCase();

  try {
    const { data } = await productsApi.post<AuthResponse>('/login', { email, pas, });

    return returnUserToken(data);
  } catch (error) {
    console.log(error);
    // throw new Error('User and/or password not valid');
    return null;
  }
};

export const authRegister = async (email: string, pas: string , fullname : string ) => {
  email = email.toLowerCase();

  try {
    const { data } = await productsApi.post<AuthResponse>('/register', { email,pas, fullname });
    console.log(data)
    return returnUserToken(data);
    
  } catch (error) {
    console.log(error);
    // throw new Error('User and/or password not valid');
    return null;
  }
};



export const authCheckStatus = async () => {
  try {
    const { data } = await productsApi.get<AuthResponse>('/auth/check-status');

    return returnUserToken(data);
  } catch (error) {
    return null;
  }
};

// TODO: Tarea: Hacer el register
