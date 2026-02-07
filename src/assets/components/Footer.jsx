import { 
  Box, 
  Container, 
  SimpleGrid, 
  Stack, 
  Text, 
  Heading, 
  Link as ChakraLink, 
  Icon, 
  HStack,
  Separator,
  Image
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FaInstagram, FaWhatsapp, FaYoutube, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <Box 
      bg="gray.950" 
      color="gray.400" 
      mt={20}
      ml={{ base: 0, md: "280px" }}>
      <Container maxW="container.xl" py={12}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={12}>
          
          {/* COLUMNA 1: IDENTIDAD */}
          <Stack gap={4}>
            <Heading color="white" size="md" fontWeight="black" letterSpacing="tight">
              JuegaCuerdas
            </Heading>
            <Text fontSize="sm" lineHeight="tall">
              Escuela de violín y tienda especializada en Santiago de Chile. 
              Seleccionamos cada instrumento pensando en tu crecimiento musical.
            </Text>
            <HStack gap={4}>
              <ChakraLink href="https://www.instagram.com/juegacuerdas/" target="_blank" _hover={{ color: "orange.400" }}>
                <FaInstagram size="20px" />
              </ChakraLink>
              <ChakraLink href="https://youtube.com/@juegacuerdas" target="_blank" _hover={{ color: "orange.400" }}>
                <FaYoutube size="20px" />
              </ChakraLink>
            </HStack>
          </Stack>

          {/* COLUMNA 2: TIENDA */}
          <Stack gap={4}>
            <Text color="white" fontWeight="bold">Navegación Tienda</Text>
            <Stack gap={2} fontSize="sm">
              <ChakraLink as={RouterLink} to="/tienda" _hover={{ color: "orange.400", textDecoration: "none" }}>
                Todos los Productos
              </ChakraLink>
              <ChakraLink as={RouterLink} to="/tienda/violines" _hover={{ color: "orange.400", textDecoration: "none" }}>
                Violines
              </ChakraLink>
              <ChakraLink as={RouterLink} to="/tienda/accesorios" _hover={{ color: "orange.400", textDecoration: "none" }}>
                Accesorios y Cuerdas
              </ChakraLink>
              <ChakraLink as={RouterLink} to="/tienda/subir-producto" _hover={{ color: "orange.400", textDecoration: "none" }}>
                Panel de Administración
              </ChakraLink>
            </Stack>
          </Stack>

          {/* COLUMNA 3: POLÍTICAS / AYUDA */}
          <Stack gap={4}>
            <Text color="white" fontWeight="bold">Soporte</Text>
            <Stack gap={2} fontSize="sm">
              <ChakraLink _hover={{ color: "orange.400" }}>Tallas de Violín</ChakraLink>
              <ChakraLink _hover={{ color: "orange.400" }}>Envíos a Regiones</ChakraLink>
              <ChakraLink _hover={{ color: "orange.400" }}>Términos y Condiciones</ChakraLink>
            </Stack>
          </Stack>

          {/* COLUMNA 4: CONTACTO SANTIAGO */}
          <Stack gap={4}>
            <Text color="white" fontWeight="bold">Contacto</Text>
            <Stack gap={3} fontSize="sm">
              <HStack align="flex-start">
                <FaMapMarkerAlt color="var(--chakra-colors-orange-400)" style={{ marginTop: '4px' }} />
                <Text>Santiago, Chile</Text>
              </HStack>
              <HStack align="flex-start">
                <FaWhatsapp color="var(--chakra-colors-orange-400)" style={{ marginTop: '4px' }} />
                <Text>+56 9 3882 1217</Text>
              </HStack>
              <HStack align="flex-start">
                <FaEnvelope color="var(--chakra-colors-orange-400)" style={{ marginTop: '4px' }} />
                <Text>escuela.juegacuerdas@gmail.com</Text>
              </HStack>
            </Stack>
          </Stack>

        </SimpleGrid>

        <Separator mt={12} mb={8} borderColor="gray.800" />

        <Stack direction={{ base: "column", md: "row" }} justify="space-between" align="center" fontSize="xs">
          <Text>© 2026 JuegaCuerdas. Desarrollado para músicos.</Text>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;