import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

export function WebUiLayoutFooter({ copyright }: { copyright: ReactNode }) {
  return (
    <Box
      bg={useColorModeValue('gray.100', 'gray.900')}
      color={useColorModeValue('gray.600', 'gray.500')}
    >
      <Flex
        h={12}
        fontSize="sm"
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Flex alignItems={'center'}>
          <Box>{copyright}</Box>
        </Flex>
      </Flex>
    </Box>
  );
}
