import { Stack, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { WebUiHeaderLinkMobile } from './web-ui-header-link-mobile';
import { WebUiLinks } from './web-ui-link';

export function WebUiHeaderLinksMobile({ links }: { links: WebUiLinks }) {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}
    >
      {links.map((link) => (
        <WebUiHeaderLinkMobile key={link.label} {...link} />
      ))}
    </Stack>
  );
}
