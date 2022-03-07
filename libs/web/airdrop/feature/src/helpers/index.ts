import {
  KinClient,
  KinEnvironment,
  KinTest,
  SimpleKeypair,
} from '@kin-sdk/client';

import { KinAccountBalance } from '@kin-sdk/client/src/lib/agora/kin-agora-client';

const kin = new KinClient(KinTest);

interface GetBalances {
  publicKey: string;
  setBalances: (balances: KinAccountBalance[]) => void;
  setBalanceNull: (isNull: boolean) => void;
}
export async function getBalances({
  setBalances,
  setBalanceNull,
  publicKey,
}: GetBalances) {
  setBalanceNull(false);
  try {
    const [res, err] = await kin.getBalances(publicKey);
    if (err) throw new Error('');
    if (res) setBalances(res);
  } catch (error) {
    console.error(`An error occurred`, error);
    setBalanceNull(true);
  }
}

interface CreateTokenAccountFromSessionKeypair extends GetBalances {
  sessionStorageKeypairs: SimpleKeypair[];
  setDropping: (dropping: boolean) => void;
  setError: (error: string) => void;
}

export async function createTokenAccountFromSessionKeypair({
  publicKey,
  sessionStorageKeypairs,
  setDropping,
  setError,
  setBalances,
  setBalanceNull,
}: CreateTokenAccountFromSessionKeypair) {
  if (publicKey) {
    setDropping(true);
    setError('');

    try {
      const keyPair =
        sessionStorageKeypairs?.length &&
        sessionStorageKeypairs.find(
          (kp: SimpleKeypair) => kp.publicKey === publicKey
        );

      if (keyPair && keyPair.secret) {
        const [_, err] = await kin.createAccount(keyPair.secret);
        console.log('🚀 ~ err', err);
        console.log('🚀 ~ _', _);
      } else {
        throw new Error("Can't find keypair");
      }

      await getBalances({ setBalances, setBalanceNull, publicKey });
    } catch (err) {
      setError('Sorry, something went wrong. Please try again later...');
      console.error(`An error occurred`, err);
    }
    setDropping(false);
  }
}

interface CreateTokenAccountFromSecret extends GetBalances {
  privateKey: string;
  setPrivateKey: (key: string) => void;
  setDropping: (dropping: boolean) => void;
  setError: (error: string) => void;
}

export async function createTokenAccountFromSecret({
  publicKey,
  privateKey,
  setPrivateKey,
  setDropping,
  setError,
  setBalances,
  setBalanceNull,
}: CreateTokenAccountFromSecret) {
  if (privateKey) {
    setDropping(true);

    try {
        const [_, err] = await kin.createAccount(privateKey);
        if(err) throw new Error(err);

        await getBalances({ setBalances, setBalanceNull, publicKey  });
        setError('');
        setPrivateKey('')
      } catch (err) {
        setError('Sorry, something went wrong. Please try again later...');
        console.error(`An error occurred`, err);
      }
      setDropping(false);
  }
}

interface Airdrop extends GetBalances {
  amount: string;
  sessionStorageKeypairs: SimpleKeypair[];
  setDropping: (dropping: boolean) => void;
  setError: (error: string) => void;
}

export async function airdrop({
  publicKey,
  amount,
  sessionStorageKeypairs,
  setDropping,
  setError,
  setBalances,
  setBalanceNull,
}: Airdrop) {
  if (publicKey) {
    setDropping(true);
    setBalanceNull(false);
    setError('');

    try {
      const [_, err] = await kin.requestAirdrop(publicKey, amount);
      if (err) console.log('🚀 ~ err', err);

      if (err === 'NOT_FOUND') {
        const [balances, balancesError] = await kin.getBalances(publicKey);

        if(balancesError && balancesError === 'No Kin token accounts found'){
          throw new Error(balancesError);
        }

        const keyPair =
          sessionStorageKeypairs?.length &&
          sessionStorageKeypairs.find(
            (kp: SimpleKeypair) => kp.publicKey === publicKey
          );

        if (balances?.length > 0) {
          const tokenAccount = balances[0].account || '';
          if (typeof tokenAccount === 'string' && tokenAccount.length > 0) {
            const [__, _err] = await kin.requestAirdrop(tokenAccount, amount);
            if (_err) throw new Error('');
          }
        } else if (keyPair && keyPair.secret) {
          await kin.createAccount(keyPair.secret);

          setDropping(true);
          const [___, __err] = await kin.requestAirdrop(publicKey, amount);

          if (__err) throw new Error('');
        } else {
          throw new Error('');
        }
      }

      await getBalances({ setBalances, setBalanceNull, publicKey });
    } catch (err) {
      console.error(`An error occurred`, err);
      if(typeof err === 'object' && err && err.toString().includes('No Kin token accounts found') ){
        setError("It looks like you don't have a Kin Token Account")
      } else {
        setError('Something went wrong with your Airdrop');
      }
      setBalanceNull(true);
    }
    setDropping(false);
  }
}

function getExplorerUrl(env: KinEnvironment, publicKey: string): string {
  const baseUrl = `https://explorer.solana.com/address/${publicKey}`;
  const validator = `https://local.validator.agorainfra.dev`;
  const params =
    env === KinEnvironment.Test ? `?cluster=custom&customUrl=${validator}` : '';

  const finalUrl = `${baseUrl}/tokens${params}`;

  return finalUrl;
}

interface OpenExplorer {
  publicKey: string;
}
export function openExplorer({ publicKey }: OpenExplorer) {
  window.open(getExplorerUrl(KinEnvironment.Test, publicKey!), '_blank');
}
