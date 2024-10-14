import { useDispatch } from 'react-redux'; 
import { login, signup } from '../redux/authSlice';

export function useLogin() {
    const dispatch = useDispatch();
    return (credentials: any) => {
        return dispatch(login(credentials));
    };
}

export function useSignup() {
    const dispatch = useDispatch();
    return (userData: any) => {
        return dispatch(signup(userData));
    };
}
