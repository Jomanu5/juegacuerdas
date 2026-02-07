import { 
  Box, 
  Button, 
  Container, 
  Field, 
  Heading, 
  Input, 
  Stack, 
  Text, 
  Card,
  Link as ChakraLink,
  Alert,
  Flex,
  Separator,
  Toast
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { TokenContext } from "../context/TokenContext";
import axios from "axios";
import { Toaster, toaster } from "@/components/ui/toaster"
import {
  PasswordInput,
  PasswordStrengthMeter,
} from "@/components/ui/password-input"


const API_URL = import.meta.env.VITE_API_URL_TIENDA;


const TiendaLogin = () => {

const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [isLoading, setIsLoading] = useState(false)
const {login } = useContext(TokenContext);





const handleSubmit = async (e) =>{
  e.preventDefault();

  try {
    const { data } = await axios.post (`${API_URL}/auth/login` , {
      email,
      password
    })


    login (data.token);
    
    toaster.create({
        title: "¡Éxito!",
        description: "Sesión iniciada correctamente",
        type: "success"
      });
     

    setEmail('');
    setPassword('');
    navigate('/tienda');
    
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    toaster.create(
      {
        title: "Error al iniciar sesión",
        description: "Usuario o contraseña incorrectos",
        type: "error"
      }
    )
  } finally {
    setIsLoading(false)
  }
}
  

  return (

    <Container maxW="md" py={{ base: 12, md: 24 }}>
      <Card.Root variant="subtle" p={8} shadow="sm" borderRadius="2xl" borderTop="4px solid" borderColor="orange.400">
        <Stack gap={6}>
          {/* IDENTIDAD DE LA TIENDA */}
          <Box textAlign="center">
            <Heading size="3xl" fontWeight="black" letterSpacing="tight">
              TIENDA JuegaCuerdas
            </Heading>
            <Text color="gray.600" mt={2}>
              Ingresa para gestionar tus pedidos y ver accesorios exclusivos.
            </Text>
          </Box>

          <form onSubmit={handleSubmit}>
            <Stack gap={4}>
              {/* CAMPO E-MAIL */}
              <Field.Root>
                <Field.Label fontWeight="bold">Correo Electrónico</Field.Label>
                <Input 
                  type="email" 
                  placeholder="ejemplo@correo.cl" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  bg="white"
                />
              </Field.Root>

              {/* CAMPO PASSWORD */}
              <Field.Root>
                <Flex justify="space-between" align="center" w="full">
                    {/* <Field.Label fontWeight="bold" mb={0}>Contraseña</Field.Label>
                    <ChakraLink as={Link} to="/recuperar" fontSize="xs" color="orange.600">
                        ¿Olvidaste tu clave?
                    </ChakraLink> */}
                </Flex>
                <PasswordInput 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Tu contraseña secreta"
                  bg="white"
                />
              </Field.Root>

              <Button 
                type="submit" 
                colorPalette="orange" 
                size="xl" 
                width="full"
                mt={4}
                fontWeight="bold"
                loading ={isLoading}
                loadingText = "Iniciando sesión..."
              >
                Entrar a mi Cuenta
              </Button>
            </Stack>
          </form>

          {/* PIE DEL FORMULARIO */}
          <Separator />
          <Text textAlign="center" fontSize="sm">
            ¿Aún no tienes cuenta?{" "}
            <ChakraLink as={Link} to="/tienda/register" color="orange.600" fontWeight="bold">
              Regístrate aquí
            </ChakraLink>
          </Text>
        </Stack>
      </Card.Root>
    </Container>
  );
};

export default TiendaLogin;