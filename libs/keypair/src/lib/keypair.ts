import {
  Keypair as SolanaKeypair,
  PublicKey as SolanaPublicKey,
} from '@solana/web3.js';
import * as bip39 from 'bip39';
import * as bs58 from 'bs58';
import { derivePath } from 'ed25519-hd-key';
// @ts-ignore
import * as hexTo32 from 'hex-to-32';
import {
  PrivateKey as StellarPrivateKey,
  PublicKey as StellarPublicKey,
  StrKey,
} from '@kin-sdk/core';
// @ts-ignore
import * as atob from 'atob';

export { SolanaKeypair, SolanaPublicKey };

export function base64ToBytArray(base64: any): number[] {
  const binary_string = atob(base64);
  const len = binary_string.length;

  const result: number[] = [];
  for (let i = 0; i < len; i++) {
    result.push(binary_string.charCodeAt(i));
  }
  return result;
}

export function stellarPublicKeyToBase58(str: string): string {
  return StellarPublicKey.fromString(str).toBase58();
}

export class Keypair {
  private readonly solanaKeypair: SolanaKeypair;
  secretKey: string;
  publicKey: string;

  constructor(secretKey: string) {
    this.solanaKeypair = SolanaKeypair.fromSecretKey(bs58.decode(secretKey));
    this.publicKey = this.solanaKeypair.publicKey.toBase58();
    this.secretKey = bs58.encode(this.solanaKeypair.secretKey);
  }

  get solana(): SolanaKeypair {
    return this.solanaKeypair;
  }

  get solanaPublicKey(): SolanaPublicKey {
    return this.solanaKeypair.publicKey;
  }

  get solanaSecretKey(): Uint8Array {
    return this.solanaKeypair.secretKey;
  }

  static fromByteArray(byteArray: number[]): Keypair {
    return this.fromSecretKey(bs58.encode(Uint8Array.from(byteArray)));
  }

  static fromMnemonic(mnemonic: string): Keypair {
    const seed = bip39.mnemonicToSeedSync(mnemonic, '');

    return this.fromSeed(seed.slice(0, 32));
  }

  static fromMnemonicSet(
    mnemonic: string,
    from = 0,
    to = 10
  ): Keypair[] {
    // Always start with zero as minimum
    from = from < 0 ? 0 : from;
    // Always generate at least 1
    to = to <= from ? 1 : to;

    const seed = bip39.mnemonicToSeedSync(mnemonic, '');
    const keys: Keypair[] = [];

    for (let i = from; i < to; i++) {
      const path = `m/44'/501'/${i}'/0'`;
      keys.push(this.derive(seed, path));
    }
    return keys;
  }

  static derive(seed: Buffer, path: string) {
    return Keypair.fromSeed(derivePath(path, seed.toString('hex')).key);
  }

  static fromSeed(seed: Buffer): Keypair {
    return this.fromSecretKey(
      bs58.encode(SolanaKeypair.fromSeed(seed).secretKey)
    );
  }

  static fromSecretKey(secretKey: string): Keypair {
    return new Keypair(secretKey);
  }

  static fromStellarKeypair(secretKey: string) {
    const skp = StellarPrivateKey.fromSecret(secretKey);
    const publicKey = this.encodeStellarPublicKey(skp.publicKey().buffer);

    const secretHex = hexTo32.decode(skp.kp.secret());
    const publicHex = hexTo32.decode(publicKey);
    const secretHexCut = secretHex.slice(2, -4);
    const publicHexCut = publicHex.slice(2, -4);

    const joined = secretHexCut + publicHexCut;
    const joined64 = Buffer.from(joined, 'hex').toString('base64');

    return Keypair.fromByteArray(base64ToBytArray(joined64));
  }

  static encodeStellarPublicKey(key: Buffer) {
    return StrKey.encodeEd25519PublicKey(key);
  }

  static generate(): Keypair {
    return this.fromSecretKey(bs58.encode(SolanaKeypair.generate().secretKey));
  }

  static generateMnemonic(strength: 128 | 256 = 128): string {
    return bip39.generateMnemonic(strength);
  }

  static generateVanity(search: string) {
    let keypair = SolanaKeypair.generate();
    while (!keypair.publicKey.toBase58().startsWith(search)) {
      keypair = SolanaKeypair.generate();
    }
    return this.fromSecretKey(bs58.encode(keypair.secretKey));
  }
}
