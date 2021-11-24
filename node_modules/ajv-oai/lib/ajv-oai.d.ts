import * as ajv from 'ajv';

declare var ajvOAI: {
  new (options?: ajv.Options & { metaSchema?: string }): ajv.Ajv;
};

export = ajvOAI;
