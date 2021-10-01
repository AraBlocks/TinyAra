const ethers = require('ethers')

/**
 * Gets the default provider based on the environment.
 * @public
 * @param {?(Object)} opts
 * @return Provider
 */
function getDefaultProvider(opts) {
  if ('undefined' !== typeof window && window.ethereum) {
    return getProvider({ ethereum: window.ethereum })
  } else {
    return getProvider(opts)
  }
}

/**
 * Gets a provider based on input opts
 * @param {?(Object)} opts
 * @return Provider
 */
function getProvider(opts, ...args) {
  if (opts && (opts.ethereum || opts.web3)) {
    return new ethers.provider.Web3Provider(opts.ethereum || opts.web3)
  }

  return new ethers.provider.JsonRpcProvider(opts && opts.url, ...args)
}

/**
 * A factory module for getting various providers.
 * @module provider
 * @example
 * const { getDefaultProvider, getProvider } = require('tinyara/provider')
 *
 * const defaultProvider = getDefaultProvider()
 * const rpcProvider = getProvider('http://my-rpc-provider')
 */
module.exports = {
  getDefaultProvider,
  getProvider
}
