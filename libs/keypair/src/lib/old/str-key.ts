import { base32decode, base32encode } from './base32';
import * as crc from 'crc';

export function verifyChecksum(expected: any, actual: any) {
  if (expected.length !== actual.length) {
    return false;
  }

  if (expected.length === 0) {
    return true;
  }

  for (let i = 0; i < expected.length; i++) {
    if (expected[i] !== actual[i]) {
      return false;
    }
  }

  return true;
}

const versionBytes: Record<string, number> = {
  ed25519PublicKey: 6 << 3, // G
  ed25519SecretSeed: 18 << 3, // S
  preAuthTx: 19 << 3, // T
  sha256Hash: 23 << 3, // X
};

/**
 * StrKey is a helper class that allows encoding and decoding strkey.
 */
export class StrKey {
  /**
   * Encodes data to strkey ed25519 public key.
   * @param {Buffer} data data to encode
   * @returns {string}
   */
  static encodeEd25519PublicKey(data: Buffer) {
    return encodeCheck('ed25519PublicKey', data);
  }

  /**
   * Decodes strkey ed25519 public key to raw data.
   * @param {string} data data to decode
   * @returns {Buffer}
   */
  static decodeEd25519PublicKey(data: any) {
    return decodeCheck('ed25519PublicKey', data);
  }

  /**
   * Returns true if the given Stellar public key is a valid ed25519 public key.
   * @param {string} publicKey public key to check
   * @returns {boolean}
   */
  static isValidEd25519PublicKey(publicKey: Buffer) {
    return isValid('ed25519PublicKey', publicKey);
  }

  /**
   * Encodes data to strkey ed25519 seed.
   * @param {Buffer} data data to encode
   * @returns {string}
   */
  static encodeEd25519SecretSeed(data: Buffer) {
    return encodeCheck('ed25519SecretSeed', data);
  }

  /**
   * Decodes strkey ed25519 seed to raw data.
   * @param {string} data data to decode
   * @returns {Buffer}
   */
  static decodeEd25519SecretSeed(data: any) {
    return decodeCheck('ed25519SecretSeed', data);
  }

  /**
   * Returns true if the given Stellar secret key is a valid ed25519 secret seed.
   * @param {string} seed seed to check
   * @returns {boolean}
   */
  static isValidEd25519SecretSeed(seed: Buffer) {
    return isValid('ed25519SecretSeed', seed);
  }

  /**
   * Encodes data to strkey preAuthTx.
   * @param {Buffer} data data to encode
   * @returns {string}
   */
  static encodePreAuthTx(data: Buffer) {
    return encodeCheck('preAuthTx', data);
  }

  /**
   * Decodes strkey PreAuthTx to raw data.
   * @param {string} data data to decode
   * @returns {Buffer}
   */
  static decodePreAuthTx(data: Buffer) {
    return decodeCheck('preAuthTx', data);
  }

  /**
   * Encodes data to strkey sha256 hash.
   * @param {Buffer} data data to encode
   * @returns {string}
   */
  static encodeSha256Hash(data: Buffer) {
    return encodeCheck('sha256Hash', data);
  }

  /**
   * Decodes strkey sha256 hash to raw data.
   * @param {string} data data to decode
   * @returns {Buffer}
   */
  static decodeSha256Hash(data: Buffer) {
    return decodeCheck('sha256Hash', data);
  }
}

function isValid(versionByteName: string, encoded: Buffer) {
  if (encoded && encoded.length != 56) {
    return false;
  }

  try {
    let decoded = decodeCheck(versionByteName, encoded);
    if (decoded.length !== 32) {
      return false;
    }
  } catch (err) {
    return false;
  }
  return true;
}

export function decodeCheck(versionByteName: string, encoded: Buffer) {
  if (typeof encoded !== 'string') {
    throw new TypeError('encoded argument must be of type String');
  }

  const decoded = base32decode(encoded);
  const versionByte = decoded[0];
  const payload = decoded.slice(0, -2);
  const data = payload.slice(1);
  const checksum = decoded.slice(-2);

  if (encoded != base32encode(decoded)) {
    throw new Error('invalid encoded string');
  }

  const expectedVersion = versionBytes[versionByteName];

  if (typeof expectedVersion === 'undefined') {
    throw new Error(
      `${versionByteName} is not a valid version byte name.  expected one of "accountId" or "seed"`
    );
  }

  if (versionByte !== expectedVersion) {
    throw new Error(
      `invalid version byte. expected ${expectedVersion}, got ${versionByte}`
    );
  }

  const expectedChecksum = calculateChecksum(payload);

  if (!verifyChecksum(expectedChecksum, checksum)) {
    throw new Error(`invalid checksum`);
  }

  return Buffer.from(data);
}

export function encodeCheck(versionByteName: string, data: Buffer) {
  if (!data) {
    throw new Error('cannot encode null data');
  }

  const versionByte = versionBytes[versionByteName];

  if (typeof versionByte === 'undefined') {
    throw new Error(
      `${versionByteName} is not a valid version byte name.  expected one of "ed25519PublicKey", "ed25519SecretSeed", "preAuthTx", "sha256Hash"`
    );
  }

  data = Buffer.from(data);
  const versionBuffer = Buffer.from([versionByte]);
  const payload = Buffer.concat([versionBuffer, data]);
  const checksum = calculateChecksum(payload);
  const unencoded = Buffer.concat([payload, checksum]);

  return base32encode(unencoded);
}

function calculateChecksum(payload: ArrayBuffer) {
  // This code calculates CRC16-XModem checksum of payload
  // and returns it as Buffer in little-endian order.
  const checksum = Buffer.alloc(2);
  checksum.writeUInt16LE(crc.crc16xmodem(payload), 0);
  return checksum;
}
