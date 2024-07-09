import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null);
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUserName = localStorage.getItem('userName');
        const storedUserEmail = localStorage.getItem('userEmail');
        if (storedToken) {
            setToken(storedToken);
            setUserName(storedUserName);
            setUserEmail(storedUserEmail);
            setIsAuthenticated(true);
        }
    }, []);

    const login = (token, name, email) => {
        setToken(token);
        setUserName(name);
        setUserEmail(email); 
        localStorage.setItem('token', token);
        localStorage.setItem('userName', name);
        localStorage.setItem('userEmail', email); 
        setIsAuthenticated(true);
    };

    const logout = () => {
        setToken(null);
        setUserName('');
        setUserEmail(''); 
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, token, userName, userEmail }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
