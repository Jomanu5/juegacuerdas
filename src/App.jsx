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
import { ProductPorvider } from './assets/context/ProductContext.jsx'
import UploadProductPage from './assets/pages/UploadProductPage.jsx'
import AdminRoute from './assets/components/AdminRoute.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Toaster />

      <ProductPorvider>
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
                    
                    <Route element ={<AdminRoute />}>
                      <Route path="/tienda/subir-producto" element ={<UploadProductPage />} />
                    
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
      </ProductPorvider> 
    </>
  )
}

export default App
