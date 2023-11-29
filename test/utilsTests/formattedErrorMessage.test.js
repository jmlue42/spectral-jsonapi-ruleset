import { formattedErrorMessage } from '../utils/formattedErrorMessage.js';

describe('formattedErrorMessage Utils Test Suite:', function () {

  describe('standardError:', function () {

    it('should format a simple error message', function () {
  
      const error = new Error('Test error message');
      const formattedMessage = formattedErrorMessage(error);
      expect(formattedMessage).to.equal('Test error message');
  
    });

  });

  describe('complexError:', function () {

    it('should format an error message with escaped characters', function () {
        
      const error = new Error(`Error with \"escaped\" characters\nNew line`);
      const formattedMessage = formattedErrorMessage(error);
      expect(formattedMessage).to.equal(`Error with \"escaped\" characters\nNew line`);
  
    });

  });

  describe('nonStandardError:', function () {

    it('should handle non-string error messages', function () {

      const error = {
        message: {
          detail: 'Error detail',
          code: 500
        }
      };
      const formattedMessage = formattedErrorMessage(error);
      expect(formattedMessage).to.include('Error detail');
      expect(formattedMessage).to.include('500');
  
    });

  });

  describe('blankError:', function () {

    it('should return an empty string for error with no message', function () {
  
      const error = { };
      const formattedMessage = formattedErrorMessage(error);
      expect(formattedMessage).to.be.a('string').and.to.be.empty;
  
    });

  });

});
