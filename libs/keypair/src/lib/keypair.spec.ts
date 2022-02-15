import {
  TEST_MNEMONIC_12,
  TEST_MNEMONIC_12_SET,
  TEST_MNEMONIC_24,
  TEST_MNEMONIC_24_PUBLIC_KEY,
  TEST_MNEMONIC_24_SECRET_KEY,
  TEST_MNEMONIC_24_SET,
  TEST_PUBLIC_KEY,
  TEST_SECRET_BYTEARRAY,
  TEST_SECRET_KEY,
  TEST_STELLAR_BYTEARRAY,
  TEST_STELLAR_PUBLIC_KEY,
  TEST_STELLAR_PUBLIC_KEY_TO_SOLANA,
  TEST_STELLAR_SECRET_KEY,
  TEST_STELLAR_SECRET_KEY_TO_SOLANA,
} from './fixtures/key-fixtures';
import { Keypair, stellarPublicKeyToBase58 } from './keypair';

describe('Keypair', () => {
  it('should generate a KeyPair', () => {
    const kp = Keypair.generate();

    expect(kp.secretKey).toBeDefined();
    expect(kp.publicKey).toBeDefined();
  });

  it('should generate a Vanity KeyPair', () => {
    const kp = Keypair.generateVanity('B');

    expect(kp.secretKey).toBeDefined();
    expect(kp.publicKey).toBeDefined();
    expect(kp.publicKey.startsWith('B')).toBeTruthy();
  });

  it('should generate a Mnemonic phrase (12 chars)', () => {
    const mnemonic = Keypair.generateMnemonic(128);

    expect(mnemonic.split(' ').length).toEqual(12);
  });

  it('should generate a Mnemonic phrase (24 chars)', () => {
    const mnemonic = Keypair.generateMnemonic(256);

    expect(mnemonic.split(' ').length).toEqual(24);
  });

  it('should create and import keypair', () => {
    const kp1 = Keypair.generate();
    const kp2 = Keypair.fromSecretKey(kp1.secretKey);
    expect(kp1.secretKey).toEqual(kp2.secretKey);
    expect(kp1.publicKey).toEqual(kp2.publicKey);
  });

  it('should import from a bytearray', () => {
    const kp = Keypair.fromByteArray(TEST_SECRET_BYTEARRAY);

    expect(kp.publicKey).toEqual(TEST_PUBLIC_KEY);
  });

  it('should import and existing secret', () => {
    const kp = Keypair.fromSecretKey(TEST_SECRET_KEY);
    expect(kp.publicKey).toEqual(TEST_PUBLIC_KEY);
  });

  it('should import from a mnemonic', () => {
    const keypair = Keypair.fromMnemonic(TEST_MNEMONIC_12);
    expect(keypair.secretKey).toEqual(TEST_SECRET_KEY);
    expect(keypair.solanaSecretKey.toString()).toEqual(
      TEST_SECRET_BYTEARRAY.toString()
    );
    expect(keypair.solanaPublicKey.toBase58()).toEqual(TEST_PUBLIC_KEY);
    expect(keypair.publicKey).toEqual(TEST_PUBLIC_KEY);
  });

  it('should import multiple from a mnemonic (12 chars)', () => {
    const keypair = Keypair.fromMnemonic(TEST_MNEMONIC_12);
    const set = Keypair.fromMnemonicSet(TEST_MNEMONIC_12);
    const keys = set.map(({ secretKey, publicKey }) => ({
      secretKey,
      publicKey,
    }));

    expect(keypair.secretKey).toEqual(TEST_SECRET_KEY);
    expect(keypair.publicKey).toEqual(TEST_PUBLIC_KEY);
    expect(
      keys.map(({ publicKey, secretKey }) => ({ publicKey, secretKey }))
    ).toEqual(TEST_MNEMONIC_12_SET);
  });

  it('should import multiple from a mnemonic (24 chars)', () => {
    const keypair = Keypair.fromMnemonic(TEST_MNEMONIC_24);
    const set = Keypair.fromMnemonicSet(TEST_MNEMONIC_24);
    const keys = set.map(({ secretKey, publicKey }) => ({
      secretKey,
      publicKey,
    }));

    expect(keypair.secretKey).toEqual(TEST_MNEMONIC_24_SECRET_KEY);
    expect(keypair.publicKey).toEqual(TEST_MNEMONIC_24_PUBLIC_KEY);

    expect(
      keys.map(({ publicKey, secretKey }) => ({ publicKey, secretKey }))
    ).toEqual(TEST_MNEMONIC_24_SET);
  });

  it('should import from a Stellar Seed', () => {
    const res = Keypair.fromStellarKeypair(TEST_STELLAR_SECRET_KEY);

    expect(res.secretKey).toEqual(TEST_STELLAR_SECRET_KEY_TO_SOLANA);
    expect(res.publicKey).toEqual(TEST_STELLAR_PUBLIC_KEY_TO_SOLANA);
  });

  it('should import from a Stellar Byte Array', () => {
    const res = Keypair.fromByteArray(TEST_STELLAR_BYTEARRAY);

    expect(res.secretKey).toEqual(TEST_STELLAR_SECRET_KEY_TO_SOLANA);
    expect(res.publicKey).toEqual(TEST_STELLAR_PUBLIC_KEY_TO_SOLANA);
  });

  it('should convert from Stellar to Base58', () => {
    const publicBs58 = stellarPublicKeyToBase58(TEST_STELLAR_PUBLIC_KEY);

    expect(publicBs58).toEqual(TEST_STELLAR_PUBLIC_KEY_TO_SOLANA);
  });

  // TODO: The reverse should also exist
  xit('should convert from Base58 to Stellar', () => {
    const publicBs58 = stellarPublicKeyToBase58(TEST_STELLAR_PUBLIC_KEY);

    expect(publicBs58).toEqual(TEST_STELLAR_PUBLIC_KEY_TO_SOLANA);
  });
});
