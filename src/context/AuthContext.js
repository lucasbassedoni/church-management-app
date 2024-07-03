import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUserName = localStorage.getItem('userName');
        if (storedToken) {
            setToken(storedToken);
            setUserName(storedUserName);
            setIsAuthenticated(true);
        }
    }, []);

    const login = (token, name) => {
        setToken(token);
        setUserName(name);
        localStorage.setItem('token', token);
        localStorage.setItem('userName', name);
        setIsAuthenticated(true);
    };

    const logout = () => {
        setToken(null);
        setUserName('');
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, token, userName }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
