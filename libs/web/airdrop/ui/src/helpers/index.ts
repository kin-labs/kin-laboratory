

import {
  KineticSdk,
  KineticSdkConfig,
  BalanceResponse
} from '@kin-kinetic/sdk';

import { Keypair } from '@kin-kinetic/keypair';
import { Commitment } from '@kin-kinetic/solana';



let kineticClient: KineticSdk | null;

async function setupKineticClient(){

const config: KineticSdkConfig = {
      environment: 'devnet',
      endpoint: 'https://sandbox.kinetic.host/',
      index: 407,
    };

kineticClient = await KineticSdk.setup(config);
console.log("🚀 ~ kineticClient", kineticClient)

}

setupKineticClient()

interface GetBalance {
  publicKey: string;
  setBalance: (balance: BalanceResponse) => void;
  setBalanceNull: (isNull: boolean) => void;
}
export async function getBalance({
  setBalance,
  setBalanceNull,
  publicKey,
}: GetBalance) {
  setBalanceNull(false);
  try {
    if(kineticClient){
      const balance = await kineticClient.getBalance({
          account: publicKey,
        });
      console.log("🚀 ~ balance", balance)
      if (balance) setBalance(balance);
    } else {
      throw new Error('')
    }
  } catch (error) {
    console.error(`An error occurred`, error);
    setBalanceNull(true);
  }
}

interface CreateAccount extends GetBalance {
  keypairs: Keypair[];
  setDropping: (dropping: boolean) => void;
  setError: (error: string) => void;
}

export async function createAccount({
  publicKey,
  keypairs,
  setDropping,
  setError,
  setBalance,
  setBalanceNull,
}: CreateAccount) {
  console.log("🚀 ~ publicKey", publicKey)
  console.log("🚀 ~ keypairs", keypairs)
  if (publicKey) {
    setDropping(true);
    setError('');

    try {
      const keypair =
      keypairs?.length &&
      keypairs.find((kp: Keypair) => kp.publicKey === publicKey);
      console.log("🚀 ~ keypair", keypair)
      if (kineticClient && keypair && keypair.mnemonic) {
        const owner = Keypair.fromMnemonic(keypair.mnemonic)
        const account = await kineticClient.createAccount({
        owner,
        commitment: Commitment.Finalized,
      });
        console.log("🚀 ~ account", account)

      } else {
        throw new Error("Can't find keypair");
      }

      await getBalance({ setBalance, setBalanceNull, publicKey });
    } catch (err) {
      setError('Sorry, something went wrong. Please try again later...');
      console.error(`An error occurred`, err);
    }
    setDropping(false);
  }
}
interface Airdrop extends GetBalance {
  amount: string;
  keypairs: Keypair[];
  setDropping: (dropping: boolean) => void;
  setError: (error: string) => void;
}

export async function airdrop({
  publicKey,
  amount,
  keypairs,
  setDropping,
  setError,
  setBalance,
  setBalanceNull,
}: Airdrop) {
  if (publicKey && kineticClient) {
    setDropping(true);
    setBalanceNull(false);
    setError('');

    try {
      const airdrop = await kineticClient.requestAirdrop({
        account: publicKey,
        amount: amount,
        commitment: Commitment.Finalized,
      });
      console.log("🚀 ~ airdrop", airdrop)

      // if (err === 'NOT_FOUND') {
      //   const [balances] = await kineticClient.getBalance(publicKey);
      //   const keypair =
      //     keypairs?.length &&
      //     keypairs.find((kp: Keypair) => kp.publicKey === publicKey);

      //   if (balances?.length > 0) {
      //     const tokenAccount = balances[0].account || '';
      //     if (typeof tokenAccount === 'string' && tokenAccount.length > 0) {
      //       const [__, _err] = await kineticClient.requestAirdrop(tokenAccount, amount);
      //       if (_err) throw new Error('');
      //     }
      //   } else if (keypair && keypair.secret) {
      //     await kineticClient.createAccount(keypair.secret);

      //     setDropping(true);
      //     const [___, __err] = await kineticClient.requestAirdrop(publicKey, amount);

      //     if (__err) throw new Error('');
      //   } else {
      //     throw new Error('');
      //   }
      // }

      await getBalance({ setBalance, setBalanceNull, publicKey });
    } catch (err) {
      console.error(`An error occurred`, err);
      setError('Something went wrong with your Airdrop');
      setBalanceNull(true);
    }
    setDropping(false);
  }
}

async function getExplorerUrl(publicKey: string) {
  if(kineticClient){
    const url = await kineticClient.getExplorerUrl(publicKey)
    return url;
  } else {
    return null
  }
}

interface OpenExplorer {
  publicKey: string;
}
export async function openExplorer({ publicKey }: OpenExplorer) {

  const url = await getExplorerUrl(publicKey)

  if(url) window.open(url, '_blank');

}
