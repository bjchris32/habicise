import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { checkAuth } from '../services/authentications-services';
import { UserBasicInfo } from '../services/authentications-services'

// Define the shape of the context value
interface AuthContextType {
  isLoggedIn: boolean;
  userBasicInfo: UserBasicInfo | null;
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
  const [userBasicInfo, setUserBasicInfo] = useState<UserBasicInfo | null>(null);

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
          if(response.user === undefined) {
            setUserBasicInfo(null);
          } else {
            setUserBasicInfo(response.user);
          }
        } else {
          setIsLoggedIn(false); // User is not authenticated
          setUserBasicInfo(null);
        }
      } catch (error) {
        setIsLoggedIn(false); // Handle any errors or 401 Unauthorized status
        setUserBasicInfo(null);
      }
    }

    handleAuth();
  },[])

  return (
    <AuthContext.Provider value={{ isLoggedIn, userBasicInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
