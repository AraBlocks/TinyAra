const { Certificate } = require('./certificate')
const { Identity } = require('./identity')
const { Wallet } = require('./wallet')
const { DID } = require('./did')
const ledger = require('./ledger')
const crypto = require('./crypto')

/**
 * A collection of modules for working with Ara.
 * @module tinyara
 */
module.exports = {
  Certificate,
  crypto,
  DID,
  Identity,
  ledger,
  Wallet,
}
