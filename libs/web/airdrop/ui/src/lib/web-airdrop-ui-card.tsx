import { Alert, Stack } from '@chakra-ui/react';
import { WebUiButton } from '@kin-laboratory/web/ui/button';
import { WebUiPre } from '@kin-laboratory/web/ui/pre';
import { Keypair } from '@kin-kinetic/keypair';
import { ButtonGroup, Field, Form, FormLayout } from '@saas-ui/react';
import { useEffect, useState } from 'react';
import { airdrop, createAccount, getBalance, openExplorer } from '../helpers';
import { BalanceResponse } from '@kin-kinetic/sdk';

export function WebAirdropUiCard({
  fixedPublicKey,
  keypairs,
}: {
  fixedPublicKey?: string;
  keypairs: Keypair[];
}) {
  const [amount, setAmount] = useState<string>('50000');
  const [balance, setBalance] = useState<BalanceResponse | null>(null);
  const [balanceNull, setBalanceNull] = useState(false);
  const [publicKey, setPublicKey] = useState<string>(fixedPublicKey || '');
  const [dropping, setDropping] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setBalance(null);
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
          setBalance,
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
          setBalance,
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
        publicKey && getBalance({ publicKey, setBalance, setBalanceNull })
      }
      label="Get Balance"
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
          {balancesButton}
          {airdropButton}
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
      {!balanceNull && balance ? (
        <WebUiPre>{JSON.stringify(balance, null, 2)}</WebUiPre>
      ) : null}
    </Stack>
  );
}
