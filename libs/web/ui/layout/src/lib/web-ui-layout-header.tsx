import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Collapse,
  Flex,
  Heading,
  IconButton,
  Stack,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';

import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { WebUiHeaderLinks } from './web-ui-header-links';
import { WebUiHeaderLinksMobile } from './web-ui-header-links-mobile';
import { WebUiLayoutThemeToggle } from './web-ui-layout-theme-toggle';
import { WebUiLinks } from './web-ui-link';

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
            <RouterLink className="homeLink" to="/">
              <Avatar
                className="homeLogo"
                src={'/assets/kin-name-logo.svg'}
                bg="inherit"
                size="sm"
              />
            </RouterLink>
            <Heading size="md" display={{ base: 'none', md: 'block' }}>
              <RouterLink to="/">{name}</RouterLink>
            </Heading>
            <Flex display={{ base: 'none', md: 'flex' }}>
              <WebUiHeaderLinks links={links} />
            </Flex>
          </Stack>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={{ base: 2, md: 6 }}
        >
          <WebUiLayoutThemeToggle />
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <WebUiHeaderLinksMobile links={links} />
      </Collapse>
    </Box>
  );
}
