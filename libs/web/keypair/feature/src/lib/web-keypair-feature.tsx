import { WebUiButton } from '@kin-laboratory/web/ui/button';
import { WebUiCard } from '@kin-laboratory/web/ui/card';
import { WebUiPage } from '@kin-laboratory/web/ui/page';
import { Keypair, SimpleKeypair } from '@kin-sdk/client';
import { useState, useEffect } from 'react';

export interface WebKeypairFeatureProps {}

export function WebKeypairFeature(props: WebKeypairFeatureProps) {
  const [keyPair, setKeyPair] = useState<SimpleKeypair>();

  function addToSessionStorage(kp: SimpleKeypair) {
    const kpsString = sessionStorage.getItem('keyPairs') || '';

    let kps: SimpleKeypair[] = kpsString ? JSON.parse(kpsString) : [];
    kps = [kp, ...kps];

    sessionStorage.setItem('keyPairs', JSON.stringify(kps));
  }

  function generate() {
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

  const showKeyPair = (kp: SimpleKeypair) => (
    <div>
      <div>Private Key : {kp.secret}</div>
      <div>Public Key : {kp.publicKey}</div>
    </div>
  );

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
      <WebUiCard>
        <div className="flex flex-col space-y-6">
          <div>
            <WebUiButton onClick={generate} label="Generate" />
          </div>
          {sessionStorageKeypairs && sessionStorageKeypairs[0]
            ? showKeyPair(sessionStorageKeypairs[0])
            : undefined}
        </div>
      </WebUiCard>

      {sessionStorageKeypairs?.slice(1).map((kp) => {
        return (
          <>
            <br />
            <WebUiCard>{showKeyPair(kp)}</WebUiCard>
          </>
        );
      })}
    </WebUiPage>
  );
}

export default WebKeypairFeature;
