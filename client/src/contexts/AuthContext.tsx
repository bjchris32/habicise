import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { checkAuth } from '../services/authentications-services';

// Define the shape of the context value
interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

// Create the context with a default value
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the props for the AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

// Create the AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Function to log in the user
  const login = () => setIsLoggedIn(true);

  // Function to log out the user
  const logout = () => setIsLoggedIn(false);

  useEffect(() => {
    const handleAuth = async () => {
      try {
        const response = await checkAuth();
        if (response.status === 200) {
          setIsLoggedIn(true); // User is authenticated
        } else {
          setIsLoggedIn(false); // User is not authenticated
        }
      } catch (error) {
        setIsLoggedIn(false); // Handle any errors or 401 Unauthorized status
      }
    }

    handleAuth();
  },[])

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
