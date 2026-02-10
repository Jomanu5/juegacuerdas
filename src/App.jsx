import { useState } from 'react'
import './App.css'
import Home from './assets/pages/Home.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TiendaLayout from './assets/layouts/TiendaLayout.jsx'
import MainTienda from './assets/pages/MainTienda.jsx'
import EscuelaLayout from './assets/layouts/EscuelaLayout.jsx'
import MainEscuela from './assets/pages/MainEscuela.jsx'
import CartPage from './assets/pages/CartPage.jsx'
import { CartProvider } from './assets/context/CartContext.jsx'
import TokenProvider from './assets/context/TokenContext.jsx'
import TiendaLogin from './assets/pages/TiendaLogin.jsx'
import TiendaRegister from './assets/pages/TiendaRegister.jsx'
import {  ProductProvider } from './assets/context/ProductContext.jsx'
import UploadProductPage from './assets/pages/UploadProductPage.jsx'
import AdminRoute from './assets/components/AdminRoute.jsx'
import { Toaster, toaster } from "@/components/ui/toaster"
import ProductosTienda from './assets/pages/ProductosTienda.jsx'
import ProductPage from './assets/pages/ProductPage.jsx'
import EditProductPage from './assets/pages/EditProductPage.jsx'
import NotFound from './assets/pages/NotFound.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Toaster />

      <ProductProvider>
        <TokenProvider>

          <CartProvider>

            <BrowserRouter>
              <Routes>
                <Route>

                  <Route path="/" element={<Home />} />
                  <Route path="/tienda" element={<TiendaLayout />}>
                    <Route index element={<MainTienda />} />
                    <Route path="/tienda/cart" element={<CartPage />} />
                    <Route path="/tienda/login" element={<TiendaLogin />} />
                    <Route path="/tienda/register" element={<TiendaRegister />} />
                    <Route path = "/tienda/productos" element ={<ProductosTienda />} />
                    <Route path="/tienda/producto/:id" element={<ProductPage />} />
                    <Route path="*" element={<NotFound />} />                     
                    <Route element ={<AdminRoute />}>
                      <Route path="/tienda/subir-producto" element ={<UploadProductPage />} />
                      <Route path="/tienda/editar-producto" element ={<EditProductPage />} />

                    
                    </Route>


                  </Route>


                  <Route path="/escuela" element={<EscuelaLayout />}>
                    <Route index element={<MainEscuela />} />
                  </Route>
                </Route>
              </Routes>

            </BrowserRouter>
          </CartProvider>
        </TokenProvider>
      </ProductProvider> 
    </>
  )
}

export default App
