import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { resolveRef } from './utils/refResolver.js';
import validApiDocument from './docs/validApiDocument.js';

chai.use(chaiAsPromised);

// Export chai's expect to be globally available
global.expect = chai.expect;

// Dereference the validApiDocument and make it globally available
global.dereferencedValidOpenApiDocument = resolveRef(validApiDocument, validApiDocument);
