import { Box, Container, Flex } from '@chakra-ui/react';
import React, { PropsWithChildren, ReactNode, Suspense } from 'react';
import { WebUiLayoutFooter } from './web-ui-layout-footer';
import { WebUiLayoutHeader, WebUiLink } from './web-ui-layout-header';

export function WebUiLayout({
  children,
  copyright,
  links,
  name,
}: PropsWithChildren<{
  copyright: ReactNode;
  links: WebUiLink[];
  name: string;
}>) {
  return (
    <Flex direction="column" h="full">
      <WebUiLayoutHeader name={name} links={links} />
      <Flex direction="column" grow={1} px={[0, 4]} py={[4, 8]}>
        <Suspense fallback={<Box>Loading...</Box>}>
          <Container maxW="container.xl" h="full">
            {children}
          </Container>
        </Suspense>
      </Flex>
      <WebUiLayoutFooter copyright={copyright} />
    </Flex>
  );
}
