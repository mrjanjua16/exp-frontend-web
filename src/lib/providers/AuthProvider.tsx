'use client';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import setAuthToken from '@/lib/middleware/middleware'; 

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(setAuthToken(token)); // Action to set the token in Redux
    }
  }, [dispatch]);

  return <>{children}</>;
};

export default AuthProvider;
