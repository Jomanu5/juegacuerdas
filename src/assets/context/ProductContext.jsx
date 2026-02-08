import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { API_TIENDA } from "../../apiConfig"; 

export const ProductContext = createContext();

export const ProductProvider = ({children}) => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    // 🎻 Nuevos estados para la paginación
    const [pagination, setPagination] = useState({
        totalProducts: 0,
        totalPages: 0,
        currentPage: 1
    });

    const getProductos = async (page = 1) => {
        try {
            setIsLoading(true);
            const { data } = await axios.get(`${API_TIENDA}/productos?page=${page}`);
            
            setProducts(Array.isArray(data)? data: data.productos); 
            
            setPagination({
                totalProducts: data.totalProducts,
                totalPages: data.totalPages,
                currentPage: data.paginaActual
            });
        } catch (error) {
            console.error("Error al obtener productos:", error.response?.data || error.message); 
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getProductos();
    }, []);

    const getProductoById = (id) => {
        return products.find((product) => product.id === parseInt(id));
    }

    return (
        <ProductContext.Provider value={{ 
            products, 
            isLoading, 
            pagination, 
            getProductos, 
            getProductoById 
        }}>
            {children}
        </ProductContext.Provider>
    );
};