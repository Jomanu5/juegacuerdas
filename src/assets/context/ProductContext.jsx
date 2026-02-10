import axios from "axios";
import { createContext,  useState } from "react";
import { API_TIENDA } from "../../apiConfig"; 

export const ProductContext = createContext();

export const ProductProvider = ({children}) => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filtros, setFiltros] = useState({
        categoria:"",
        precioMax:"",
        ordenPrecio:"",
    })
    
    // 🎻 Nuevos estados para la paginación
    const [pagination, setPagination] = useState({
        totalProducts: 0,
        totalPages: 0,
        currentPage: 1
    });

    const getProductos = async (filtros = {}) => {
        try {
            setIsLoading(true);
            
            const { page = 1, ...otrosFiltros } = filtros
            
            const params = new URLSearchParams ({
                page,
                ...otrosFiltros
            }).toString()
            const { data } = await axios.get(`${API_TIENDA}/productos?${params}`);
            

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