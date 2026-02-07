import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { API_TIENDA } from "../../apiConfig";


export const ProductContext = createContext()


export const ProductPorvider = ({children}) => {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const getProductos = async () => {
        try{
            setIsLoading(true)
            const { data } =
 await axios.get(`${API_TIENDA}/productos` || 'http://localhost:3000')
            setProducts (data);
        } catch (error) {
            console.error("Error al obtener productos:", error); 
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(
        () => {
            getProductos();
        },[]);

    //productos por ID

    const getProductoById = (id) => {
        return products.find((product) => product.id === parseInt (id));
    }

    return (
        <ProductContext.Provider value={{ products, isLoading, getProductoById }}>
            {children}
        </ProductContext.Provider>
    )

}