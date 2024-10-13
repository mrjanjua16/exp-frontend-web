
import { Middleware } from '@reduxjs/toolkit';

const tokenMiddleware: Middleware = (store) => (next) => (action) => {
  // Check if the action is login or signup and has payload with a token
  if (action.type === 'auth/login/fulfilled' || action.type === 'auth/signup/fulfilled') {
    const { token } = action.payload;
    localStorage.setItem('token', token); // Save token to local storage
  }
  
  // Proceed with the next middleware or reducer
  return next(action);
};

export default tokenMiddleware;
