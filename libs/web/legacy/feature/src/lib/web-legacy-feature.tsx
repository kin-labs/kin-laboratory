import { Stack } from '@chakra-ui/react';
import { WebLegacyUiConversionCard } from '@kin-laboratory/web/legacy/ui';
import { WebUiCard } from '@kin-laboratory/web/ui/card';
import { WebUiPage } from '@kin-laboratory/web/ui/page';

export function WebLegacyFeature() {
  return (
    <WebUiPage
      title="Convert Stellar Seed to Solana"
      subtitle={
        <Stack spacing={6}>
          <p>
            For users with a Stellar generated private key that you'd like to
            convert to work with other wallets on Solana.
          </p>
          <p>
            You will be able to import the generated <code>secretKey</code> into{' '}
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
        <WebLegacyUiConversionCard />
      </WebUiCard>
    </WebUiPage>
  );
}
