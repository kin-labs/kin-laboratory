import { WebUiButton } from '@kin-laboratory/web/ui/button';
import { WebUiCard } from '@kin-laboratory/web/ui/card';
import { WebUiPage } from '@kin-laboratory/web/ui/page';
import { WebUiPre } from '@kin-laboratory/web/ui/pre';
import { SimpleKeypair } from '@kin-sdk/client';
import { KinAccountBalance } from '@kin-sdk/client/src/lib/agora/kin-agora-client';
import { useState, useEffect } from 'react';

import { airdrop, createAccount, getBalances, openExplorer } from '../helpers';

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
        createAccount({
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
      ): null}
      {balanceNull === true && !error ? (
        <div className="text-sm font-medium text-red-700">{`Can't find account. Sending an Airdrop will create your account if it doesn't already exist.`}</div>
      ) : null}
      {!balanceNull && balances?.length ? (
        <WebUiPre>{JSON.stringify(balances, null, 2)}</WebUiPre>
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
