
import {create} from 'zustand';
import { LoginFormInputs } from './LoginForm';
import { loginUser } from '../service/UserService';

interface AuthState {
    isAuthenticated: boolean;
    login: (data:LoginFormInputs) => Promise<void>;
    logout: () => void;
    token: string
}

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    token: '',
    login:async  (data:LoginFormInputs) => {

        return await loginUser(data).then((token)=> {
            set({ isAuthenticated: true, token:token.token })
        })
        
    },
    logout: () => set({ isAuthenticated: false }),
}));
