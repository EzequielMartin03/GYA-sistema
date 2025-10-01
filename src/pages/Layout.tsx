import { Outlet } from "react-router-dom";
import SideNav from "../components/SideNav";
import { Grid, GridItem } from "@chakra-ui/react";
import Nav from "../components/NavBar";

type Props = { children?: React.ReactNode };

function Layout({ children }: Props) {
  return (
    <Grid
      templateAreas={{
        base: `"main"`,
        md: `"nav header" "nav main"`,
      }}
      gridTemplateRows={{ base: "auto 1fr", md: "60px 1fr" }}
      gridTemplateColumns={{ base: "1fr", md: "250px 1fr" }}
      minH="100vh"
    >
      {/* Sidebar */}
      <GridItem area={"nav"} >
        <SideNav />
      </GridItem>

      {/* Navbar */}
      <GridItem area={"header"}  position="sticky" top="0" zIndex="1000" bg="white"  >
       <Nav />
      </GridItem>

      {/* Main */}
      <GridItem area={"main"} p="4" bg="gray.50">
        {children ?? <Outlet />}
      </GridItem>
    </Grid>
  );
}

export default Layout;
