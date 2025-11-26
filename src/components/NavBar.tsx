import {
  Box,
  Flex,
  Avatar,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Stack,
  Center,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";

interface NavProps {
  onOpen: () => void;
}

export default function Nav({ onOpen }: NavProps) {
  return (
    <Box px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        {/* Hamburger solo en mobile */}
        <IconButton
          display={{ base: "inline-flex", md: "none" }}
          aria-label="Open Menu"
          icon={<FiMenu />}
          onClick={onOpen}
          mr={2}
        />

        <Text fontSize="xl" fontWeight="bold" display={{ base: "inline-flex", md: "none" }}>
          G&A Group
        </Text>

        {/* Avatar */}
        <Flex alignItems={"center"}>
          <Stack direction={"row"} spacing={7}>
            <Menu>
              <MenuButton as={Button} rounded={"full"} variant={"link"} cursor={"pointer"} minW={0}>
                <Avatar size={"sm"} src={"https://api.dicebear.com/6.x/initials/svg?seed=Juan%20Perez"} />
              </MenuButton>
              <MenuList alignItems={"center"}>
                <br />
                <Center>
                  <Avatar size={"2xl"} src={"https://api.dicebear.com/6.x/initials/svg?seed=Juan%20Perez"} />
                </Center>
                <br />
                <Center>
                  <p>Juan Perez</p>
                </Center>
                <br />
                <MenuDivider />
                <MenuItem>Cerrar Sesión</MenuItem>
              </MenuList>
            </Menu>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
}
