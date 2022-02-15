import { useState } from 'react';
import { SimpleKeypair } from '@kin-sdk/client';

import { Keypair } from '@kin-laboratory/keypair';

import { WebUiButton } from '@kin-laboratory/web/ui/button';
import { WebUiCard } from '@kin-laboratory/web/ui/card';
import { WebUiPage } from '@kin-laboratory/web/ui/page';

interface ConvertStellarKey {
  stellarSecret: string;
  onSuccess?: (solanaKeyPair: Keypair) => void;
  onFailure?: (error: string) => void;
}

function convertStellarKey({
  stellarSecret,
  onSuccess,
  onFailure,
}: ConvertStellarKey) {
  let solanaKeyPair;
  try {
    solanaKeyPair = Keypair.fromStellarKeypair(stellarSecret);
  } catch (error) {
    console.log('🚀 ~ error', error);
    if (onFailure) {
      onFailure(`${error}`);
    }
  }

  console.log(stellarSecret);
  if (onSuccess && solanaKeyPair) {
    onSuccess(solanaKeyPair);
  }
}

export interface WebLegacyFeatureProps {}

export function KeyPair({ kp }: { kp: SimpleKeypair }) {
  return (
    <div>
      <div className="text-sm leading-6 font-medium text-gray-700">
        Private Key : {kp.secret}
      </div>
      <div className="text-sm leading-6 font-medium text-gray-700">
        Public Key : {kp.publicKey}
      </div>
    </div>
  );
}

export function StellarConversionCard() {
  const [stellarSecret, setStellarSecret] = useState('');
  const [error, setError] = useState('');
  const [showByteArray, setShowByteArray] = useState(false);
  console.log('🚀 ~ error', error);
  const [solanaKeypair, setSolanaKeypair] = useState<Keypair | null>(null);
  console.log('🚀 ~ solanaKeypair', solanaKeypair);
  const showByteArrayButton = (
    <WebUiButton
      disabled={!solanaKeypair}
      onClick={() => {
        setShowByteArray((ba) => !ba);
      }}
      label={(showByteArray ? 'Hide' : 'Show') + ' Byte Array'}
    />
  );
  const convertStellarButton = (
    <WebUiButton
      disabled={!stellarSecret}
      onClick={() => {
        setError('');
        stellarSecret &&
          convertStellarKey({
            stellarSecret,
            onSuccess: (kp) => setSolanaKeypair(kp),
            onFailure: (error) => setError(error),
          });
      }}
      label="Convert"
    />
  );
  return (
    <div className="flex flex-col space-y-4">
      <div>
        <label
          htmlFor="stellarKey"
          className="block text-sm font-medium text-gray-700"
        >
          Stellar Seed
        </label>
        <div className="mt-1">
          <input
            value={stellarSecret}
            onChange={(e) => setStellarSecret(e.target?.value)}
            type="text"
            name="stellarKey"
            id="stellarKey"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="e.g. SAV76USXIJOBMEQXPANUOQM6F5LIOTLPDIDVRJBFFE2MDJXG24TAPUU7"
          />
        </div>
      </div>

      <div className="flex space-x-2">
        {convertStellarButton} {showByteArrayButton}
      </div>

      {solanaKeypair && !error ? (
        <div>
          <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
            {JSON.stringify(
              {
                publicKey: solanaKeypair.publicKey,
                secretKey: solanaKeypair.secretKey,
              },
              null,
              2
            )}
          </pre>
          {showByteArray && (
            <div>
              <pre>byteArray:</pre>
              <textarea
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                rows={2}
                readOnly
                value={'[' + solanaKeypair?.solanaSecretKey?.join(', ') + ']'}
              />
            </div>
          )}
        </div>
      ) : null}

      {error ? (
        <div className="text-sm font-medium text-red-700">
          <span>{error}</span>
        </div>
      ) : null}
    </div>
  );
}

export function WebLegacyFeature(props: WebLegacyFeatureProps) {
  return (
    <WebUiPage>
      <h1>
        <span className="mt-2 block text-3xl text-left leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Convert Stellar Seed to Solana
        </span>
      </h1>
      <div className="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto">
        <div className="flex flex-col space-y-6">
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
        </div>
      </div>

      <br />

      <WebUiCard>
        <StellarConversionCard />
      </WebUiCard>
    </WebUiPage>
  );
}

export default WebLegacyFeature;
