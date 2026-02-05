import { 
  Box, VStack, HStack, Image, Text, Heading, Icon, 
  Separator, Spacer, Button, Link as ChakraLink 
} from "@chakra-ui/react";
import { 
  FaStore, FaGraduationCap, FaMusic, FaTools, 
  FaPlusSquare, FaSignOutAlt, FaUserCircle 
} from "react-icons/fa";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useContext } from "react";
import { TokenContext } from "../context/TokenContext";
import { jwtDecode } from "jwt-decode";

const SidebarTienda = () => {
  const location = useLocation();
  const { token, logout } = useContext(TokenContext);
  
  // Lógica para detectar si es administrador
  let isAdmin = false;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      isAdmin = decoded.rol === "ADMIN";
    } catch (e) { isAdmin = false; }
  }

  // Componente interno para los botones de navegación
  const NavItem = ({ icon, label, to, colorActive = "orange.600", bgActive = "orange.50" }) => {
    const isActive = location.pathname === to;
    
    return (
      <HStack
        as={RouterLink}
        to={to}
        w="full"
        px={4}
        py={3}
        borderRadius="xl"
        cursor="pointer"
        transition="all 0.3s ease"
        bg={isActive ? bgActive : "transparent"}
        color={isActive ? colorActive : "gray.500"}
        _hover={{ 
          bg: bgActive, 
          color: colorActive, 
          transform: "translateX(8px)" 
        }}
      >
        <Icon as={icon} fontSize="lg" />
        <Text fontWeight={isActive ? "bold" : "medium"} fontSize="sm">
          {label}
        </Text>
      </HStack>
    );
  };

  return (
    <Box
      w="280px"
      h="100vh"
      bg="white"
      borderRightWidth="1px"
      borderColor="gray.100"
      position="fixed"
      left="0"
      top="0"
      p={6}
      display={{ base: "none", md: "flex" }} // Se oculta en móviles y tablets pequeñas
      flexDirection="column"
      boxShadow="sm"
      zIndex="20"
    >
      {/* --- SECCIÓN 1: BRANDING --- */}
      <HStack mb={10} gap={3} as={RouterLink} to="/tienda">
        <Image src="/src/assets/img/Logo_Color.png" boxSize="45px" />
        <VStack align="flex-start" gap={0}>
          <Heading size="md" fontWeight="black" color="gray.800" letterSpacing="tight">
            JuegaCuerdas
          </Heading>
          <Text fontSize="xs" color="orange.500" fontWeight="bold">TIENDA OFICIAL</Text>
        </VStack>
      </HStack>

      {/* --- SECCIÓN 2: NAVEGACIÓN PRINCIPAL --- */}
      <VStack align="flex-start" gap={1} w="full">
        <Text fontSize="10px" fontWeight="black" color="gray.400" mb={2} letterSpacing="widest" textTransform="uppercase">
          Menú Principal
        </Text>
        <NavItem icon={FaStore} label="Inicio Tienda" to="/tienda" />
        <NavItem 
          icon={FaGraduationCap} 
          label="Ir a la Escuela" 
          to="/escuela" 
          colorActive="blue.600" 
          bgActive="blue.50" 
        />
      </VStack>

      {/* --- SECCIÓN 3: CATEGORÍAS --- */}
      <VStack align="flex-start" gap={1} w="full" mt={8}>
        <Text fontSize="10px" fontWeight="black" color="gray.400" mb={2} letterSpacing="widest" textTransform="uppercase">
          Catálogo
        </Text>
        <NavItem icon={FaMusic} label="Violines y Cellos" to="/tienda/violines" />
        <NavItem icon={FaTools} label="Accesorios" to="/tienda/accesorios" />
      </VStack>

      {/* --- SECCIÓN 4: ADMIN (SOLO VISIBLE SI ES ADMIN) --- */}
      {isAdmin && (
        <VStack align="flex-start" gap={1} w="full" mt={8}>
          <Text fontSize="10px" fontWeight="black" color="red.400" mb={2} letterSpacing="widest" textTransform="uppercase">
            Administración
          </Text>
          <NavItem icon={FaPlusSquare} label="Subir Producto" to="/tienda/subir-producto" />
        </VStack>
      )}

      <Spacer />

      {/* --- SECCIÓN 5: USUARIO / FOOTER --- */}
      <VStack w="full" gap={4}>
        <Separator borderColor="gray.100" />
        {token ? (
          <HStack w="full" justify="space-between">
             <HStack gap={3}>
                <Icon as={FaUserCircle} fontSize="2xl" color="gray.400" />
                <Text fontSize="xs" fontWeight="bold" color="gray.600">Mi Perfil</Text>
             </HStack>
             <IconButton 
               aria-label="Cerrar Sesión" 
               variant="ghost" 
               size="xs" 
               color="red.400"
               onClick={logout}
             >
                <FaSignOutAlt />
             </IconButton>
          </HStack>
        ) : (
          <Button 
            as={RouterLink} 
            to="/tienda/login" 
            colorPalette="orange" 
            variant="solid" 
            w="full" 
            size="sm"
            borderRadius="lg"
          >
            Iniciar Sesión
          </Button>
        )}
      </VStack>
    </Box>
  );
};

// Componente pequeño para el icono de logout si decides usarlo en el HStack
const IconButton = ({ children, onClick, ...props }) => (
    <Box as="button" onClick={onClick} cursor="pointer" _hover={{ color: "red.600" }} {...props}>
        {children}
    </Box>
);

export default SidebarTienda;