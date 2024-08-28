import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { User } from '../model/User.model';
import axiosInstance from '../utils/axios';

interface LoginData {
    email: string;
    password: string;
    remember?: boolean;
}

interface LoginResponse {
    user: User;
    token: string;
}

const useLogin = () => {

    const mutation = useMutation<AxiosResponse<LoginResponse>, AxiosError, LoginData>({
        mutationFn: (loginData: LoginData) => axiosInstance.post('/auth/login', loginData),
        onError: (error: any) => {
            console.error(error);
        },
    });

    return mutation;
};

export default useLogin;
