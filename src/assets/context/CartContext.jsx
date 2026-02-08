import { Toaster, toaster } from "@/components/ui/toaster"
import { createContext, useState, useEffect, useContext } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('juegacuerdas_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Guardar en LocalStorage cada vez que el carrito cambie
  useEffect(() => {
    localStorage.setItem('juegacuerdas_cart', JSON.stringify(cart));
  }, [cart]);

  const agregarCarrito = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, count: item.count + 1 } : item
        );
      }
      return [...prev, { ...product, count: 1 }];
    });
    toaster.create({
      title: "Producto agregado",
      description: `${product.nombre} ya está en tu carrito.`,
      type: "success", // Color verde para éxito
      duration: 3000,   // 3 segundos
    });
  };


  const incrementQuantity = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, count: item.count + 1 } : item
      )
    );
  };

  const decrementQuantity = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, count: item.count - 1 } : item
        )
        .filter((item) => item.count > 0)
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce((acc, item) => acc + item.price * item.count, 0);

  // Cantidad total de productos (útil para la burbuja roja en el icono del carrito)
  const cartCount = cart.reduce((acc, item) => acc + item.count, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        total,
        cartCount,
        agregarCarrito,
        incrementQuantity,
        decrementQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook para usar el carrito fácilmente
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de un CartProvider');
  }
  return context;
};