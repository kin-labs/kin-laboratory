import { Box, Heading, Stack } from '@chakra-ui/react';
import { PropsWithChildren, ReactNode } from 'react';

export interface WebUiPageProps {
  title?: string;
  subtitle?: ReactNode;
}

export function WebUiPage({
  children,
  title,
  subtitle,
}: PropsWithChildren<WebUiPageProps>) {
  return (
    <Stack spacing={{ base: 2, md: 6 }}>
      <Stack spacing={2}>
        {title && <Heading size="lg">{title}</Heading>}
        {subtitle && <Box color="gray.500">{subtitle}</Box>}
      </Stack>
      {children}
    </Stack>
  );
}
