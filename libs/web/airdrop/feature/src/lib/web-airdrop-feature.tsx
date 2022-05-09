import { WebUiButton } from '@kin-laboratory/web/ui/button';
import { WebUiCard } from '@kin-laboratory/web/ui/card';
import { WebUiPage } from '@kin-laboratory/web/ui/page';
import { WebUiPre } from '@kin-laboratory/web/ui/pre';
import { SimpleKeypair } from '@kin-sdk/client';
import { KinAccountBalance } from '@kin-sdk/client/src/lib/agora/kin-agora-client';
import { useState, useEffect } from 'react';

import {
  airdrop,
  createTokenAccountFromSessionKeypair,
  createTokenAccountFromSecret,
  getBalances,
  openExplorer,
} from '../helpers';

export interface WebAirdropFeatureProps {}

export function AirdropCard({
  fixedPublicKey,
  sessionStorageKeypairs,
}: {
  fixedPublicKey?: string;
  sessionStorageKeypairs: SimpleKeypair[];
}) {
  const [amount, setAmount] = useState<string>('50000');
  const [balances, setBalances] = useState<KinAccountBalance[]>();
  const [balanceNull, setBalanceNull] = useState(false);
  const [publicKey, setPublicKey] = useState<string>(fixedPublicKey || '');
  const [privateKey, setPrivateKey] = useState<string>('');
  const [dropping, setDropping] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setBalances([]);
  }, [fixedPublicKey]);

  const airdropButton = (
    <WebUiButton
      onClick={() =>
        publicKey &&
        airdrop({
          publicKey,
          setDropping,
          setError,
          amount,
          sessionStorageKeypairs,
          setBalances,
          setBalanceNull,
        })
      }
      label="Airdrop"
      disabled={!publicKey || !amount || dropping}
    />
  );

  const createAccountButton = (
    <WebUiButton
      disabled={!publicKey || dropping}
      onClick={() =>
        publicKey &&
        createTokenAccountFromSessionKeypair({
          publicKey,
          setDropping,
          setError,
          sessionStorageKeypairs,
          setBalances,
          setBalanceNull,
        })
      }
      label="Create Account"
    />
  );

  const createTokenAccountButton = (
    <WebUiButton
      disabled={!privateKey || dropping}
      onClick={() =>
        privateKey &&
        createTokenAccountFromSecret({
          publicKey,
          privateKey,
          setDropping,
          setError,
          setBalances,
          setBalanceNull,
          setPrivateKey,
        })
      }
      label="Create Token Account"
    />
  );

  const balancesButton = (
    <WebUiButton
      disabled={!publicKey}
      onClick={() =>
        publicKey && getBalances({ publicKey, setBalances, setBalanceNull })
      }
      label="Get Balances"
    />
  );

  const seeAccountButton = (
    <WebUiButton
      disabled={!publicKey}
      onClick={() => publicKey && openExplorer({ publicKey })}
      label="See Account in Explorer"
    />
  );

  return (
    <div className="flex flex-col space-y-4">
      {!fixedPublicKey ? (
        <div>
          <label
            htmlFor="publicKey"
            className="block text-sm font-medium text-gray-700"
          >
            Public Key
          </label>
          <div className="mt-1">
            <input
              value={publicKey}
              onChange={(e) => setPublicKey(e.target?.value)}
              type="text"
              name="publicKey"
              id="publicKey"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="e.g. Don8L4DTVrUrRAcVTsFoCRqei5Mokde3CV3K9Ut4nAGZ"
            />
          </div>
        </div>
      ) : null}

      {!fixedPublicKey ? null : (
        <div className="flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0">
          {createAccountButton}
          {airdropButton}
          {balancesButton}
          {seeAccountButton}
        </div>
      )}

      <div>
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700"
        >
          {fixedPublicKey ? 'Airdrop amount' : 'Amount'}
        </label>
        <div className="mt-1">
          <input
            value={amount}
            onChange={(e) => setAmount(e.target?.value?.toString())}
            type="number"
            min={1}
            max={50000}
            name="amount"
            id="amount"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="50000"
          />
        </div>
      </div>

      {fixedPublicKey ? null : (
        <div className="flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0">
          {airdropButton}
          {balancesButton}
          {seeAccountButton}
        </div>
      )}

      {balanceNull === true && error ? (
        <div className="text-sm font-medium text-red-700">{error}</div>
      ) : null}
      {balanceNull === true && !error ? (
        <div className="text-sm font-medium text-red-700">{`We can't find that account`}</div>
      ) : null}
      {!balanceNull && balances?.length ? (
        <WebUiPre>{JSON.stringify(balances, null, 2)}</WebUiPre>
      ) : null}

      {error.includes('Kin Token Account') ? (
        <>
          <div>
            <label
              htmlFor="publicKey"
              className="block text-sm font-medium text-gray-700"
            >
              Private Key
            </label>
            <input
              value={privateKey}
              onChange={(e) => setPrivateKey(e.target?.value)}
              type="text"
              name="privateKey"
              id="privateKey"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="e.g. SCBKUFYAJJOEWON3Y2TMBKTM7ANKNYQ2IZW5TBGKQXULYC62XABSNTYX"
            />
          </div>

          <div>
            <div className="mt-0 prose prose-indigo prose-lg text-gray-500 mx-auto">
              <p>
                If your private key is in the wrong format, why not try our
                'Legacy' options to try converting it?
              </p>
              <p>
                If you still can't get the airdrop to work, please let us know
                in the{' '}
                <a
                  href="https://discord.com/channels/808859554997469244/934134681237073980"
                  target="_blank"
                  rel="noreferrer"
                >
                  kin-laboratory
                </a>{' '}
                channel on{' '}
                <a
                  href="https://discord.gg/kdRyUNmHDn"
                  target="_blank"
                  rel="noreferrer"
                >
                  Discord
                </a>
                .
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0">
            {createTokenAccountButton}
          </div>
        </>
      ) : null}
    </div>
  );
}

export function WebAirdropFeature(props: WebAirdropFeatureProps) {
  const [sessionStorageKeypairs, setSessionStorageKeypairs] = useState<
    SimpleKeypair[] | []
  >([]);

  useEffect(() => {
    const kps = sessionStorage.getItem('keyPairs') || '';

    if (kps.length) {
      setSessionStorageKeypairs(JSON.parse(kps));
    }
  }, []);

  return (
    <WebUiPage>
      <h1>
        <span className="mt-2 block text-3xl text-left leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Airdrop Some Kin
        </span>
      </h1>
      <div className="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto">
        <p>
          Once you have some Kin in your account, you can use it for testing
          your Application. This only works on the Kin Test Net.
        </p>
      </div>

      <br />
      <WebUiCard>
        <AirdropCard sessionStorageKeypairs={sessionStorageKeypairs} />{' '}
      </WebUiCard>
    </WebUiPage>
  );
}

export default WebAirdropFeature;
