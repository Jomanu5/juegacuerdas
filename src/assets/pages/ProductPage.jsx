import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Box, Container, SimpleGrid, Image, Text, Heading, 
  Badge, Stack, Button, HStack, Icon, Separator,
  Center, Spinner, IconButton
} from "@chakra-ui/react";
import { LuShoppingCart, LuArrowLeft,LuBadgeCheck, LuPackage } from "react-icons/lu";
import axios from "axios";
import { API_TIENDA } from "../../apiConfig.js";
import { useCart } from "../context/CartContext.jsx";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  const { agregarCarrito } = useCart()

  useEffect(() => {
    const getProducto = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${API_TIENDA}/productos/${id}`);
        setProducto(data);
      } catch (error) {
        console.error("Error al cargar el instrumento:", error);
      } finally {
        setLoading(false);
      }
    };
    getProducto();
  }, [id]);

  if (loading) return (
    <Center h="70vh"><Spinner size="xl" color="orange.500" /></Center>
  );

  if (!producto) return (
    <Center h="70vh">
      <Stack align="center">
        <Text fontSize="lg">Este instrumento no está en nuestro inventario.</Text>
        <Button onClick={() => navigate("/tienda")} variant="ghost">Volver a la tienda</Button>
      </Stack>
    </Center>
  );

  return (
    <Container maxW="container.xl" py={10}>
      {/* Botón Volver */}
      <Button 
        variant="ghost" 
        mb={8} 
        leftIcon={<LuArrowLeft />} 
        onClick={() => navigate(-1)}
      >
        Volver al catálogo
      </Button>

    <Box p={10} maxW="container.lg">    

      <SimpleGrid columns={{ base: 1, md: 2 }} gap={12}>
        {/* Lado Izquierdo: Imagen */}
        <Box borderRadius="2xl" overflow="hidden" shadow="xl" bg="gray.50" p={10}>
          <Image
            src={producto.imagenUrl || "https://via.placeholder.com/600x600?text=Instrumento"}
            alt={producto.nombre}
            w="full"
            h="500px"
            objectFit="cover"
            />
      
        </Box>

        {/* Lado Derecho: Detalles */}
        <Stack gap={6}>
          <Stack gap={2}>
            <Badge colorPalette="orange" alignSelf="flex-start" size="lg" variant="subtle">
              {producto.categoria}
            </Badge>
            <Heading size="3xl" fontWeight="black" letterSpacing="tight">
              {producto.nombre}
            </Heading>
            <HStack color="green.600" fontSize="sm" fontWeight="bold">
              <Icon as={LuBadgeCheck} />
              <Text>Disponible en el taller (Stock: {producto.stock} un.)</Text>
            </HStack>
          </Stack>

          <Text fontSize="4xl" fontWeight="black" color="orange.600">
            ${producto.precio?.toLocaleString('es-CL')}
          </Text>

          <Separator />

          <Stack gap={3}>
            <Heading size="md" display="flex" alignItems="center" gap={2}>
              <Icon as={LuPackage} /> Descripción
            </Heading>
            <Text color="gray.600" fontSize="lg" lineHeight="tall">
              {producto.descripcion || "Este producto no tiene descripción aún. Ideal para alumnos que buscan calidad y durabilidad."}
            </Text>
          </Stack>

          <Separator />

          {/* Acciones */}
          <HStack gap={4} pt={4}>
            <Button 
              size="lg" 
              colorPalette="orange" 
              flex="2" 
              height="60px"
              fontSize="xl"
              onClick={()=> agregarCarrito(producto)}
              >
              <LuShoppingCart /> Agregar al Carrito
            </Button>
          </HStack>
        </Stack>
      </SimpleGrid>
    </Box>
    </Container>
  );
};

export default ProductPage