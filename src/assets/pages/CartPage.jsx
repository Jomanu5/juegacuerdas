import { 
  Box, 
  Container, 
  Heading, 
  Stack, 
  Text, 
  Flex, 
  Button, 
  Image,
  Separator
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaTrash, FaPlus, FaMinus, FaArrowLeft } from "react-icons/fa";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const { 
    cart, 
    total, 
    incrementQuantity, 
    decrementQuantity, 
    removeItem, 
    clearCart 
  } = useCart();

  // 1. Estado de Carrito Vacío
  if (cart.length === 0) {
    return (
      <Container maxW="container.md" py={20} textAlign="center">
        <Stack gap={6} align="center">
          <Box fontSize="6xl">🎻</Box>
          <Heading size="xl">Tu carrito está vacío</Heading>
          <Text color="gray.600" fontSize="lg">
            Parece que aún no has sumado ningún instrumento a tu colección.
          </Text>
          <Button as={Link} to="/tienda" colorPalette="orange" size="lg" variant="surface">
            Ir a explorar la tienda
          </Button>
        </Stack>
      </Container>
    );
  }

  // 2. Renderizado del Carrito con productos
  return (
    <Container maxW="container.xl" py={{ base: 6, md: 12 }}>
      <Heading mb={10} size="2xl" textAlign={{ base: "center", md: "left" }}>
        Mi Carrito de Compras
      </Heading>

      <Stack direction={{ base: "column", lg: "row" }} gap={10} align="flex-start">
        
        {/* SECCIÓN IZQUIERDA: LISTA DE PRODUCTOS */}
        <Stack gap={4} flex="2" w="full">
          {cart.map((item) => (
            <Flex 
              key={item.id} 
              p={5} 
              bg="white" 
              borderWidth="1px"
              borderRadius="xl" 
              align="center"
              direction={{ base: "column", sm: "row" }}
              gap={6}
            >
              {/* Imagen del producto */}
              <Image 
                src={item.img || "https://via.placeholder.com/150"} 
                alt={item.name} 
                boxSize="110px" 
                objectFit="contain" 
              />

              {/* Información básica */}
              <Box flex="1" textAlign={{ base: "center", sm: "left" }}>
                <Text fontWeight="bold" fontSize="lg" color="gray.800">
                  {item.name}
                </Text>
                <Text color="gray.500" fontSize="sm">
                  Precio unitario: ${item.price.toLocaleString()}
                </Text>
              </Box>

              {/* Selector de cantidad */}
              <Flex 
                align="center" 
                gap={3} 
                bg="gray.50" 
                px={3} 
                py={1} 
                borderRadius="lg" 
                borderWidth="1px"
              >
                <Button 
                  size="xs" 
                  variant="ghost" 
                  onClick={() => decrementQuantity(item.id)}
                  disabled={item.count <= 1}
                >
                  <FaMinus />
                </Button>
                <Text fontWeight="bold" minW="24px" textAlign="center">
                  {item.count}
                </Text>
                <Button 
                  size="xs" 
                  variant="ghost" 
                  onClick={() => incrementQuantity(item.id)}
                >
                  <FaPlus />
                </Button>
              </Flex>

              {/* Subtotal por producto */}
              <Box textAlign="right" minW="120px">
                <Text fontWeight="extrabold" fontSize="lg">
                  ${(item.price * item.count).toLocaleString()}
                </Text>
              </Box>

              {/* Botón eliminar */}
              <Button 
                variant="ghost" 
                colorPalette="red" 
                onClick={() => removeItem(item.id)}
                title="Eliminar del carrito"
              >
                <FaTrash />
              </Button>
            </Flex>
          ))}

          <Button 
            variant="plain" 
            colorPalette="red" 
            size="sm" 
            onClick={clearCart} 
            alignSelf="flex-end"
            mt={2}
          >
            Vaciar todo el carrito
          </Button>
        </Stack>

        {/* SECCIÓN DERECHA: RESUMEN DE PAGO (STICKY) */}
        <Box 
          flex="1" 
          bg="gray.50" 
          p={8} 
          borderRadius="2xl" 
          borderWidth="1px" 
          w="full"
          position={{ lg: "sticky" }}
          top="100px"
        >
          <Heading size="md" mb={6}>Resumen del pedido</Heading>
          
          <Stack gap={4}>
            <Flex justify="space-between">
              <Text color="gray.600">Subtotal productos</Text>
              <Text fontWeight="semibold">${total.toLocaleString()}</Text>
            </Flex>
            
            <Flex justify="space-between">
              <Text color="gray.600">Costo de envío</Text>
              <Text color="green.600" fontWeight="bold">¡Gratis!</Text>
            </Flex>

            <Separator my={2} />

            <Flex justify="space-between" fontSize="2xl" fontWeight="black">
              <Text>Total</Text>
              <Text color="orange.600">${total.toLocaleString()}</Text>
            </Flex>

            <Box pt={4}>
              <Button 
                colorPalette="orange" 
                size="xl" 
                w="full" 
                fontSize="lg"
                shadow="md"
                _hover={{ shadow: "xl", transform: "translateY(-2px)" }}
              >
                Proceder al Pago
              </Button>
            </Box>

            <Button 
              as={Link} 
              to="/tienda" 
              variant="ghost" 
              colorPalette="gray" 
              mt={2}
            >
              <FaArrowLeft style={{ marginRight: '8px' }} />
              Continuar comprando
            </Button>
          </Stack>
        </Box>

      </Stack>
    </Container>
  );
};

export default CartPage;