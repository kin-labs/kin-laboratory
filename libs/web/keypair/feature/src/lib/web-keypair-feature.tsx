import { WebUiButton } from '@kin-laboratory/web/ui/button';
import { WebUiCard } from '@kin-laboratory/web/ui/card';
import { WebUiPage } from '@kin-laboratory/web/ui/page';
import { Keypair, SimpleKeypair } from '@kin-sdk/client';
import { useState } from 'react';

export interface WebKeypairFeatureProps {}

export function WebKeypairFeature(props: WebKeypairFeatureProps) {
  const [keypair, setKeypair] = useState<SimpleKeypair>();

  function generate() {
    const kp = Keypair.randomKeys();
    setKeypair(kp);
  }

  return (
    <WebUiPage>
      <WebUiCard>
        <div className="flex flex-col space-y-6">
          <div>
            <WebUiButton onClick={generate} label="Generate" />
          </div>
          {keypair ? (
            <div>
              <div>SecretKey: {keypair.secret}</div>
              <div>PublicKey: {keypair.publicKey}</div>
            </div>
          ) : undefined}
        </div>
      </WebUiCard>
    </WebUiPage>
  );
}

export default WebKeypairFeature;
