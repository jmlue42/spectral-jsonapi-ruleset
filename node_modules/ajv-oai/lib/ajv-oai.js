const Ajv = require('ajv');

const validator = require('./format-validator');

function AjvOAI({ metaSchema = 'json-schema-draft-04', ...optsIn } = {}) {
  const opts = Object.assign(
    {
      schemaId: 'auto',
      format: 'full',
      coerceTypes: true,
      unknownFormats: 'ignore',
      useDefaults: true,
    },
    optsIn,
  );
  const ajv = new Ajv(opts);

  try {
    // eslint-disable-next-line import/no-dynamic-require
    ajv.addMetaSchema(require(`ajv/lib/refs/${metaSchema}.json`), metaSchema);
  } catch (e) {
    throw new Error(`Meta schema ${metaSchema} not supported. ${e.message}`);
  }

  ajv.addFormat('int32', { type: 'number', validate: validator.int32 });
  ajv.addFormat('int64', { type: 'number', validate: validator.int64 });
  ajv.addFormat('float', { type: 'number', validate: validator.float });
  ajv.addFormat('double', { type: 'number', validate: validator.double });
  ajv.addFormat('byte', { type: 'string', validate: validator.byte });

  return ajv;
}

module.exports = AjvOAI;
