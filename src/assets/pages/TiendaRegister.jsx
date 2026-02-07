import { Box, Button, Card, Container, Field, Heading, Input, Separator, Stack, Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {
  PasswordInput,
  PasswordStrengthMeter,
} from "@/components/ui/password-input"
import { Link as ChakraLink } from "@chakra-ui/react"
import { Toaster, toaster } from "@/components/ui/toaster"


import { API_TIENDA } from '../../apiConfig';




const TiendaRegister = () => {
    const [nombre, setNombre] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        
        if (password !== confirmPassword) {
            Toaster.create({
                title: "Error",
                description: "Las contraseñas no coinciden",
                type: "error"
              });
        }
        
        if (password.length < 6) {
            return toaster.create({
                title: "Error",
                description: "La contraseña debe tener al menos 6 caracteres",
                type: "error"
            });
        }
        
        setIsLoading(true);
        
        try {
            await axios.post (`${API_TIENDA}/auth/register`, {
                nombre: nombre.trim(),
                email: email.trim(),
                password: password.trim()
            });
            
        } catch (error) {
            console.error("Error al registrar tienda:", error);
            toaster.create({
                title: "Error al registrar tienda",
                description: error.response?.data?.message || "Ha ocurrido un error",
                type: "error"
            });
        } finally{
            setIsLoading(false);
        }
    };

    return (
        <Container maxW="md" py={{ base: 12, md: 20 }}>
      <Card.Root variant="subtle" p={8} shadow="sm" borderRadius="2xl" borderTop="4px solid" borderColor="orange.400">
        <Stack gap={6}>
          <Box textAlign="center">
            <Heading size="3xl" fontWeight="black" letterSpacing="tight">
              Crear Cuenta
            </Heading>
            <p color="gray.600" mt={2}>
              Únete a la tienda de JuegaCuerdas para comprar tus accesorios.
            </p>
          </Box>

          <form onSubmit={handleSubmit}>
            <Stack gap={4}>
              {/* CAMPO NOMBRE */}
              <Field.Root>
                <Field.Label fontWeight="bold">Nombre Completo</Field.Label>
                <Input 
                  placeholder="Juan Pérez" 
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  bg="white"
                  required
                  disabled={isLoading}
                />
              </Field.Root>

              {/* CAMPO E-MAIL */}
              <Field.Root>
                <Field.Label fontWeight="bold">Correo Electrónico</Field.Label>
                <Input 
                  type="email" 
                  placeholder="ejemplo@correo.cl" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  bg="white"
                  required
                  disabled={isLoading}
                />
              </Field.Root>

              {/* CAMPO PASSWORD */}
              <Field.Root>
                <Field.Label fontWeight="bold">Contraseña</Field.Label>
                <PasswordInput 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  bg="white"
                  required
                  disabled={isLoading}
                />
              </Field.Root>

              {/* CONFIRMAR PASSWORD */}
              <Field.Root>
                <Field.Label fontWeight="bold">Confirmar Contraseña</Field.Label>
                <PasswordInput 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repite tu contraseña"
                  bg="white"
                  required
                  disabled={isLoading}
                />
              </Field.Root>

              <Button 
                type="submit" 
                colorPalette="blue" 
                size="xl" 
                width="full"
                mt={4}
                fontWeight="bold"
                loading={isLoading}
                loadingText="Creando cuenta..."
              >
                Registrarme
              </Button>
            </Stack>
          </form>

          <Separator />
          <Text textAlign="center" fontSize="sm">
            ¿Ya tienes una cuenta?{" "}
            <ChakraLink as={Link} to="/tienda/login" color="blue.600" fontWeight="bold">
              Inicia sesión aquí
            </ChakraLink>
          </Text>
        </Stack>
      </Card.Root>
    </Container>
  );
};

    
        
        
        
        

        






export default TiendaRegister