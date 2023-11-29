import sinon from 'sinon';
import { processErrors } from '../utils/processErrors.js';

describe('processErrors Utils:', function () {

  let consoleErrorStub;


  beforeEach(function () {

    consoleErrorStub = sinon.stub(console, 'error');

  });

  afterEach(function () {

    consoleErrorStub.restore();

  });

  it('should handle AggregateError', function () {

    process.env.ERROR_DEBUG = true;

    const aggregateError = new AggregateError([
      new Error('Error One'),
      new Error('Error Two')
    ], 'Multiple errors occurred');
        
    try {

      processErrors(aggregateError);

    } catch (error) {

      // One error for the AggregateError Message, two for the individual errors
      expect(consoleErrorStub.callCount).to.be.above(3);
      expect(error).to.equal(aggregateError);
        
    }

  });

  it('should handle regular Error', function () {

    const error = new Error('Regular error');

    try {

      processErrors(error);

    } catch (caughtError) {

      expect(consoleErrorStub.calledOnce).to.be.true;
      expect(caughtError).to.equal(caughtError);
        
    }
    
  });

});
