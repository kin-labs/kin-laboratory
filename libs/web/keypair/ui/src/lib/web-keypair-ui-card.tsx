import { Code, Heading, Stack } from '@chakra-ui/react';
import { WebAirdropUiCard } from '@kin-laboratory/web/airdrop/ui';
import { SimpleKeypair } from '@kin-sdk/client';

export function WebKeypairUiCard({ kp }: { kp: SimpleKeypair }) {
  return (
    <Stack spacing={{ base: 2, md: 6 }}>
      <Heading size={{ base: 'base', md: 'md' }}>Private Key</Heading>
      <Code colorScheme="primary" size={{ base: 'xs', md: 'sm' }}>
        {kp.secret}
      </Code>
      <Heading size={{ base: 'base', md: 'md' }}>Public Key</Heading>
      <Code colorScheme="primary" size={{ base: 'xs', md: 'sm' }}>
        {kp.publicKey}
      </Code>
      <Heading size={{ base: 'base', md: 'md' }}>Test Net Actions</Heading>
      <WebAirdropUiCard keypairs={[kp]} fixedPublicKey={kp.publicKey} />
    </Stack>
  );
}
