'use client'; // Make this a client component
import { Provider } from 'react-redux';
import {store} from '@/lib/store'; // Adjust the import path according to your structure
import AuthProvider from '@/lib/providers/AuthProvider';

const CombinedProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Provider store={store}>
      <AuthProvider>{children}</AuthProvider>
    </Provider>
  );
};

export default CombinedProvider;
