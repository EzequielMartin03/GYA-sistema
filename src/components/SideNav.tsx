import React, { useState, useEffect, type ReactNode } from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  Skeleton,
  type BoxProps,
  type FlexProps,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
} from "react-icons/fi";
import type { IconType } from "react-icons";
import { NavLink as RouterLink } from "react-router-dom";
import { Image } from "@chakra-ui/react";
import logo from "/logo.png" ;

type Link = {
  uri: string;
  label: string;
  icon: IconType;
};

import {  FiUser, FiUsers, FiBookOpen } from "react-icons/fi";

const LinkItems: Link[] = [
  { uri: "/", label: "Dashboard", icon: FiHome },
  { uri: "/profesores", label: "Profesores", icon: FiUser },
  { uri: "/alumnos", label: "Alumnos", icon: FiUsers}, // 👨‍🎓 mejor si usás otro set
  { uri: "/cursos", label: "Cursos", icon: FiBookOpen },
];
const NavLink = ({
  icon,
  to,
  children,
  loading,
}: {
  children: ReactNode;
  icon: IconType;
  to: string;
  loading?: boolean;
}) => {
  if (loading) {
    // Skeleton para el link mientras carga
    return (
      <Skeleton height="40px" mx="4" my="2" borderRadius="md" />
    );
  }
  return (
    <Text style={{ textDecoration: "none" }}>
      <Flex
        as={RouterLink}
        to={to}
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Text>
  );
};

export default function SimpleSidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Simular carga
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // 1 segundo de "loading"
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose()}
        display={{ base: "none", md: "block" }}
        loading={loading}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} loading={loading} />
        </DrawerContent>
      </Drawer>
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {/* Content */}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
  loading?: boolean;
}

const SidebarContent = ({ onClose, loading, ...rest }: SidebarProps) => {
  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
  <Image src={logo} alt="G&A Group" />  {/* Logo */}
  <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
</Flex>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavLink
          key={link.uri}
          to={link.uri}
          icon={link.icon}
          loading={loading}
        >
          {link.label}
        </NavLink>
      ))}
    </Box>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        G&A Group
      </Text>
    </Flex>
  );
};
