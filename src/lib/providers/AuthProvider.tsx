'use client';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import setAuthToken from '@/lib/middleware/middleware'; 
import { loadUserFromLocalStorage } from '../redux/authSlice';

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(loadUserFromLocalStorage());
    }
  }, [dispatch]);
  

  return <>{children}</>;
};

export default AuthProvider;
