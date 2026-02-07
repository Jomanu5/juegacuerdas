// import { Badge, Box, Button, CloseButton, Container, Drawer, Flex, Heading, HStack, IconButton, Image, Input, InputGroup, Portal, Separator, Spacer, VStack } from '@chakra-ui/react'
// import React, { useState } from 'react'
// import { FaShoppingCart } from 'react-icons/fa'
// import { MdOutlineMenu } from 'react-icons/md'
// import { Link, Link as RouterLink } from 'react-router-dom'
// import LogButton from './LogButton'

// const Navbar = () => {

//   const [open, setOpen] = useState(false)

//   return (

//     <>

//       {/* // DISEÑO PARA MÓVILES */}
//       <Box display={{ base: 'block', md: 'none' }} p={4} borderBottomWidth="1px">

//         <Drawer.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
//           <Drawer.Trigger asChild>
//             <IconButton variant="outline" size="sm">
//               <MdOutlineMenu />
//             </IconButton>
//           </Drawer.Trigger>
//           <Portal>
//             <Drawer.Backdrop />
//             <Drawer.Positioner>
//               <Drawer.Content>
//                 <Drawer.Header>
//                   <Drawer.Title>
//                     <Flex mt={4} >


//                       <LogButton />
//                       <Button size={"sm"}
//                         as={Link} to="/tienda/cart"
//                         ml={2}
//                         onClick={() => setOpen(false)}>

//                         <FaShoppingCart style={{ marginRight: '8px' }} />
//                         Carrito
//                       </Button>
//                     </Flex>

//                     <Box mt={4}>Categorias</Box>
//                   </Drawer.Title>
//                 </Drawer.Header>
//                 <Drawer.Body>
//                   <VStack align="flex-start" gap={4}>
//                     <Heading size="sm">INSTRUMENTOS</Heading>
//                     <Link as={RouterLink} to="/tienda/violines">Violines Clásicos</Link>
//                     <Link as={RouterLink} to="/tienda/violoncellos">Violoncellos</Link>

//                     <Separator />

//                     <Heading size="sm">MANTENIMIENTO</Heading>
//                     <Link as={RouterLink} to="/tienda/accesorios">Cuerdas y Resinas</Link>
//                     <Link as={RouterLink} to="/tienda/taller">Ajuste de Almas</Link>
//                   </VStack>
//                 </Drawer.Body>

//                 <Drawer.CloseTrigger asChild>
//                   <CloseButton size="sm" />
//                 </Drawer.CloseTrigger>
//               </Drawer.Content>
//             </Drawer.Positioner>
//           </Portal>
//         </Drawer.Root>



//       </Box>

//       {/* DISEÑO PARA DESKTOP */}
//       <Container  display={{ base: 'none', md: 'block' }}>

//         <HStack spacing={4} justify="space-between" p={4} bg="white" shadow="sm">
//           <Button bg="transparent" as={RouterLink} to="/tienda" _hover={{ bg: 'transparent' }}>
//             <HStack>
//               <Image 
//               src="./src/assets/img/Logo_Color.png" 
//               boxSize="50px"
              
//               fit="cover" />
//               <Heading size="md" display={{ base: "none", md: "block" }} color={'black'}>JuegaCuerdas</Heading>
//             </HStack>


//           </Button>

//           <InputGroup flex="1" maxW="400px" display={{ base: "none", md: "flex" }}>
//             <Input placeholder="Buscar accesorios..." />
//           </InputGroup>

//           <HStack spacing={6}>
//             {/* Tu contador de carrito */}
//             <Link as={RouterLink} to="/tienda/cart">
//               <Box position="relative">
//                 <FaShoppingCart size="20px" />
//                 {/* {cartCount > 0 && <Badge colorPalette="orange" position="absolute" top="-2" right="-2">{cartCount}</Badge>} */}
//               </Box>
//             </Link>

//             <LogButton /> 
//           </HStack>
//         </HStack>
//       </Container>


//     </>
//   )


// }

// export default Navbar










import { 
  Badge, Box, Button, CloseButton, Container, Drawer, Flex, 
  Heading, HStack, IconButton, Image, Input, InputGroup, 
  Portal, Separator, Spacer, VStack, Text 
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaShoppingCart, FaMusic, FaTools, FaHome } from 'react-icons/fa'
import { MdOutlineMenu } from 'react-icons/md'
import { Link, Link as RouterLink } from 'react-router-dom'
import LogButton from './LogButton'

const Navbar = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* --- DISEÑO PARA MÓVILES --- */}
      <Box display={{ base: 'block', md: 'none' }} bg="white" borderBottomWidth="1px" position="sticky" top="0" zIndex="10">
        <Flex align="center" justify="space-between" px={4} py={2}>
          
          {/* Logo a la izquierda */}
          <HStack as={RouterLink} to="/tienda" gap={2}>
            <Image src="/Logo_Color.png" boxSize="50px" fit="contain" />
            <Heading size="s" fontWeight="black" color="orange.600">JuegaCuerdas</Heading>
          </HStack>

          <HStack gap={3}>
            {/* Carrito siempre visible */}
            <IconButton as={RouterLink} to="/tienda/cart" variant="ghost" size="md" aria-label="Carrito">
              <FaShoppingCart />
              {/* Aquí podrías poner un mini Badge si tienes cartCount */}
            </IconButton>

            {/* Trigger del Menú */}
            <Drawer.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
              <Drawer.Trigger asChild>
                <IconButton variant="outline" colorPalette="orange" size="md">
                  <MdOutlineMenu />
                </IconButton>
              </Drawer.Trigger>
              <Portal>
                <Drawer.Backdrop />
                <Drawer.Positioner>
                  <Drawer.Content borderRadius="l3">
                    <Drawer.Header borderBottomWidth="1px" py={6}>
                      <Drawer.Title>
                        <VStack align="center" gap={2}>
                          <Image src="./src/assets/img/Logo_Color.png" boxSize="60px" />
                          <Text fontWeight="black" fontSize="xl">Menú Principal</Text>
                        </VStack>
                      </Drawer.Title>
                    </Drawer.Header>

                    <Drawer.Body py={6}>
                      <VStack align="flex-start" gap={6}>
                        {/* Secciones con Iconos */}
                        <VStack align="flex-start" w="full" gap={3}>
                          <HStack color="orange.600"><FaMusic /><Heading size="sm">INSTRUMENTOS</Heading></HStack>
                          <VStack align="flex-start" pl={6} gap={2} fontSize="lg">
                            <ChakraLink_ as={RouterLink} to="/tienda/violines" onClick={() => setOpen(false)}>Violines Clásicos</ChakraLink_>
                            <ChakraLink_ as={RouterLink} to="/tienda/violoncellos" onClick={() => setOpen(false)}>Violoncellos</ChakraLink_>
                          </VStack>
                        </VStack>

                        <Separator />

                        <VStack align="flex-start" w="full" gap={3}>
                          <HStack color="orange.600"><FaTools /><Heading size="sm">MANTENIMIENTO</Heading></HStack>
                          <VStack align="flex-start" pl={6} gap={2} fontSize="lg">
                            <ChakraLink_ as={RouterLink} to="/tienda/accesorios" onClick={() => setOpen(false)}>Cuerdas y Resinas</ChakraLink_>
                            <ChakraLink_ as={RouterLink} to="/tienda/taller" onClick={() => setOpen(false)}>Ajuste de Almas</ChakraLink_>
                          </VStack>
                        </VStack>
                      </VStack>
                    </Drawer.Body>

                    <Drawer.Footer borderTopWidth="1px" flexDirection="column" gap={3}>
                        <LogButton />
                        <Text fontSize="xs" color="gray.500">Santiago, Chile</Text>
                    </Drawer.Footer>

                    <Drawer.CloseTrigger asChild>
                      <CloseButton size="md" position="absolute" top="2" right="2" />
                    </Drawer.CloseTrigger>
                  </Drawer.Content>
                </Drawer.Positioner>
              </Portal>
            </Drawer.Root>
          </HStack>
        </Flex>
      </Box>

      {/* --- DISEÑO PARA DESKTOP --- */}
      <Box display={{ base: 'none', md: 'block' }} bg="white" shadow="sm" position="sticky" top="0" zIndex="10">
        <Container maxW="container.xl">
          <HStack spacing={4} justify="space-between" p={4}>
            <Button bg="transparent" as={RouterLink} to="/tienda" _hover={{ bg: 'transparent' }}>
              <HStack>
                <Image src="./src/assets/img/Logo_Color.png" boxSize="50px" fit="cover" />
                <Heading size="md" color={'black'}>JuegaCuerdas</Heading>
              </HStack>
            </Button>

            <InputGroup flex="1" maxW="400px">
              <Input placeholder="¿Qué accesorio buscas hoy?" borderRadius="full" />
            </InputGroup>

            <HStack spacing={6}>
              <Link as={RouterLink} to="/tienda/cart">
                <Box position="relative" _hover={{ color: "orange.500" }} transition="all 0.2s">
                  <FaShoppingCart size="22px" />
                </Box>
              </Link>
              <LogButton /> 
            </HStack>
          </HStack>
        </Container>
      </Box>
    </>
  )
}

// Componente auxiliar para links del Drawer
const ChakraLink_ = ({ children, ...props }) => (
    <Text as={Link} {...props} _hover={{ color: "orange.500", pl: 2 }} transition="all 0.2s" w="full">
        {children}
    </Text>
)

export default Navbar