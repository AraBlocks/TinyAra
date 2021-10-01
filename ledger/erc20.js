const { GenericProvider } = require('@0xcert/ethereum-generic-provider')
const { ValueLedger } = require('@0xcert/ethereum-value-ledger')

const { getDefaultProvider } = require('../provider')

/**
 * A mapping of tokens and their network addresses
 * @public
 * @type {Object}
 */
const tokens = {
  ARA: {
    networks: {
      mainnet: '0xa92e7c82b11d10716ab534051b271d2f6aef7df5',
      ropsten: '0x06be7386f99c38d26d53d83cbf1b9f438930694b'
    }
  },

  DAI: {
    networks: {
      mainnet: '0x6b175474e89094c44da98b954eedeac495271d0f',
      ropsten: '0xad6d458402f60fd3bd25163575031acdce07538d'
    }
  },

  USDC: {
    networks: {
      mainnet: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      ropsten: '0xfe724a829fdf12f7012365db98730eee33742ea2'
    }
  },

  WETH: {
    network: {
      mainnet: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      ropsten: '0x0a180a76e4466bf68a7f86fb029bed3cccfaaac5'
    }
  }
}

/**
 * Defines a token mapping.
 * @public
 * @param {String} token
 * @param {Object} definition
 */
function defineToken(token, definition) {
  tokens[token] = {
    ...definition
  }

  return tokens[token]
}

/**
 * A factory for creating a `ValueLedger` instance for new or
 * known ERC20 ledgers.
 * @param {String} token
 * @param {?(Object)} opts
 * @return {ValueLedger}
 * @throws TypeError
 * @see {https://docs.0xcert.org/framework/v2/api/ethereum-connectors.html#value-ledger}
 */
function createERC20Ledger(token, opts) {
  if (!opts || 'object' !== typeof opts) {
    opts = {}
  }

  if ('string' !== typeof token) {
    throw new TypeError('Expecting token to be a string.')
  }

  const provider = opts.provider instanceof GenericProvider
    ? opts.provider
    : new GenericProvider({ ...opts, client: opts.provider || getDefaultProvider() })

  // determine ledger ID from options or network mapping
  // falling back to `token` input as an address
  const ledgerId = (
    opts.ledgerId ||
    opts.token ||
    tokens[token.toUpperCase()].networks[opts.network || 'mainnet'] ||
    token
  )

  if ('string' !== typeof ledgerId) {
    throw new TypeError('Expecting token name or ledger ID to be a string.')
  }

  return new ValueLedger(provider, ledgerId)
}

/**
 * Returns a ledger for the ARA token.
 * @public
 * @param {?(Object)} opts
 * @see {createERC20Ledger}
 * @return {ValueLedger}
 */
function ara(opts) {
  return createERC20Ledger('ARA', opts)
}

/**
 * Returns a ledger for the DAI token.
 * @public
 * @param {?(Object)} opts
 * @see {createERC20Ledger}
 * @return {ValueLedger}
 */
function dai(opts) {
  return createERC20Ledger('DAI', opts)
}

/**
 * Returns a ledger for the USDC token.
 * @public
 * @param {?(Object)} opts
 * @see {createERC20Ledger}
 * @return {ValueLedger}
 */
function usdc(opts) {
  return createERC20Ledger('USDC', opts)
}

/**
 * Returns a ledger for the WETH token.
 * @public
 * @param {?(Object)} opts
 * @see {createERC20Ledger}
 * @return {ValueLedger}
 */
function weth(opts) {
  return createERC20Ledger('WETH', opts)
}

/**
 *A module to provide higher level APIs for working value (fungible) tokens.
 * @module erc20
 * @example
 * const { createERC20Ledger } = require('tinyara/ledger/erc20')
 * const ledger = createERC20Ledger('ara') // mainnet by default
 *
 * ledger.getBalance('some address').then(console.log)
 */
module.exports = {
  createERC20Ledger,
  defineToken,
  tokens,

  ara,
  dai,
  usdc,
  weth
}
