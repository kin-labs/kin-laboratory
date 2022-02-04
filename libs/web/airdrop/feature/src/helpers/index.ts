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
    const [res, err] = await kin.getBalances(publicKey!);

    if (res === null) setBalanceNull(true);

    setBalances(res);
  } catch (error) {
    console.error(`An error occurred`, error);
  }
}

interface CreateAccount extends GetBalances{
  amount: string;
  sessionStorageKeypairs: SimpleKeypair[];
  setDropping: (dropping: boolean) => void;
  setError: (error: string) => void;
}

export async function createAccount({
  publicKey,
  amount,
  sessionStorageKeypairs,
  setDropping,
  setError,
  setBalances,
  setBalanceNull,
}: CreateAccount) {
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
          console.log("🚀 ~ err", err)
          console.log("🚀 ~ _", _)

        } else {
          throw new Error("Can't find keypair");

        }

      await getBalances({ setBalances, setBalanceNull, publicKey });
    } catch (err) {
      setError('Sorry, something went wrong. Please try again later...')
      console.error(`An error occurred`, err);
    }
    setDropping(false);
  }
}
interface Airdrop extends GetBalances{
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
    setError('');

    try {
      const [_, err] = await kin.requestAirdrop(publicKey, amount);
      err && console.log('🚀 ~ err', err);

      if (err === 'NOT_FOUND') {
        const keyPair =
          sessionStorageKeypairs?.length &&
          sessionStorageKeypairs.find(
            (kp: SimpleKeypair) => kp.publicKey === publicKey
          );

        if (keyPair && keyPair.secret) {
          await kin.createAccount(keyPair.secret);
          await airdrop({
            publicKey,
            amount,
            sessionStorageKeypairs,
            setDropping,
            setError,
            setBalances,
            setBalanceNull,
          });
        } else {
          setError(
            "Sorry, we couldn't find your keypair. Try again using a keypair generated on the 'Keypair' tab."
          );
        }
      }

      await getBalances({ setBalances, setBalanceNull, publicKey });
    } catch (err) {
      console.error(`An error occurred`, err);
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
