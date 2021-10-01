const bip39 = require('bip39')

const { Wallet } = require('./wallet')
const crypto = require('./crypto')

/**
 * A container for a Tiny Ara identity.
 * @public
 * @class Identity
 */
class Identity {

  /**
   * Creates a new `Identity` from various input.
   * @param {Buffer|String|Object} input
   * @param {?(Object)} opts
   * @return {Identity}
   * @throws TypeError
   */
  static from(input, opts) {
    if ('string' === typeof input && /^[0-9|a-f]$/ig.test(input)) {
      input = Buffer.from(input, 'hex')
    }

    if (Buffer.isBuffer(input)) {
      if (32 === input.length) {
        const publicKey = input
        return new this({ publicKey, ...opts })
      } else if (64 === input.length) {
        const publicKey = input.slice(32)
        const secretKey = input
        return new this({ publicKey, secretKey, ...opts })
      }
    }

    if (input && 'object' === typeof input && !Array.isArray(input)) {
      return new this({ ...input, ...opts })
    }

    throw new TypeError('Identity.from(): Invalid input given.')
  }

  /**
   * `Identity` class constructor.
   * @protected
   * @constructor
   * @param {?(Object)} opts
   * @param {?(Buffer)} opts.publicKey
   * @param {?(Buffer)} opts.secretKey
   */
  constructor(opts) {
    this.publicKey = opts.publicKey || null
    this.secretKey = opts.secretKey || null
  }

  /**
   * A reference to the identifier string of this identity.
   * @type {?(String)}
   */
  get identifier() {
    return this.publicKey && this.publicKey.toString('hex')
  }

  /**
   * A reference to the DID string of this identity.
   * @type {?(String)}
   */
  get did() {
    const { identifier } = this
    return identifier && `did:ara:${identifier}`
  }
}

/**
 * Creates a new _Tiny Ara Identity_ from given options.
 * @async
 * @public
 * @param {?(Object)} opts
 * @param {?(String|Buffer)} opts.mnemonic
 * @return {Identity}
 */
async function create(opts) {
  if (!opts || 'object' !== typeof opts) {
    opts = {}
  }

  let { mnemonic } = opts

  if (mnemonic) {
    if (Buffer.isBuffer(mnemonic)) {
      mnemonic = mnemonic.toString()
    }

    if (!bip39.validateMnemonic(mnemonic)) {
      throw new TypeError('create: Invalid mnemonic given.')
    }
  } else {
    mnemonic = bip39.generateMnemonic()
  }

  const seed = crypto.blake2b(await bip39.mnemonicToSeed(mnemonic))
  const { publicKey, secretKey } = crypto.keyPair(seed)
  const identity = Identity.from({ publicKey, secretKey }, opts)
  const wallet = Wallet.fromMnemonic(mnemonic)

  return { identity, wallet }
}

/**
 * A module to provide identity functions for Tiny Ara.
 * @module identity
 * @example
 * TODO
 */
module.exports = {
  create,
  Identity
}
