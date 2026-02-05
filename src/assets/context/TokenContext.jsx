import { createContext, useState, useEffect } from "react";

export const TokenContext = createContext();

export const TokenProvider = ({ children }) => { 
    const [token, setToken] = useState(null); 
    const [isLoading, setIsLoading] = useState(true); 

    useEffect(() => {
        // Función interna para revisar el estado inicial
        const checkToken = () => {
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                setToken(storedToken); 
            } else {
                setToken(false); 
            }
            setIsLoading(false);
        };

        checkToken();

        // Sincronización: Si el usuario cierra sesión en otra pestaña de JuegaCuerdas
        const syncLogout = (e) => {
            if (e.key === 'token' && !e.newValue) {
                setToken(false);
            }
        };
        window.addEventListener('storage', syncLogout);
        
        return () => window.removeEventListener('storage', syncLogout);
    }, []);

    // Función para iniciar sesión
    const login = (newToken) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
    };

    // Función para cerrar sesión
    const logout = () => {
        localStorage.removeItem('token');
        setToken(false);
    };

    // Objeto con todo lo que compartiremos
    const value = {
        token,
        setToken,
        login,
        logout,
        isAuthenticated: !!token, // Es true si el token existe y es un string
        isLoading
    };

    return (
        <TokenContext.Provider value={value}>
            {children}
        </TokenContext.Provider>
    );
};

export default TokenProvider;