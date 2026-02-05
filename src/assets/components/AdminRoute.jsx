import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { TokenContext } from '../context/TokenContext'; // Verifica que la ruta sea correcta
import { jwtDecode } from "jwt-decode"; 

const AdminRoute = () => {
    const { token, isLoading } = useContext(TokenContext);

    // 1. Esperar a que el contexto cargue el token del localStorage
    if (isLoading) return null; 

    // 2. Si no hay token, al login
    if (!token) {
        return <Navigate to="/tienda/login" replace />;
    }

    try {
        const user = jwtDecode(token);
        if (user.rol === 'ADMIN') {
            return <Outlet />;
        }
    } catch (error) {
        console.error("Token corrupto");
        return <Navigate to="/tienda/login" replace />;
    }

    // 3. Si no es admin, a la tienda
    return <Navigate to="/tienda" replace />;
};

export default AdminRoute;