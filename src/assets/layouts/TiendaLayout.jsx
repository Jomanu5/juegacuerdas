import { Box, Grid, GridItem, Flex, Button } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SidebarTienda from "./SidebarTienda";

const TiendaLayout = () => {
  return (
    <Grid

      templateAreas={{
        base: `"header"
                "main"
                "footer"`,
        md: `"header header"
                "nav main"
                "footer footer"`,
      }}
    
     

      gridTemplateColumns={{
        base: '1fr',
        md: '230px 1fr',}}
      gridTemplateRows={'70px 1fr auto'}
      minH="100vh"
      gap="0"
    >
      {/* NAVBAR */}
      <GridItem area={'header'} borderBottomWidth="1px">
        <Navbar />
      </GridItem>

      {/* SIDEBAR - Se oculta en móviles */}
      <GridItem area={'nav'} display={{ base: "none", md: "block" }} borderRightWidth="1px" bg="gray.50">
        <SidebarTienda />
      </GridItem>

      {/* CONTENIDO DINÁMICO */}
      <GridItem area={'main'} p="6">
        
          <Outlet /> {/* Aquí aparecerá el Home, Tienda, etc. */}
        
      </GridItem>

      {/* FOOTER */}
      <GridItem area={'footer'} borderTopWidth="1px" py="4">
        <Footer />
      </GridItem>
    </Grid>
  );
};

export default TiendaLayout;