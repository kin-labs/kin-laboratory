import { Text } from '@chakra-ui/react';
import {
  WebTransactionCard,
  WebTransactionForm,
} from '@kin-laboratory/web/transaction/ui';
import { WebUiButton } from '@kin-laboratory/web/ui/button';
import { WebUiCard } from '@kin-laboratory/web/ui/card';
import { WebUiPage } from '@kin-laboratory/web/ui/page';
import { WebUiPre } from '@kin-laboratory/web/ui/pre';
import { ButtonGroup } from '@saas-ui/react';
import {
  clusterApiUrl,
  Connection,
  ParsedTransactionWithMeta,
} from '@solana/web3.js';
import { useEffect, useState } from 'react';

const networks = [
  {
    name: 'Mainnet Beta',
    url: clusterApiUrl('mainnet-beta'),
    mint: 'kinXdEcpDQeHPEuQnqmUgtYykqKGVFq6CeVX5iAHJq6',
  },
  {
    name: 'Devnet',
    url: clusterApiUrl('devnet'),
    mint: 'KinDesK3dYWo3R2wDk6Ucaf31tvQCCSYyL8Fuqp33GX',
  },
  { name: 'Testnet', url: clusterApiUrl('testnet') },
  {
    name: 'KIN Testnet',
    url: 'https://local.validator.agorainfra.dev',
    mint: 'kinTese33ph6r6txhC5RbftBGzmi68MPaT9ByhXqPbo',
  },
];

export function WebTransactionFeature() {
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
    <WebUiPage
      title="Kin Transaction"
      subtitle={
        <Text>
          Search for transactions and validate if they are valid KIN
          transactions.
        </Text>
      }
    >
      <ButtonGroup>
        {networks.map((item) => (
          <WebUiButton
            disabled={item === network}
            label={item.name}
            key={item.name}
            onClick={() => setNetwork(item)}
          />
        ))}
      </ButtonGroup>
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
    </WebUiPage>
  );
}
