import axios from "axios";
import { createContext,  useState } from "react";
import { API_TIENDA } from "../../apiConfig"; 

export const ProductContext = createContext();

export const ProductProvider = ({children}) => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    // const [filtros, setFiltros] = useState({
    //     categoria:"",
    //     precioMax:"",
    //     ordenPrecio:"",
    // })
    
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

    const deleteProduct = async (id) =>{
        try {
            const token = localStorage.getItem('token')
            const config = {
                headers: {Authorization: `Bearer ${token}`}
            }
            await axios.delete(`${API_TIENDA}/productos/${id}`,config)
            setProducts((prev) => prev.filter((p) => p.id !==parseInt(id)))

        } catch (error) {
            console.error ("Error al eliminar:", error.response)
            
        }
    }

    const updateProduct = async (id, updateData) => {
        try {
            const token = localStorage.getItem('token')
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            }

            const { data } = await axios.put(`${API_TIENDA}/productos/${id}`, updateData, config)

            setProducts((prev) => prev.filter((p) => p.id !== parseInt(id)));
            return data;
        } catch (error) {
            console.error("error al actualizar:", error.response)
            throw error
        }

    }

    return (
        <ProductContext.Provider value={{ 
            products, 
            isLoading, 
            pagination, 
            getProductos, 
            getProductoById,
            deleteProduct,
            updateProduct
        }}>
            {children}
        </ProductContext.Provider>
    );
};