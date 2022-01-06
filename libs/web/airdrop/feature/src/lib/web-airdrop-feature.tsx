import { WebUiButton } from '@kin-laboratory/web/ui/button';
import { WebUiCard } from '@kin-laboratory/web/ui/card';
import { WebUiPage } from '@kin-laboratory/web/ui/page';
import { KinClient, KinEnvironment, KinTest } from '@kin-sdk/client';
import { KinAccountBalance } from '@kin-sdk/client/src/lib/agora/kin-agora-client';
import { useState } from 'react';

export interface WebAirdropFeatureProps {}

const kin = new KinClient(KinTest);

export function getExplorerUrl(env: KinEnvironment, publicKey: string): string {
  const baseUrl = `https://explorer.solana.com/address/${publicKey}`;
  const validator = `https://local.validator.agorainfra.dev`;
  const params =
    env === KinEnvironment.Test
      ? `?cluster=custom&customUrl=${encodeURI(validator)}`
      : '';

  return `${baseUrl}/tokens${params}`;
}

export function WebAirdropFeature(props: WebAirdropFeatureProps) {
  const [amount, setAmount] = useState<string>('50000');
  const [balances, setBalances] = useState<KinAccountBalance[]>();
  const [publicKey, setPublicKey] = useState<string>();
  const [dropping, setDropping] = useState<boolean>(false);

  async function airdrop() {
    if (publicKey) {
      setDropping(true);
      try {
        const [_, err] = await kin.requestAirdrop(publicKey, amount);
        if (err) {
          console.error(`An error occurred`, err);
        }
        await getBalances();
      } catch (err) {
        console.error(`An error occurred`, err);
      }
      setDropping(false);
    }
  }

  async function getBalances() {
    const [res, err] = await kin.getBalances(publicKey!);
    if (err) {
      console.error(`An error occurred`, err);
    }
    setBalances(res);
  }

  function openExplorer() {
    window.open(getExplorerUrl(KinEnvironment.Test, publicKey!), '_blank');
  }

  return (
    <WebUiPage>
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
                placeholder="Don8L4DTVrUrRAcVTsFoCRqei5Mokde3CV3K9Ut4nAGZ"
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

            <WebUiButton
              disabled={!publicKey}
              onClick={openExplorer}
              label="Open Explorer"
            />
          </div>
          <div className="">
            <pre>{JSON.stringify(balances, null, 2)}</pre>
          </div>
        </div>
      </WebUiCard>
    </WebUiPage>
  );
}

export default WebAirdropFeature;
