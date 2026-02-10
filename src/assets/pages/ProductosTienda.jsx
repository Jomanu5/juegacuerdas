import { useContext, useEffect } from "react";
import { ProductContext } from "../context/ProductContext";
import { 
  SimpleGrid, 
  Container, 
  Heading, 
  Text, 
  VStack, 
  Button, 
  Center,
  Icon
} from "@chakra-ui/react";
import { LuPackageSearch } from "react-icons/lu"; // Un icono de búsqueda vacía
import ProductCard from "../components/ProductCard";
import { useLocation } from "react-router-dom";


const ProductosTienda = () => {
  const {getProductos, products= [], isLoading = true } = useContext(ProductContext);
  const location = useLocation();

  useEffect(()=> {
    const queryParams = new URLSearchParams(location.search)
    const filtros = {
      categoria:queryParams.get("categoria") || "",
      precioMax:queryParams.get("precioMax") || "",
      page: queryParams.get ("page") || 1
    };
    getProductos(filtros);

    
  }, [location.search]);

  // 1. Mientras carga, mostramos el spinner
if (isLoading) return <Center h="50vh">Cargando violines...</Center>;

  // 2. Si terminó de cargar pero el array está vacío
if (!Array.isArray(products) || products.length === 0) {    return (
      <Center py={20}>
        <VStack gap={6}>
          <Icon as={LuPackageSearch} boxSize="80px" color="gray.300" />
          <VStack gap={2}>
            <Heading size="xl">¡Oh, no! El taller está vacío</Heading>
            <Text color="gray.600" textAlign="center">
              Actualmente no tenemos productos disponibles en la tienda. <br />
              Vuelve pronto para ver los nuevos violines y accesorios.
            </Text>
          </VStack>
          <Button colorPalette="orange" variant="outline" onClick={() => window.location.reload()}>
            Actualizar página
          </Button>
        </VStack>
      </Center>
    );
  }

  // 3. Si hay productos, mostramos la grilla normal
  return (
    <Container maxW="container.md" py={10}>
      <SimpleGrid columns={{ base: 1, md: 3 }} gap={12}>
        {products.map((prod) => (
          <ProductCard p={4}
          key={prod.id} 
          producto={prod} />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default ProductosTienda;