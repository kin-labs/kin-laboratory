import { Box, Stack, Text } from '@chakra-ui/react';
import {
  WebKeypairUiCard,
  WebKeypairUiConversionCard,
  WebKeypairUiConversionTrustWalletCard,
} from '@kin-laboratory/web/keypair/ui';
import { WebUiButton } from '@kin-laboratory/web/ui/button';
import { WebUiCard } from '@kin-laboratory/web/ui/card';
import { WebUiPage } from '@kin-laboratory/web/ui/page';
import { Keypair, SimpleKeypair } from '@kin-sdk/client';
import { useEffect, useState } from 'react';

export function WebKeypairFeature() {
  const [keyPair, setKeyPair] = useState<SimpleKeypair | null>();

  function addToSessionStorage(kp: SimpleKeypair) {
    const kpsString = sessionStorage.getItem('keyPairs') || '';

    let kps: SimpleKeypair[] = kpsString ? JSON.parse(kpsString) : [];
    kps = [kp, ...kps];

    sessionStorage.setItem('keyPairs', JSON.stringify(kps));
  }

  function generate() {
    setKeyPair(null);
    const kp = Keypair.randomKeys();
    addToSessionStorage(kp);
    setKeyPair(kp);
  }

  const [keypairs, setKeypairs] = useState<SimpleKeypair[] | null>(null);
  useEffect(() => {
    const kps = sessionStorage.getItem('keyPairs') || '';

    if (kps.length) {
      setKeypairs(JSON.parse(kps));
    }
  }, [keyPair]);

  return (
    <Stack spacing={[6, 12]}>
      <WebUiPage
        title="Generate Keypairs"
        subtitle={
          <Stack>
            <Text>
              These keypairs are legacy Stellar keypairs and shouldn't be used
              with Kinetic SDKs.
            </Text>
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
      <WebUiPage
        title="Convert Stellar Seed to Solana"
        subtitle={
          <Stack spacing={6}>
            <p>
              For users with a Stellar generated private key that you'd like to
              convert to work with other wallets on Solana.
            </p>
            <p>
              You will be able to import the generated <code>secretKey</code>{' '}
              into{' '}
              <a href="https://phantom.app" target="_blank" rel="noreferrer">
                Phantom
              </a>
              . Other Solana apps might require the secret key formatted in a{' '}
              <code>byteArray</code>.
            </p>
            <p>Make sure to keep your Private Keys safe!</p>
          </Stack>
        }
      >
        <WebUiCard>
          <WebKeypairUiConversionCard />
        </WebUiCard>
      </WebUiPage>
      <WebUiPage
        title="Convert Trust Wallet Stellar Kin to Solana"
        subtitle={
          <Stack spacing={6}>
            <p>
              For Trust Wallet users who want to move their Kin from a legacy
              Stellar account to a Solana account.
            </p>
            <p>Input your Trust Wallet mnemonic to complete the conversion.</p>
            <p>
              You can use the generated private key to create a new Solana
              wallet on Trust Wallet containing your Kin.
            </p>
            <p>Make sure to keep your Private Keys safe!</p>
          </Stack>
        }
      >
        <WebUiCard>
          <WebKeypairUiConversionTrustWalletCard />
        </WebUiCard>
      </WebUiPage>
    </Stack>
  );
}
