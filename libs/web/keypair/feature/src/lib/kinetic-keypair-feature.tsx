import { Box, Stack, Text } from '@chakra-ui/react';
import { WebKeypairUiCard } from '@kin-laboratory/web/keypair/ui';
import { WebUiButton } from '@kin-laboratory/web/ui/button';
import { WebUiCard } from '@kin-laboratory/web/ui/card';
import { WebUiPage } from '@kin-laboratory/web/ui/page';
// import { Keypair, SimpleKeypair } from '@kin-sdk/client';
import { Keypair } from '@kin-kinetic/keypair';

import { useEffect, useState } from 'react';

export function KineticKeypairFeature() {
  const [keypair, setKeypair] = useState<Keypair | null>();

  function addToSessionStorage(kp: Keypair) {
    const kpsString = sessionStorage.getItem('keyPairs') || '';

    let kps: Keypair[] = kpsString ? JSON.parse(kpsString) : [];
    kps = [kp, ...kps];

    sessionStorage.setItem('keyPairs', JSON.stringify(kps));
  }

  function generate() {
    setKeypair(null);
    const mnemonic = Keypair.generateMnemonic();
    console.log('🚀 ~ mnemonic', mnemonic);
    const kp = Keypair.fromSecret(mnemonic);
    console.log('🚀 ~ kp', kp);
    addToSessionStorage(kp);
    setKeypair(kp);
  }

  const [keypairs, setKeypairs] = useState<Keypair[] | null>(null);
  useEffect(() => {
    const kps = sessionStorage.getItem('keyPairs') || '';

    if (kps.length) {
      setKeypairs(JSON.parse(kps));
    }
  }, [keypair]);

  return (
    <Stack spacing={[6, 12]}>
      <WebUiPage
        title="Generate Kinetic Keypairs"
        subtitle={
          <Stack>
            <Text>
              These keypairs can be used on the Kin network where one is
              required. For example, it can be used as an account master key or
              to sign transactions for accounts.
            </Text>
            <Text>Make sure to keep your Private Keys safe!</Text>
          </Stack>
        }
      >
        <Stack spacing={6}>
          <WebUiButton size="lg" onClick={generate} label="Generate" />
          {keypairs?.map((kp) => (
            <Box key={kp.publicKey}>
              <WebUiCard>
                <Stack spacing={6}>
                  <WebKeypairUiCard kp={kp} />
                </Stack>
              </WebUiCard>
            </Box>
          ))}
        </Stack>
      </WebUiPage>
    </Stack>
  );
}
