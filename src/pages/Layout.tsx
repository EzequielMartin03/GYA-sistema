import { Outlet } from "react-router-dom";
import SideNav from "../components/SideNav";
import { Grid, GridItem, useDisclosure } from "@chakra-ui/react";
import Nav from "../components/NavBar";

type Props = { children?: React.ReactNode };

function Layout({ children }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure(); // levantar el estado aquí

  return (
    <Grid
      templateAreas={{
        base: `"header" "main"`,
        md: `"nav header" "nav main"`,
      }}
      gridTemplateRows={{ base: "60px 1fr", md: "60px 1fr" }}
      gridTemplateColumns={{ base: "1fr", md: "250px 1fr" }}
      minH="100vh"
    >
      {/* Navbar siempre arriba */}
      <GridItem area="header" position="sticky" top="0" zIndex="1000" bg="white">
        <Nav onOpen={onOpen} />
      </GridItem>

      {/* Sidebar */}
      <GridItem area="nav" display={{ base: "none", md: "block" }}>
        <SideNav isOpen={isOpen} onClose={onClose} />
      </GridItem>

      {/* Main content */}
      <GridItem area="main" p="4" bg="gray.50">
        {children ?? <Outlet />}
      </GridItem>
    </Grid>
  );
}

export default Layout;
