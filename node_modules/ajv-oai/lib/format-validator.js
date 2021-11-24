const RANGES = require('./constants');

/**
 * OpenAPI 2.0 data types format
 * https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#data-types
 */

/**
 * Check that the data is integer and int32
 * @param {number} data
 * @returns {boolean}
 */
function int32(data) {
  return (
    Number.isInteger(+data) &&
    RANGES.int32.max.greaterThanOrEqualTo(data) &&
    RANGES.int32.min.lessThanOrEqualTo(data)
  );
}

/**
 * Check that the data is integer and int64
 * @param {number} data
 * @returns {boolean}
 */
function int64(data) {
  return (
    Number.isInteger(+data) &&
    RANGES.int64.max.greaterThanOrEqualTo(data) &&
    RANGES.int64.min.lessThanOrEqualTo(data)
  );
}

/**
 * Check that the data is float
 * @param {number} data
 * @returns {boolean}
 */
function float(data) {
  return (
    RANGES.float.max.greaterThanOrEqualTo(data) &&
    RANGES.float.min.lessThanOrEqualTo(data)
  );
}

/**
 * Check that the data is double
 * @param {number} data
 * @returns {boolean}
 */
function double(data) {
  return (
    RANGES.double.max.greaterThanOrEqualTo(data) &&
    RANGES.double.min.lessThanOrEqualTo(data)
  );
}

/**
 * Check that the data is string and base64 encoded characters.
 * https://github.com/chriso/validator.js/blob/master/src/lib/isBase64.js
 * @param {string} data
 * @returns {boolean}
 */
function byte(data) {
  /* eslint-disable no-useless-escape */
  const notBase64 = /[^A-Z0-9+\/=]/i;
  /* eslint-enable no-useless-escape */

  const len = data.length;
  if (!len || len % 4 !== 0 || notBase64.test(data)) {
    return false;
  }
  const firstPaddingChar = data.indexOf('=');
  return firstPaddingChar === -1 ||
    firstPaddingChar === len - 1 ||
    (firstPaddingChar === len - 2 && data[len - 1] === '=');
}

module.exports = {
  int32,
  int64,
  float,
  double,
  byte,
};
