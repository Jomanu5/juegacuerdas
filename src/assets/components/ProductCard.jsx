import { 
  Card, 
  Image, 
  Text, 
  Button, 
  Stack, 
  Badge, 
  Group,
  IconButton
} from "@chakra-ui/react";
import { LuShoppingCart, LuEye } from "react-icons/lu"; // Iconos modernos

const ProductCard = ({ producto }) => {
  // Supongamos que 'producto' tiene: id, name, price, img, category
  
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
          src={producto.img}
          alt={producto.name}
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
          {producto.category}
        </Badge>
      </Box>

      <Card.Body gap="2">
        <Card.Title mb="1" fontWeight="bold" fontSize="lg">
          {producto.name}
        </Card.Title>
        
        <Card.Description>
          <Text textStyle="2xl" fontWeight="black" color="orange.600">
            ${producto.price.toLocaleString('es-CL')}
          </Text>
        </Card.Description>
      </Card.Body>

      <Card.Footer p="4">
        <Group attached w="full">
          <Button 
            flex="1" 
            colorPalette="orange" 
            variant="solid"
            onClick={() => handleAddToCart(producto)}
          >
            <LuShoppingCart /> Agregar
          </Button>
          <IconButton variant="outline" aria-label="Ver detalles">
            <LuEye />
          </IconButton>
        </Group>
      </Card.Footer>
    </Card.Root>
  );
};

export default ProductCard;