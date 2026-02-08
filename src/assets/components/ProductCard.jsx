import { 
  Card, 
  Image, 
  Text, 
  Button, 
  Stack, 
  Badge, 
  Group,
  IconButton,
  Box
} from "@chakra-ui/react";
import { LuShoppingCart, LuEye } from "react-icons/lu"; 
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";



const ProductCard = ({ producto }) => {
  const navigate = useNavigate()
  const handleVerDetalles = () => {
    navigate(`/tienda/producto/${producto.id}`);
  };

  const {agregarCarrito} = useCart();
  
  return (
    <Card.Root 
      maxW="sm" 
      overflow="hidden" 
      variant="elevated"
      _hover={{ transform: "translateY(-4px)", shadow: "md" }} // Efecto de elevación
      transition="all 0.2s"
    >
      {/* IMAGEN DEL PRODUCTO */}
      <Box position="relative">
        <Image
          src={producto.imagenUrl}
          alt={producto.nombre}
          height="240px"
          width="full"
          objectFit="cover"
        />
        {/* Etiqueta de Categoría */}
        <Badge 
          position="absolute" 
          top="2" 
          left="2" 
          colorPalette="orange" 
          variant="solid"
        >
          {producto.categoria}
        </Badge>
      </Box>

      <Card.Body gap="2">
        <Card.Title mb="1" fontWeight="bold" fontSize="lg">
          {producto.nombre}
        </Card.Title>
        
        <Card.Description>
          <Text textStyle="2xl" fontWeight="black" color="orange.600">
            ${producto.precio.toLocaleString('es-CL')}
          </Text>
        </Card.Description>
      </Card.Body>

      <Card.Footer p="4">
        <Group attached w="full">
          <Button 
            flex="1" 
            colorPalette="orange" 
            variant="solid"
            onClick={() => agregarCarrito(producto)}
          >
            <LuShoppingCart /> Agregar al carrito
          </Button>
          <IconButton 
            variant="outline" 
            aria-label="Ver detalles"
            onClick={ handleVerDetalles }>
            <LuEye />
          </IconButton>
        </Group>
      </Card.Footer>
    </Card.Root>
  );
};

export default ProductCard;