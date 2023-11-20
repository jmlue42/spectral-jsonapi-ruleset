import sinon from 'sinon';
import * as debugUtils from '../utils/debugUtils.js';

describe('debug Utils Test Suite:', function () {

  let consoleStub;

  beforeEach(function () {

    // Setup stubs for console methods before each test
    consoleStub = {
      log: sinon.stub(console, 'log'),
      debug: sinon.stub(console, 'debug'),
      info: sinon.stub(console, 'info'),
      warn: sinon.stub(console, 'warn'),
      error: sinon.stub(console, 'error')
    };

  });

  afterEach(function () {

    // Restore the original console methods after each test
    consoleStub.log.restore();
    consoleStub.debug.restore();
    consoleStub.info.restore();
    consoleStub.warn.restore();
    consoleStub.error.restore();

  });

  describe('debugLog:', function () {

    it('should call console.log when LOG_DEBUG is enabled', function () {

      process.env.LOG_DEBUG = 'true';
      debugUtils.debugLog('Log Message');
      expect(consoleStub.log.calledWith('Log Message')).to.be.true;
    
    });
    
    it('should call console.log when LOG_DEBUG is disabled', function () {
    
      process.env.LOG_DEBUG = 'false';
      debugUtils.debugLog('Log Message');
      expect(consoleStub.log.called).to.be.false;
    
    });

  });

  describe('debugDebug:', function () {

    it('should call console.debug when DEBUG_DEBUG is enabled', function () {

      process.env.DEBUG_DEBUG = 'true';
      debugUtils.debugDebug('Debug Message');
      expect(consoleStub.debug.calledWith('\x1b[35mDebug Message\x1b[0m')).to.be.true;
    
    });
    
    it('should call console.debug when DEBUG_DEBUG is disabled', function () {
    
      process.env.DEBUG_DEBUG = 'false';
      debugUtils.debugDebug('Debug Message');
      expect(consoleStub.debug.called).to.be.false;
    
    });

  });

  describe('debugInfo:', function () {

    it('should call console.info when INFO_DEBUG is enabled', function () {

      process.env.INFO_DEBUG = 'true';
      debugUtils.debugInfo('Info Message');
      expect(consoleStub.info.calledWith('Info Message')).to.be.true;
    
    });
    
    it('should call console.info when INFO_DEBUG is disabled', function () {
    
      process.env.INFO_DEBUG = 'false';
      debugUtils.debugInfo('Info Message');
      expect(consoleStub.info.called).to.be.false;
    
    });

  });

  describe('debugWarn:', function () {

    it('should call console.warn when WARN_DEBUG is enabled', function () {

      process.env.WARN_DEBUG = 'true';
      debugUtils.debugWarn('Warn Message');
      expect(consoleStub.warn.calledWith('Warn Message')).to.be.true;
    
    });
    
    it('should call console.warn when WARN_DEBUG is disabled', function () {
    
      process.env.WARN_DEBUG = 'false';
      debugUtils.debugWarn('Warn Message');
      expect(consoleStub.warn.called).to.be.false;
    
    });

  });

  describe('debugError:', function () {

    it('should call console.error when ERROR_DEBUG is enabled', function () {

      process.env.ERROR_DEBUG = 'true';
      debugUtils.debugError('Error Message');
      expect(consoleStub.error.calledWith('\x1b[31m[\x1b[0m  \x1b[1mERROR \x1b[0m\x1b[31m ] \x1b[33mError Message\x1b[0m')).to.be.true;
    
    });
    
    it('should call console.error when ERROR_DEBUG is disabled', function () {
    
      process.env.ERROR_DEBUG = 'false';
      debugUtils.debugError('Error Message');
      expect(consoleStub.error.called).to.be.false;
    
    });

  });

});
