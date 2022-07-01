import { Link, Stack, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { WebUiLayoutHeaderLink } from './web-ui-header-link';
import { WebUiLinks } from './web-ui-link';

export function WebUiHeaderLinks({ links }: { links: WebUiLinks }) {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('primary.600', 'primary.300');

  return (
    <Stack direction={'row'} spacing={{ base: 2, md: 2, lg: 4 }}>
      {links.map((link) => (
        <Link
          key={link.label}
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
            bg: useColorModeValue('primary.100', 'primary.800'),
          }}
        >
          {link.label}
        </Link>
      ))}
    </Stack>
  );
}
