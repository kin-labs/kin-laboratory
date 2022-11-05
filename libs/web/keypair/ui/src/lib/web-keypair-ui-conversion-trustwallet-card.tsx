import { initWasm, WalletCore } from '@trustwallet/wallet-core';

import { Alert, Box, ButtonGroup, Stack } from '@chakra-ui/react';
import { WebUiButton } from '@kin-laboratory/web/ui/button';
import { WebUiPre } from '@kin-laboratory/web/ui/pre';
import { Field, Form, FormLayout } from '@saas-ui/react';
import { useEffect, useState } from 'react';

interface TrustWalletKeypair {
  privateKey: string;
  solanaAddress: string;
  kinAddress: string;
}
interface ConvertStellarTrustWallet {
  core: WalletCore;
  mnemonic: string;
  onSuccess?: (trustWalletKeypair: TrustWalletKeypair) => void;
  onFailure?: (error: string) => void;
}

async function convertStellarTrustWallet({
  core,
  mnemonic,
  onSuccess,
  onFailure,
}: ConvertStellarTrustWallet) {
  try {
    const { CoinType, HexCoding, HDWallet, AnyAddress } = core;
    const wallet = HDWallet.createWithMnemonic(mnemonic, '');
    const key = wallet.getKeyForCoin(CoinType.kin);
    const privateKey = HexCoding.encode(key.data());
    const publickey = key.getPublicKeyEd25519();
    const kinAddress = wallet.getAddressForCoin(CoinType.kin);
    const solAddress = AnyAddress.createWithPublicKey(
      publickey,
      CoinType.solana
    );

    console.log(`Private Key: ${privateKey}`);
    console.log(`SOL Address: ${solAddress.description()}`);
    console.log(`Kin Address: ${kinAddress}`);

    const trustWalletKeypair = {
      privateKey,
      solanaAddress: solAddress.description(),
      kinAddress,
    };

    if (onSuccess) {
      onSuccess(trustWalletKeypair);
    }
  } catch (error) {
    console.log('🚀 ~ error', error);
    if (onFailure) {
      onFailure(`${error}`);
    }
  }
}

export function WebKeypairUiConversionTrustWalletCard() {
  const [trustWalletCore, setTrustWalletCore] = useState<WalletCore | null>(
    null
  );
  useEffect(() => {
    async function initCore() {
      try {
        console.log(`Initializing Trust Wallet Core Wasm...`);
        const core = await initWasm();
        console.log('🚀 ~ core', core);
        console.log(`Done.`);

        setTrustWalletCore(core);
      } catch (error) {
        console.log('🚀 ~ error', error);
        setTrustWalletCore(null);
      }
    }

    initCore();
  }, []);
  const [mnemonic, setMnemonic] = useState('');
  const [error, setError] = useState('');
  if (error) {
    console.log('🚀 ~ error', error);
  }
  const [trustWalletKeypair, setTrustWalletKeypair] =
    useState<TrustWalletKeypair | null>(null);

  const convertStellarButton = (
    <WebUiButton
      size="lg"
      disabled={!mnemonic || !trustWalletCore}
      onClick={() => {
        setError('');
        mnemonic &&
          trustWalletCore &&
          convertStellarTrustWallet({
            core: trustWalletCore,
            mnemonic,
            onSuccess: (kp) => setTrustWalletKeypair(kp),
            onFailure: (error) => setError(error),
          });
      }}
      label="Convert"
    />
  );
  return (
    <Stack spacing={6}>
      <Form onSubmit={() => console.log()}>
        <FormLayout>
          <Field
            size="lg"
            colorScheme="primary"
            label="Stellar Mnemonic"
            value={mnemonic}
            onChange={(e: any) => setMnemonic(e.target?.value)}
            type="text"
            name="stellarMnemonic"
            id="stellarMnemonic"
            placeholder="e.g. clean nickel they shiver orange burden envelope galaxy rabbit silly ask elephant"
          />
        </FormLayout>
      </Form>

      <ButtonGroup>{convertStellarButton}</ButtonGroup>

      {trustWalletKeypair && !error ? (
        <Box>
          <WebUiPre>
            {JSON.stringify(
              {
                privateKey: trustWalletKeypair.privateKey,
                solanaAddress: trustWalletKeypair.solanaAddress,
                kinAddress: trustWalletKeypair.kinAddress,
              },
              null,
              2
            )}
          </WebUiPre>
        </Box>
      ) : null}

      {error ? <Alert status={'error'}>{error}</Alert> : null}
    </Stack>
  );
}
