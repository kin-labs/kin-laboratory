import { useState, useEffect } from 'react';
import { Keypair, SimpleKeypair } from '@kin-sdk/client';

import { AirdropCard } from '@kin-laboratory/web/airdrop/feature';
import { WebUiButton } from '@kin-laboratory/web/ui/button';
import { WebUiCard } from '@kin-laboratory/web/ui/card';
import { WebUiPage } from '@kin-laboratory/web/ui/page';

export interface WebKeypairFeatureProps {}

export function KeyPair({ kp }: { kp: SimpleKeypair }) {
  return (
    <div>
      <div className="text-sm leading-6 font-medium text-gray-700">
        Private Key: <code className="text-sm">{kp.secret}</code>
      </div>
      <div className="text-sm leading-6 font-medium text-gray-700">
        Public Key: <code className="text-sm">{kp.publicKey}</code>
      </div>
      <div className="bg-white  pt-5 pb-3   ">
        <h3 className="text-sm leading-6 font-medium text-gray-700">
          Test Net Actions:
        </h3>
      </div>
      <AirdropCard
        sessionStorageKeypairs={[kp]}
        fixedPublicKey={kp.publicKey}
      />
    </div>
  );
}

export function WebKeypairFeature(props: WebKeypairFeatureProps) {
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

  const [sessionStorageKeypairs, setSessionStorageKeypairs] = useState<
    SimpleKeypair[] | null
  >(null);
  useEffect(() => {
    const kps = sessionStorage.getItem('keyPairs') || '';

    if (kps.length) {
      setSessionStorageKeypairs(JSON.parse(kps));
    }
  }, [keyPair]);

  return (
    <WebUiPage>
      <h1>
        <span className="mt-2 block text-3xl text-left leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Generate Keypairs
        </span>
      </h1>
      <div className="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto">
        <p>
          These keypairs can be used on the Kin network where one is required.
          For example, it can be used as an account master key or to sign
          transactions for accounts.
        </p>
        <p>Make sure to keep your Private Keys safe!</p>
      </div>

      <br />

      {sessionStorageKeypairs?.length ? (
        sessionStorageKeypairs.map((kp, index) => {
          return (
            <div key={kp.publicKey}>
              {index > 0 ? <br /> : null}
              <WebUiCard>
                <div className="flex flex-col space-y-6" key={kp.publicKey}>
                  {index === 0 ? (
                    <div>
                      <WebUiButton onClick={generate} label="Generate" />
                    </div>
                  ) : null}
                  <KeyPair kp={kp} />
                </div>
              </WebUiCard>
            </div>
          );
        })
      ) : (
        <WebUiCard>
          <div className="flex flex-col space-y-6">
            <div>
              <WebUiButton onClick={generate} label="Generate" />
            </div>
          </div>
        </WebUiCard>
      )}
    </WebUiPage>
  );
}

export default WebKeypairFeature;
