import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);

// Export chai's expect to be globally available
global.expect = chai.expect;
