import {
  WebTransactionCard,
  WebTransactionForm,
} from '@kin-laboratory/web/transaction/ui';
import { WebUiButton } from '@kin-laboratory/web/ui/button';
import { WebUiCard } from '@kin-laboratory/web/ui/card';
import { WebUiPage } from '@kin-laboratory/web/ui/page';
import { WebUiPre } from '@kin-laboratory/web/ui/pre';
import {
  clusterApiUrl,
  Connection,
  ParsedTransactionWithMeta,
} from '@solana/web3.js';
import { useEffect, useState } from 'react';

export interface WebTransactionFeatureProps {}

const networks = [
  { name: 'Mainnet Beta', url: clusterApiUrl('mainnet-beta') },
  { name: 'Devnet', url: clusterApiUrl('devnet') },
  { name: 'Testnet', url: clusterApiUrl('testnet') },
  {
    name: 'KIN Testnet',
    url: 'https://local.validator.agorainfra.dev',
    mint: 'kinTese33ph6r6txhC5RbftBGzmi68MPaT9ByhXqPbo',
  },
];

export function WebTransactionFeature(props: WebTransactionFeatureProps) {
  const [network, setNetwork] = useState(networks[0]);
  const [connection, setConnection] = useState<Connection>();
  const [txId, setTxId] = useState<string>();
  const [error, setError] = useState<string | null>(null);
  const [tx, setTx] = useState<ParsedTransactionWithMeta | null>();

  useEffect(() => {
    if (!network) {
      return;
    }
    setConnection(() => new Connection(network.url));
    console.log(`Switched to ${network.name} ${network.url}`);
    setError(null);
  }, [network]);

  function lookupTransaction(txId: string) {
    if (txId?.length > 40 && connection) {
      setError(null);
      setTxId(txId);
      connection
        ?.getParsedTransaction(txId)
        .then((res) => {
          if (res) {
            setTx(res);
          } else {
            setError(`Transaction not found.`);
          }
        })
        .catch((err) => {
          setError(`An error occurred: ${err}`);
        });
    }
  }

  return (
    <WebUiPage>
      <div className="flex flex-col space-y-6">
        <h1 className="mt-2 block text-3xl text-left leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Kin Transaction
        </h1>
        <div className="flex flex-col space-y-3 mt-6 prose prose-indigo prose-lg text-gray-500">
          <p>
            Search for transactions and validate if they are valid KIN
            transactions.
          </p>
        </div>
        <div className="flex space-x-2">
          {networks.map((item) => (
            <WebUiButton
              disabled={item === network}
              label={item.name}
              key={item.name}
              onClick={() => setNetwork(item)}
            />
          ))}
        </div>
        {connection ? (
          <WebUiCard title={network.name}>
            <WebTransactionForm lookup={lookupTransaction} />
          </WebUiCard>
        ) : (
          'Not Connected!'
        )}
        {error && <WebUiPre>{error}</WebUiPre>}
        {tx && (
          <WebUiCard title={txId}>
            <WebTransactionCard tx={tx} mint={network?.mint} />
          </WebUiCard>
        )}
      </div>
    </WebUiPage>
  );
}

export default WebTransactionFeature;
