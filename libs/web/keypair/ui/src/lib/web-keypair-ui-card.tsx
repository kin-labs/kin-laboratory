import { Code, Heading, Stack } from '@chakra-ui/react';
import { WebAirdropUiCard } from '@kin-laboratory/web/airdrop/ui';
import { Keypair } from '@kin-kinetic/keypair';

export function WebKeypairUiCard({ kp }: { kp: Keypair }) {
  console.log('🚀 ~ kp', kp);
  return (
    <Stack spacing={{ base: 2, md: 6 }}>
      <Heading size={{ base: 'base', md: 'md' }}>Public Key</Heading>
      <Code colorScheme="primary" size={{ base: 'xs', md: 'sm' }}>
        {kp.publicKey}
      </Code>
      <Heading size={{ base: 'base', md: 'md' }}>Mnemonic</Heading>
      <Code colorScheme="primary" size={{ base: 'xs', md: 'sm' }}>
        {kp.mnemonic}
      </Code>
      <Heading size={{ base: 'base', md: 'md' }}>Private Key</Heading>
      <Code colorScheme="primary" size={{ base: 'xs', md: 'sm' }}>
        {kp.secretKey}
      </Code>
      <Heading size={{ base: 'base', md: 'md' }}>Devnet Actions</Heading>
      <WebAirdropUiCard keypairs={[kp]} fixedPublicKey={kp.publicKey} />
    </Stack>
  );
}
