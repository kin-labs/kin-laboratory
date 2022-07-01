import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  chakra,
  Collapse,
  Flex,
  Heading,
  IconButton,
  Link,
  Popover,
  PopoverTrigger,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';

import React from 'react';
import { Link as RouterLink, NavLink } from 'react-router-dom';
import { WebUiLayoutThemeToggle } from './web-ui-layout-theme-toggle';

export const WebUiLayoutHeaderLink = chakra(NavLink, {
  baseStyle: { p: 4, rounded: 'md' },
});

export type WebUiLinks = WebUiLink[];
export interface WebUiLink {
  label: string;
  path: string;
}

export function WebUiLayoutHeader({
  links,
  name,
}: {
  links: WebUiLinks;
  name: string;
}) {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box>
      <Flex
        h={16}
        bg={useColorModeValue('gray.100', 'gray.900')}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Stack
            w={'full'}
            direction="row"
            alignItems="center"
            justifyContent={{ base: 'center', md: 'start' }}
          >
            <RouterLink to="/">
              <Avatar src={'/assets/kin-logo.svg'} bg="inherit" size="sm" />
            </RouterLink>
            <Heading size="md" display={{ base: 'none', md: 'block' }}>
              <RouterLink to="/">{name}</RouterLink>
            </Heading>

            <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
              <DesktopNav links={links} />
            </Flex>
          </Stack>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}
        >
          <WebUiLayoutThemeToggle />
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = ({ links }: { links: WebUiLinks }) => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');

  return (
    <Stack direction={'row'} spacing={4}>
      {links.map((link) => (
        <Box key={link.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Link
                p={2}
                as={WebUiLayoutHeaderLink}
                to={link.path}
                fontWeight={500}
                color={linkColor}
                _activeLink={{
                  color: useColorModeValue('primary.600', 'primary.100'),
                  bg: useColorModeValue('primary.100', 'primary.800'),
                }}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}
              >
                {link.label}
              </Link>
            </PopoverTrigger>
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, href }: NavItem) => {
  return (
    <Flex
      py={2}
      as={Link}
      href={href ?? '#'}
      justify={'space-between'}
      align={'center'}
      _hover={{
        textDecoration: 'none',
      }}
    >
      <Text fontWeight={600} color={useColorModeValue('gray.600', 'gray.200')}>
        {label}
      </Text>
    </Flex>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Learn Design',
    href: '#',
  },
  {
    label: 'Hire Designers',
    href: '#',
  },
];
