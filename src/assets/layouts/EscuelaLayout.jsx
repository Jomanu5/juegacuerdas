import { Box, Grid, GridItem, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SidebarTienda from "./SidebarTienda";

const EscuelaLayout = () => {
  return (
    <Grid
      templateAreas={`"header header"
                      "nav main"
                      "footer footer"`}
      gridTemplateRows={'70px 1fr auto'}
      gridTemplateColumns={'250px 1fr'}
      minH="100vh"
      gap="0"
    >
      {/* NAVBAR */}
      <GridItem area={'header'} borderBottomWidth="1px">
        <Navbar />
      </GridItem>

      {/* SIDEBAR - Se oculta en móviles si lo deseas, aquí es fijo */}
      <GridItem area={'nav'} borderRightWidth="1px" bg="gray.50">
        <SidebarTienda />
      </GridItem>

      {/* CONTENIDO DINÁMICO */}
      <GridItem area={'main'} p="6">
        <Box as="section">
          <Outlet /> {/* Aquí aparecerá el Home, Tienda, etc. */}
        </Box>
      </GridItem>

      {/* FOOTER */}
      <GridItem area={'footer'} borderTopWidth="1px" py="4">
        <Footer />
      </GridItem>
    </Grid>
  );
};

export default EscuelaLayout;