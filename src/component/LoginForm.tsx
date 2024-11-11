// src/pages/LoginForm.tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthStore } from './authStore';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import 'primeflex/primeflex.css';

export interface LoginFormInputs {
    username: string;
    password: string;
}

export const LoginForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
 
    const onSubmit = (data: LoginFormInputs) => {
        setLoading(true)
        login(data).then(()=>{
            setLoading(false)
            
        navigate('/');
        }).catch(e=> {
            console.error(e)
            setLoading(false)
        }); // Redireciona para a página inicial após login
    };

    return (
        <div className="flex justify-content-center align-items-center min-h-screen">
            <div className="shadow-3 p-4 mb-4 border-round-2xl col-12 md:col-6 lg:col-4">
                <h2 className="text-center mb-4">Login</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-column gap-3">
                    <div className="field">
                        <label htmlFor="username">Username</label>
                        <InputText
                            id="username"
                            {...register('username', { required: 'Username is required' })}
                            className={errors.username ? 'p-invalid' : ''}
                        />
                        {errors.username && <small className="p-error">{errors.username.message}</small>}
                    </div>

                    <div className="field">
                        <label htmlFor="password">Password</label>
                        <InputText
                            id="password"
                            type="password"
                            {...register('password', { required: 'Password is required' })}
                            className={errors.password ? 'p-invalid' : ''}
                        />
                        {errors.password && <small className="p-error">{errors.password.message}</small>}
                    </div>

                    <Button loading={loading} type="submit" label="Login" className="w-full" />
                </form>
            </div>
        </div>
    );
};
