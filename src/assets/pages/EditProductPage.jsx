import { useState, useEffect, useContext } from 'react';
import {
  Box,
  Button,
  Heading,
  Textarea,
  VStack,
  HStack,
  Input,
  Separator,
  Field,
  NumberInput, // Importamos el objeto principal
  NativeSelect,
  Dialog,
  Portal,
  DialogCloseTrigger,
  CloseButton,
  Container,
  Flex,
  Stack,
  StackSeparator,
} from '@chakra-ui/react';
import { toaster } from "@/components/ui/toaster";
import { ProductContext } from '../context/ProductContext';

const EditProductPage = () => {
  const { products, updateProduct, deleteProduct } = useContext(ProductContext);
  
  const [selectedId, setSelectedId] = useState('');
  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    categoria: '',
    precio: '',
    stock: '',
    imagenUrl: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const  { getProductos } = useContext(ProductContext)
  
  useEffect(() => {
    
    getProductos();
  }, [])
  
  
  useEffect(() => {
    const product = products.find(p => p.id.toString() === selectedId);
    if (product) {
      setForm({
        nombre: product.nombre || '',
        descripcion: product.descripcion || '',
        categoria: product.categoria || '',
        precio: product.precio?.toString() || '0',
        stock: product.stock?.toString() || '0',
        imagenUrl: product.imagenUrl || ''
      });
    }
  }, [selectedId, products]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const onUpdate = async () => {
    setIsSubmitting(true);
    try {
      await updateProduct(selectedId, {
        ...form,
        precio: parseFloat(form.precio),
        stock: parseInt(form.stock)
      });
      toaster.create({ title: "Cambios guardados", type: "success" });
    } catch (error) {
      toaster.create({ title: "Error al actualizar", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };


  const onDelete = async () => {
  if (!selectedId) return;
  
  setIsSubmitting(true);
  try {
    // 🎻 Pasamos la ID seleccionada explícitamente
    await deleteProduct(selectedId); 

    toaster.create({
      title: "Producto Eliminado",
      description: "El instrumento ha sido removido del taller.",
      type: "success"
    });
    
    setSelectedId(''); // Limpiamos la selección
  } catch (error) {
    toaster.create({
      title: "Error al borrar",
      description: "No tienes permisos o el token expiró",
      type: "error"
    });
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <Box bg="gray.50" minH="100vh" py={10} px={4}>
      <Box maxW="md" mx="auto" bg="white" p={8} borderRadius="lg" boxShadow="md">
        <VStack gap={6}>
          <Heading size="lg" color="orange.600">Editar/Eliminar productos</Heading>

          <Field.Root>
            <Field.Label fontWeight="bold">Seleccionar Instrumento</Field.Label>
            <NativeSelect.Root>
              <NativeSelect.Field 
                placeholder="Selecciona una ID"
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
              >
                {products.map(p => <option key={p.id} value={p.id}>ID: {p.id} - {p.nombre}</option>)}
              </NativeSelect.Field>
            </NativeSelect.Root>
          </Field.Root>

          <Separator />

          <VStack gap={4} width="full" disabled={!selectedId}>
            <Field.Root>
              <Field.Label>Nombre</Field.Label>
              <Input name="nombre" value={form.nombre} onChange={handleChange} />
            </Field.Root>

            <HStack width="full" gap={4}>
              <Field.Root>
                <Field.Label>Precio</Field.Label>
                {/* 🎻 CAMBIO CLAVE AQUÍ: Usamos NumberInput.Root y NumberInput.Input */}
                <NumberInput.Root 
                  value={form.precio} 
                  onValueChange={(e) => setForm(prev => ({...prev, precio: e.value}))}
                >
                  <NumberInput.Input /> 
                </NumberInput.Root>
              </Field.Root>

              <Field.Root>
                <Field.Label>Stock</Field.Label>
                <NumberInput.Root 
                  value={form.stock} 
                  onValueChange={(e) => setForm(prev => ({...prev, stock: e.value}))}
                >
                  <NumberInput.Input />
                </NumberInput.Root>
              </Field.Root>
            </HStack>

            <StackSeparator>
            
              <Button
                colorPalette="blue"
                width="full"
                onClick={onUpdate}
                loading={isSubmitting}
              >
                Guardar Cambios
              </Button>
              <Separator />

              <Dialog.Root placement="center"  width="full">
                <Dialog.Trigger asChild>
                  <Button
                    // variant="outline"
                    colorPalette="red"
                    size="sm"
                    alignSelf="flex-end"
                    mt={2}
                  >
                    Borrar Item
                  </Button>
                </Dialog.Trigger>
                <Portal>
                  <Dialog.Backdrop />
                  <Dialog.Positioner>
                    <Dialog.Content>


                      <Dialog.Header>
                        <Dialog.Title>
                          ¿Estás seguro que deseas BORRAR este item?

                        </Dialog.Title>
                      </Dialog.Header>
                      <Dialog.Body>
                        Esta acción no se puede deshacer
                      </Dialog.Body>
                      <Dialog.Footer>
                        <Dialog.ActionTrigger>
                          <Button variant="outline">
                            Cancelar
                          </Button>
                        </Dialog.ActionTrigger>
                        <Button
                          onClick={onDelete}
                          loading = {isSubmitting}>
                            Confirmar
                        </Button>
                      </Dialog.Footer>
                      <DialogCloseTrigger>
                        <CloseButton size="sm" />
                      </DialogCloseTrigger>
                    </Dialog.Content>
                  </Dialog.Positioner>

                </Portal>
              </Dialog.Root>
            </StackSeparator>

          </VStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default EditProductPage;