import { 
  Box, Heading, Text, SimpleGrid, Image, 
  Stack, Card, Button, Container, Badge, 
  Skeleton,
  HStack
} from "@chakra-ui/react";
import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { Link } from "react-router-dom";

const MainTienda = () => {
  const { products, isLoading } = useContext(ProductContext);

  // 🎻 Tomamos solo los 3 primeros productos de la lista
  const ultimosProductos = products?.slice(0, 3) || []

  return (
    <Container maxW="container.xl" py={12}>
      {/* --- SECCIÓN HERO: EL SALUDO --- */}
      <Stack textAlign="center" gap={6} mb={20} py={10}>
        <Badge variant="subtle" colorPalette="orange" alignSelf="center" px={4} py={1}>
          Desde Santiago para todo Chile
        </Badge>
        <Heading size="4xl" fontWeight="black" letterSpacing="tight">
          La tienda oficial de <br />
          <Text as="span" color="orange.600">JuegaCuerdas</Text>
        </Heading>
        <Text fontSize="xl" color="gray.600" maxW="2xl" mx="auto">
          Instrumentos, accesorios y materiales seleccionados por músicos profesionales 
          para acompañar cada paso de tu formación artística.
        </Text>
        <HStack justify="center" gap={4}>
          <Button as={Link} to="/tienda/productos" size="lg" colorPalette="orange" px={8}>
              Ve todos nuestros productos
          </Button>
        </HStack>
      </Stack>

      {/* --- SECCIÓN: NOVEDADES --- */}
      <Box>
        <HStack justify="space-between" mb={8} pl={4}>
          <Heading size="lg">Últimas Novedades</Heading>
         
        </HStack>

        <SimpleGrid  columns={{ base: 1, md: 3 }} gap={8} >
          {isLoading ? (
            // Mostramos esqueletos de carga si aún no llegan los datos de Render
            [1, 2, 3].map((i) => <Skeleton key={i} height="350px" borderRadius="lg" />)
          ) : (
            ultimosProductos.map((producto) => (
              <Card.Root key={producto.id} variant="elevated" overflow="hidden" transition="transform 0.2s" _hover={{ transform: "translateY(-5px)" }}>
                <Image
                  src={producto.imagenUrl || "https://via.placeholder.com/300x200?text=Instrumento"}
                  alt={producto.nombre}
                  height="220px"
                  objectFit="cover"
                />
                <Card.Body gap={2}>
                  <Text fontSize="xs" fontWeight="bold" color="gray.500" textTransform="uppercase">
                    {producto.categoria}
                  </Text>
                  <Card.Title fontSize="xl">{producto.nombre}</Card.Title>
                  <Text textStyle="2xl" fontWeight="bold" color="orange.600">
                    ${producto.precio?.toLocaleString('es-CL')}
                  </Text>
                </Card.Body>
                <Card.Footer>
                  <Button as={Link} to={`/tienda/producto/${producto.id}`} variant="outline" width="full">
                    Ver Detalles
                  </Button>
                </Card.Footer>
              </Card.Root>
            ))
          )}
        </SimpleGrid>
      </Box>
    </Container>
  );
};

export default MainTienda ;