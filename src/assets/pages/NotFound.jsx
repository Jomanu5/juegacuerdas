import { Box, Heading, Text, Button, VStack, Container } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container maxW="container.md" py={20} textAlign="center">
      <VStack gap={6}> {/* Usamos gap para v3 */}
        <Box fontSize="7xl">🎻</Box>
        
        <Heading size="2xl" color="orange.600">
          404 - Nota fuera de lugar
        </Heading>
        
        <Text fontSize="lg" color="gray.600">
          Parece que la página que buscas no está en nuestra partitura. 
          Puede que el instrumento se haya movido de lugar o el enlace esté roto.
        </Text>

        <Button 
          as={Link} 
          to="/tienda" 
          colorPalette="orange" // Estilo v3
          size="lg"
          variant="surface"
        >
          Volver al catálogo
        </Button>
      </VStack>
    </Container>
  );
};

export default NotFound;