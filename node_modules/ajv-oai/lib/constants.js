const Decimal = require('decimal.js');

// Numeric type ranges
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures
// https://msdn.microsoft.com/en-us/library/s3f49ktz.aspx
// https://en.wikipedia.org/wiki/C_data_types

const RANGES = {
  byte: {
    min: new Decimal('-128'),
    max: new Decimal('127'),
  },

  int32: {
    min: new Decimal('-2147483648'),
    max: new Decimal('2147483647'),
  },

  int64: {
    min: new Decimal('-9223372036854775808'),
    max: new Decimal('9223372036854775807'),
  },

  float: {
    min: new Decimal(2).pow(128).negated(),
    max: new Decimal(2).pow(128),
  },

  double: {
    min: new Decimal(2).pow(1024).negated(),
    max: new Decimal(2).pow(1024),
  },
};

module.exports = RANGES;
