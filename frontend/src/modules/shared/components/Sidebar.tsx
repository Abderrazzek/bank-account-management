import React, { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FiFolder, FiDollarSign, FiFolderMinus, FiMenu } from "react-icons/fi";
import { IconType } from "react-icons";
import { ReactText } from "react";

interface LinkItemProps {
  to: string;
  name: string;
  icon: IconType;
}
const LinkItems: Array<LinkItemProps> = [
  { to: "/accounts", name: "Accounts", icon: FiFolder },
  { to: "/fund-transfer", name: "Fund Transfer", icon: FiDollarSign },
  {
    to: "/deleted-accounts",
    name: "Deleted Accounts",
    icon: FiFolderMinus,
  },
];

export default function SidebarWithHeader({
  children,
}: {
  children: ReactNode;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
        location={location}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} location={location} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
  location: any;
}

const SidebarContent = ({ onClose, location, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Space Bank
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          to={link.to}
          selected={location.pathname.startsWith(link.to)}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  to: string;
  icon: IconType;
  selected?: boolean;
  children: ReactText;
}
const NavItem = ({ to, icon, children, selected, ...rest }: NavItemProps) => {
  return (
    <Link
      href={to}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.600",
          color: "white",
        }}
        bg={selected ? "cyan.400" : "transparent"}
        color={selected ? "White" : "inherit"}
        {...rest}
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
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const location = useLocation();
  const isTabletOrLarger = useBreakpointValue({ base: false, md: true });
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-start" }}
      {...rest}
    >
      {isTabletOrLarger && (
        <Flex alignItems="center" px="4" py="2">
          <Breadcrumb separator="›" fontSize="sm" fontWeight="semibold">
            {location.pathname
              .split("/")
              .map((path: string, index: number, array: any) => {
                const route = array.slice(0, index + 1).join("/");
                const linkItem = LinkItems.find((item) => item.to === route);
                if (!linkItem) return null;
                return (
                  <BreadcrumbItem key={index}>
                    <BreadcrumbLink href={route}>
                      {linkItem.name}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                );
              })}
          </Breadcrumb>
        </Flex>
      )}
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Space Bank
      </Text>
    </Flex>
  );
};
