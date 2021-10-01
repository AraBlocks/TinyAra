const { Wallet } = require('ethers')

const fromEncryptedJson = Wallet.fromEncryptedJsonSync.bind(Wallet)
const fromPrivateKey = (privateKey, ...args) => new Wallet(privateKey, ...args)
const fromMnemonic = Wallet.fromMnemonic.bind(Wallet)

/**
 * @module wallet
 * @example
 *
 * const { fromMnemonic } = require('tinyara/wallet')
 * const walletPath = `m/44'/60'/0'/0/0` // index 0 (first account)
 * const wallet = fromMnemonic(mnemonicPhrase, walletPath)
 *
 * @example
 * const { Wallet } = require('tinyara/wallet')
 * const wallet = new Wallet(privateKey)
 */
module.exports = {
  fromEncryptedJson,
  fromPrivateKey,
  fromMnemonic,
  Wallet
}
