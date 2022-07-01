import { useColorModeValue } from '@chakra-ui/react';
import { Card, CardBody, CardHeader, CardTitle } from '@saas-ui/react';
import { PropsWithChildren } from 'react';

export interface WebUiCardProps {
  title?: string;
}

export function WebUiCard({
  children,
  title,
}: PropsWithChildren<WebUiCardProps>) {
  return (
    <Card bg={useColorModeValue('gray.100', 'gray.900')}>
      {title && (
        <CardHeader>
          <CardTitle fontSize="xl">{title}</CardTitle>
        </CardHeader>
      )}
      <CardBody>{children}</CardBody>
    </Card>
  );
}
