import { useContext } from "react";
import { Button, HStack, Spinner } from "@chakra-ui/react"; // Agregamos Spinner
import { TokenContext } from "../context/TokenContext";
import { FaSignOutAlt, FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LogButton = () => {
  const { logout, isAuthenticated, isLoading } = useContext(TokenContext);
  const navigate = useNavigate();

  // MIENTRAS CARGA: No mostramos nada o mostramos un spinner 
  // para evitar que el botón "salte" de un estado a otro
  if (isLoading) return <Spinner size="sm" color="orange.500" />;

  const handleLogout = () => {
    logout();
    navigate("/tienda"); 
  };

  return (
    <>
      {isAuthenticated ? (
        <Button 
          colorPalette="red" 
          variant="ghost" 
          size="sm"
          onClick={handleLogout}
        >
          <FaSignOutAlt style={{ marginRight: '8px' }} />
          Cerrar Sesión
        </Button>
      ) : (
        <HStack>
        <Button
          colorPalette="green" 
          variant="solid" // Solid resalta más para nuevos alumnos
          size="sm"
          onClick={() => navigate("/tienda/login")}
          >
          <FaSignInAlt style={{ marginRight: '8px' }} />
          Iniciar Sesión
        </Button>
        <Button
          colorPalette="blue" 
          variant="solid" // Solid resalta más para nuevos alumnos
          size="sm"
          onClick={() => navigate("/tienda/register")}
          >
          <FaSignInAlt style={{ marginRight: '8px' }} />
          Regístrate
        </Button>
      </HStack>
      )}
    </>
  );
};

export default LogButton;