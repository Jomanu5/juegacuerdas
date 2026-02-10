import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  Stack, 
  Button, 
  Flex,
  Image, 
} from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip"
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Box as="main" bg="gray.50" minH="100vh">
      <Flex
        bg="orange.400" 
        color="white"
        // Mobile First: base (móvil) es 12, md (escritorio) es 24
        py={{ base: 12, md: 24 }} 
        px={4}
        align="center"
        justify="center"
        textAlign="center"
        direction="column"
        minH={{ base: "auto", md: "80vh" }} 
      >
        <Container maxW="container.lg">
          <Stack gap={6} align="center">
            {/* Imagen responsiva: más pequeña en móvil para no tapar todo */}
            <Image 
              src="/Logo_Color.png" 
              alt="JuegaCuerdas Logo" 
              maxW={{ base: "180px", md: "300px" }} 
              mb={2} 
            />

            <Heading 
              // Tamaños de texto que crecen con la pantalla
              fontSize={{ base: "3xl", md: "5xl", lg: "6xl" }} 
              fontWeight="extrabold" 
              lineHeight="tight"
            >
              JuegaCuerdas: Tu Pasión Musical Empieza Aquí
            </Heading>

            <Text fontSize={{ base: "md", md: "xl" }} maxW="2xl">
              Descubre cursos de guitarra online, tablaturas exclusivas y la mejor selección de instrumentos y accesorios.
            </Text>
            
            <Stack 
              // IMPORTANTE: column en móvil, row en escritorio (sm o md)
              direction={{ base: "column", sm: "row" }} 
              gap={4}
              mt={4}
              w={{ base: "full", sm: "auto" }} // Botones ancho completo en móvil
            >
              <Button 
                as={Link} 
                to="/tienda"
                bg="yellow.400" 
                color="black"
                size="lg"
                h="60px"
                px={10}
                fontSize="xl"
                w={{ base: "full", sm: "auto" }} // El botón llena el ancho en celular
                _hover={{ transform: "scale(1.05)", shadow: "md" }}
              >
                Ir a la Tienda
              </Button>
            
              <Tooltip showArrow content ="Sitio web en construcción" >
                
                <Button
                  disabled //SITIO WEB EN CONSTRUCCIÓN

                  // as={Link}
                  // to="/escuela"
                  variant="outline"
                  color="white"
                  borderColor="white"
                  size="lg"
                  h="60px"
                  px={10}
                  fontSize="xl"
                  w={{ base: "full", sm: "auto" }}
                  _hover={{ bg: "whiteAlpha.300" }}
                >
                  Explorar la Escuela
                </Button>
              </Tooltip>


            </Stack>
          </Stack>
        </Container>
      </Flex>
    </Box>
  );
};

export default Home;