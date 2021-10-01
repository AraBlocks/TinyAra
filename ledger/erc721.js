const { GenericProvider } = require('@0xcert/ethereum-generic-provider')
const { AssetLedger } = require('@0xcert/ethereum-asset-ledger')

const { getDefaultProvider } = require('../provider')

/**
 * A mapping of tokens and their network addresses
 * @public
 * @type {Object}
 */
const tokens = { }

/**
 * A factory for creating a `AssetLedger` instance for new or
 * known ERC721 ledgers.
 * @param {String} token
 * @param {?(Object)} opts
 * @return {AssetLedger}
 * @throws TypeError
 * @see {https://docs.0xcert.org/framework/v2/api/ethereum-connectors.html#asset-ledger}
 */
function createERC721Ledger(token, opts) {
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

  return new AssetLedger(provider, ledgerId)
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
 *A module to provide higher level APIs for working value (fungible) tokens.
 * @module erc721
 * @example
 * const { createERC721Ledger } = require('tinyara/ledger/erc721')
 * const ledger = createERC721Ledger('NFT token contract address') // mainnet by default
 * ledger.getInfo().then(console.log) // returns info like, supply
 */
module.exports = {
  createERC721Ledger,
  defineToken,
  tokens
}
