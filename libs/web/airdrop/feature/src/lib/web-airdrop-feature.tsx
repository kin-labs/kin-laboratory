import { WebUiButton } from '@kin-laboratory/web/ui/button';
import { WebUiCard } from '@kin-laboratory/web/ui/card';
import { WebUiPage } from '@kin-laboratory/web/ui/page';
import {
  KinClient,
  KinEnvironment,
  KinTest,
  SimpleKeypair,
} from '@kin-sdk/client';
import { KinAccountBalance } from '@kin-sdk/client/src/lib/agora/kin-agora-client';
import { useState, useEffect } from 'react';

export interface WebAirdropFeatureProps {}

const kin = new KinClient(KinTest);

export function getExplorerUrl(env: KinEnvironment, publicKey: string): string {
  const baseUrl = `https://explorer.solana.com/address/${publicKey}`;
  const validator = `https://local.validator.agorainfra.dev`;
  const params =
    env === KinEnvironment.Test ? `?cluster=custom&customUrl=${validator}` : '';

  const finalUrl = `${baseUrl}/tokens${params}`;
  console.log('🚀 ~ finalUrl', finalUrl);

  return finalUrl;
}

export function WebAirdropFeature(props: WebAirdropFeatureProps) {
  const [amount, setAmount] = useState<string>('50000');
  const [balances, setBalances] = useState<KinAccountBalance[]>();
  const [balanceNull, setBalanceNull] = useState(false);
  const [publicKey, setPublicKey] = useState<string>();
  const [dropping, setDropping] = useState<boolean>(false);

  const [sessionStorageKeypairs, setSessionStorageKeypairs] = useState<
    SimpleKeypair[] | null
  >(null);

  useEffect(() => {
    const kps = sessionStorage.getItem('keyPairs') || '';

    if (kps.length) {
      setSessionStorageKeypairs(JSON.parse(kps));
    }
  }, [dropping]);

  async function airdrop() {
    if (publicKey) {
      setDropping(true);
      try {
        const [_, err] = await kin.requestAirdrop(publicKey, amount);

        if (err === 'NOT_FOUND') {
          const keyPair =
            sessionStorageKeypairs?.length &&
            sessionStorageKeypairs.find(
              (kp: SimpleKeypair) => kp.publicKey === publicKey
            );

          if (keyPair && keyPair.secret) {
            await kin.createAccount(keyPair.secret);
            await airdrop();
          }
        }

        await getBalances();
      } catch (err) {
        console.error(`An error occurred`, err);
      }
      setDropping(false);
    }
  }

  async function getBalances() {
    setBalanceNull(false);
    try {
      const [res, err] = await kin.getBalances(publicKey!);
      console.log('🚀 ~ res', res);

      if (res === null) setBalanceNull(true);

      setBalances(res);
    } catch (error) {
      console.error(`An error occurred`, error);
    }
  }

  // function openExplorer() {
  //   window.open(getExplorerUrl(KinEnvironment.Test, publicKey!), '_blank');
  // }

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
        <div className="flex flex-col space-y-6">
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
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700"
            >
              Amount
            </label>
            <div className="mt-1">
              <input
                value={amount}
                onChange={(e) => setAmount(e.target?.value?.toString)}
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
          <div className="flex space-x-2">
            <WebUiButton
              onClick={airdrop}
              label="Airdrop"
              disabled={!publicKey || dropping}
            />

            <WebUiButton
              disabled={!publicKey}
              onClick={getBalances}
              label="Get Balances"
            />

            {/* TODO turn this back on when we've moved to Solana Dev net or link works to custom url */}
            {/* <WebUiButton
              disabled={!publicKey}
              onClick={openExplorer}
              label="Open Explorer"
            /> */}
          </div>
          <div className="">
            {balanceNull === true
              ? `Can't find account. Sending an Airdrop will create your account if it doesn't already exist.`
              : null}
            {!balanceNull && balances ? (
              <pre>{JSON.stringify(balances, null, 2)}</pre>
            ) : null}
          </div>
        </div>
      </WebUiCard>
    </WebUiPage>
  );
}

export default WebAirdropFeature;
