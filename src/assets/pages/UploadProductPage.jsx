import { 
  Box, Button, Container, Field, Heading, Input, Stack, 
  Card, Textarea, NumberInput, Group, Icon, Text, Image 
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { toaster } from "@/components/ui/toaster";
import { LuUpload, LuMusic, LuDollarSign, LuBox } from "react-icons/lu";

const API_URL = import.meta.env.VITE_API_URL_TIENDA;

const UploadProductPage = () => {
  const [product, setProduct] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    imagenUrl: "",
    categoria: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Obtenemos el token del localStorage (o de tu contexto)
      const token = localStorage.getItem("token"); 

      await axios.post(`${API_URL}/productos`, product, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toaster.create({
        title: "Producto Publicado",
        description: "El nuevo instrumento ya está disponible en la tienda.",
        type: "success"
      });

      // Limpiar formulario
      setProduct({ nombre: "", descripcion: "", precio: "", stock: "", imagenUrl: "", categoria: "" });

    } catch (error) {
      toaster.create({
        title: "Error al subir",
        description: error.response?.data?.message || "Revisa la conexión con el servidor",
        type: "error"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxW="3xl" py={12}>
      <Card.Root variant="outline" shadow="md" borderRadius="xl">
        <Card.Header bg="gray.50" borderBottomWidth="1px" p={6} borderRadius="xl">
          <Heading size="xl">Panel de Administración</Heading>
          <Text color="gray.600">Agregar nuevo producto al catálogo de JuegaCuerdas</Text>
        </Card.Header>

        <Card.Body p={8}>
          <form onSubmit={handleSubmit}>
            <Stack gap={6}>
              {/* NOMBRE DEL PRODUCTO */}
              <Field.Root required>
                <Field.Label fontWeight="bold">Nombre del Instrumento / Accesorio</Field.Label>
                <Group attached w="full">
                  <Box bg="gray.100" p={2} borderLeftRadius="md"><LuMusic /></Box>
                  <Input 
                    name="nombre"
                    placeholder="Ej: Violín Cremona SV-175 4/4" 
                    value={product.nombre}
                    onChange={handleChange}
                  />
                </Group>
              </Field.Root>

              <Group gap={4} w="full">
                {/* PRECIO */}
                <Field.Root required flex="1">
                  <Field.Label fontWeight="bold">Precio (CLP)</Field.Label>
                  <Group attached w="full">
                    <Box bg="gray.100" p={2} borderLeftRadius="md"><LuDollarSign /></Box>
                    <Input 
                      name="precio"
                      type="number"
                      placeholder="950000" 
                      value={product.precio}
                      onChange={handleChange}
                    />
                  </Group>
                </Field.Root>

                {/* STOCK */}
                <Field.Root required flex="1">
                  <Field.Label fontWeight="bold">Stock Inicial</Field.Label>
                  <Group attached w="full">
                    <Box bg="gray.100" p={2} borderLeftRadius="md"><LuBox /></Box>
                    <Input 
                      name="stock"
                      type="number"
                      placeholder="5" 
                      value={product.stock}
                      onChange={handleChange}
                    />
                  </Group>
                </Field.Root>
              </Group>

              {/* URL DE LA IMAGEN */}
              <Field.Root required>
                <Field.Label fontWeight="bold">URL de la Imagen (Cloudinary o similar)</Field.Label>
                <Input 
                  name="imagenUrl"
                  placeholder="https://images.com/violin.jpg" 
                  value={product.imagenUrl}
                  onChange={handleChange}
                />
                {product.imagenUrl && (
                  <Box mt={4} borderRadius="md" overflow="hidden" border="1px solid" borderColor="gray.200">
                    <Image src={product.imagenUrl} alt="Preview" maxH="200px" w="full" objectFit="contain" bg="gray.50" />
                  </Box>
                )}
              </Field.Root>

              {/* DESCRIPCIÓN */}
              <Field.Root required>
                <Field.Label fontWeight="bold">Descripción Técnica</Field.Label>
                <Textarea 
                  name="descripcion"
                  placeholder="Detalla maderas, cuerdas incluidas, nivel recomendado..." 
                  value={product.descripcion}
                  onChange={handleChange}
                  rows={4}
                />
              </Field.Root>

              <Button 
                type="submit" 
                colorPalette="orange" 
                size="xl" 
                width="full"
                loading={isSubmitting}
                loadingText="Guardando en la base de datos..."
              >
                <LuUpload style={{ marginRight: '8px' }} /> Publicar Producto
              </Button>
            </Stack>
          </form>
        </Card.Body>
      </Card.Root>
    </Container>
  );
};

export default UploadProductPage;