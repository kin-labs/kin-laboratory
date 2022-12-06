import { useState } from 'react';
import { Code, Heading, Stack } from '@chakra-ui/react';
import { WebAirdropUiCard } from '@kin-laboratory/web/airdrop/ui';
import { ButtonGroup } from '@saas-ui/react';

import { WebUiButton } from '@kin-laboratory/web/ui/button';
import { Keypair } from '@kin-kinetic/keypair';
import { decode } from 'bs58';

export function WebKeypairUiCard({ kp }: { kp: Keypair }) {
  const [showSecrets, setShowSecrets] = useState(false);
  return (
    <Stack spacing={{ base: 2, md: 6 }}>
      <Heading size={{ base: 'base', md: 'md' }}>Mnemonic</Heading>
      <Code colorScheme="primary" size={{ base: 'xs', md: 'sm' }}>
        {kp.mnemonic}
      </Code>
      <Heading size={{ base: 'base', md: 'md' }}>Public Key</Heading>
      <Code colorScheme="primary" size={{ base: 'xs', md: 'sm' }}>
        {kp.publicKey}
      </Code>
      <ButtonGroup>
        <WebUiButton
          label={'Show Secret Key / Byte Array?'}
          onClick={() => setShowSecrets(!showSecrets)}
        />
      </ButtonGroup>

      {showSecrets ? (
        <>
          <Heading size={{ base: 'base', md: 'md' }}>Secret Key</Heading>
          <Code colorScheme="primary" size={{ base: 'xs', md: 'sm' }}>
            {kp.secretKey}
          </Code>
          <Heading size={{ base: 'base', md: 'md' }}>Byte Array</Heading>
          <Code colorScheme="primary" size={{ base: 'xs', md: 'sm' }}>
            {`[${decode(kp.secretKey ?? '').join(',')}]`}
          </Code>
        </>
      ) : null}
      <Heading size={{ base: 'base', md: 'md' }}>Devnet Actions</Heading>
      <WebAirdropUiCard keypairs={[kp]} fixedPublicKey={kp.publicKey} />
    </Stack>
  );
}
