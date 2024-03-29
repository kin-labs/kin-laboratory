import { Text } from '@chakra-ui/react';
import { WebAirdropUiCard } from '@kin-laboratory/web/airdrop/ui';
import { WebUiCard } from '@kin-laboratory/web/ui/card';
import { WebUiPage } from '@kin-laboratory/web/ui/page';
import { Keypair } from '@kin-kinetic/keypair';
import { useEffect, useState } from 'react';

export function WebAirdropFeature() {
  const [keypairs, setKeypairs] = useState<Keypair[] | []>([]);

  useEffect(() => {
    const kps = sessionStorage.getItem('keyPairs') || '';

    if (kps.length) {
      setKeypairs(JSON.parse(kps));
    }
  }, []);

  return (
    <WebUiPage
      title="Airdrop Some Kin"
      subtitle={
        <Text>
          Once you have some Kin in your account, you can use it for testing
          your Application. This only works on the Solana Devnet.
        </Text>
      }
    >
      <WebUiCard>
        <WebAirdropUiCard keypairs={keypairs} />{' '}
      </WebUiCard>
    </WebUiPage>
  );
}
