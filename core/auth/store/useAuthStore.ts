import { create } from 'zustand';
import { User } from '@/core/auth/interface/user';
import { authCheckStatus, authLogin, authRegister } from '@/core/auth/actions/auth-actions';
import { SecureStorageAdapter } from '@/middelware/secure-storage.adapter';

export type AuthStatus = 'authenticated' | 'unauthenticated' | 'checking';

export interface AuthState {
  //property
  status: AuthStatus;
  token?: string;
  user?: User;

  //methods
  login: (email: string, password: string) => Promise<boolean>;
  checkStatus: () => Promise<void>;
  logout: () => Promise<void>;
  changeStatus: (token?: string, user?: User) => Promise<boolean>;
  register: (email:string, password : string , fullname : string ) => Promise<boolean>

}

export const useAuthStore = create<AuthState>()((set, get) => ({

  // Properties
  status: 'checking',
  token: undefined,
  user: undefined,

  // methods
  changeStatus: async (token?: string, user?: User) => {
    // NO hay token o usuario
    if (!token || !user) {
      set({
         status: 'unauthenticated',
         token: undefined,
         user: undefined
         });

      await SecureStorageAdapter.deleteItem('token');
      return false;
      
    }

    // SI hay token y usuario
    set({
      status: 'authenticated',
      token: token,
      user: user,
    });
    await SecureStorageAdapter.setItem('token', token);

    return true;
  },

  login: async (email: string, password: string) => {
    const resp = await authLogin(email, password);
    
    return get().changeStatus(resp?.token, resp?.user);
  },

  checkStatus: async () => {
    const resp = await authCheckStatus();
    get().changeStatus(resp?.token, resp?.user);
  },

  logout: async () => {
    SecureStorageAdapter.deleteItem('token');

    set({ status: 'unauthenticated', token: undefined, user: undefined });
  },
  
  register: async (email: string, password: string,fullname: string ) => {
    const resp = await authRegister(email, password, fullname);

    return resp?.ok || false;
  },



}));
