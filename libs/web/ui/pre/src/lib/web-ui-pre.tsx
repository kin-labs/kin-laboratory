import { Box } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

export interface WebUiPreProps {}

export function WebUiPre({ children }: PropsWithChildren<WebUiPreProps>) {
  return (
    <Box as="pre" fontSize="xs" color="gray.500" p={2} overflow="auto">
      {children}
    </Box>
  );
}

export default WebUiPre;
