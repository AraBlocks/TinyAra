const { Cert } = require('@0xcert/cert')

/**
 * The default JSON Schema
 * @public
 * @type {Object}
 */
const schema = Object.freeze({
  type: 'object',
  properties: {
    name: {
      type: 'string'
    }
  }
})

/**
 * A certificate container for various uses in Tiny Ara.
 * @public
 * @class Certificate
 * @extends Cert
 * @see {https://docs.0xcert.org/framework/v2/api/certification.html}
 */
class Certificate extends Cert {

  /**
   * A readonly instance of the default Certificate schema.
   * @public
   * @accessor
   * @type {Object}
   */
  static get schema() {
    return schema
  }

  /**
   * Creates a `Certificate` instance from a variety of input.
   * @public
   * @static
   * @param {?(Object)} input
   * @return {Certificate}
   */
  static from(input) {
    return new this(input)
  }

  /**
   * `Certificate` class constructor.
   * @protected
   * @constructor
   * @param {Object} opts
   * @see {https://docs.0xcert.org/framework/v2/api/certification.html}
   */
  constructor(opts) {
    super({ schema, ...opts })
  }
}

/**
 * A module to provide an API and data model for certificates.
 * @module certificate
 * @example
 * TODO
 */
module.exports = {
  Certificate,
  schema
}
