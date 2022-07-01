import { Alert, Stack } from '@chakra-ui/react';
import { WebUiButton } from '@kin-laboratory/web/ui/button';
import { WebUiPre } from '@kin-laboratory/web/ui/pre';
import { SimpleKeypair } from '@kin-sdk/client';
import { KinAccountBalance } from '@kin-sdk/client/src/lib/agora/kin-agora-client';
import { ButtonGroup, Field, Form, FormLayout } from '@saas-ui/react';
import { useEffect, useState } from 'react';
import { airdrop, createAccount, getBalances, openExplorer } from '../helpers';

export function WebAirdropUiCard({
  fixedPublicKey,
  keypairs,
}: {
  fixedPublicKey?: string;
  keypairs: SimpleKeypair[];
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
          keypairs,
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
          keypairs,
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
    <Stack spacing={{ base: 4, md: 6 }}>
      {!fixedPublicKey ? (
        <Stack>
          <Form onSubmit={() => console.log()}>
            <FormLayout>
              <Field
                size="lg"
                colorScheme="primary"
                label="Public Key"
                value={publicKey}
                onChange={(e: any) => setPublicKey(e.target?.value)}
                type="text"
                name="publicKey"
                id="publicKey"
                placeholder="e.g. Don8L4DTVrUrRAcVTsFoCRqei5Mokde3CV3K9Ut4nAGZ"
              />
            </FormLayout>
          </Form>
        </Stack>
      ) : null}

      {!fixedPublicKey ? null : (
        <ButtonGroup>
          {createAccountButton}
          {airdropButton}
          {balancesButton}
          {seeAccountButton}
        </ButtonGroup>
      )}

      <Stack>
        <Form onSubmit={() => console.log()}>
          <FormLayout>
            <Field
              size="lg"
              min={1}
              max={50000}
              type="number"
              name="name"
              label={fixedPublicKey ? 'Airdrop amount' : 'Amount'}
              value={amount}
              onChange={(e: any) => setAmount(e.target?.value?.toString())}
            />
          </FormLayout>
        </Form>
      </Stack>

      {fixedPublicKey ? null : (
        <ButtonGroup>
          {airdropButton}
          {balancesButton}
          {seeAccountButton}
        </ButtonGroup>
      )}

      {balanceNull && error ? <Alert status={'error'}>{error}</Alert> : null}
      {balanceNull && !error ? (
        <Alert status={'error'}>We can't find that account</Alert>
      ) : null}
      {!balanceNull && balances?.length ? (
        <WebUiPre>{JSON.stringify(balances, null, 2)}</WebUiPre>
      ) : null}
    </Stack>
  );
}
