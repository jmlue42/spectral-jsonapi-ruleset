/* eslint-disable no-console */
/* eslint-disable valid-jsdoc */
/* eslint-disable no-process-env */
/**
 * A utility module for handling debug logs with different levels (log, debug, warn, error, info).
 * Each level can be independently enabled via specific environment variables:
 * - LOG_DEBUG: Enables general logging.
 * - DEBUG_DEBUG: Enables detailed debugging messages.
 * - WARN_DEBUG: Enables warning messages.
 * - ERROR_DEBUG: Enables error messages.
 * - INFO_DEBUG: Enables informational messages.
 */

/**
 * Checks if a specific debug mode is enabled based on an environment variable.
 * @param {string} envVar - The environment variable to check.
 * @returns {boolean} True if the debug mode is enabled, false otherwise.
 */
const isDebugModeEnabled = (envVar) => {

  return process.env[envVar] === 'true';

};

/**
 * Logs a general message to the console if LOG_DEBUG is enabled.
 * @param {String} message - The message to log.
 */
export const debugLog = (message) => {

  if (isDebugModeEnabled('LOG_DEBUG')) {

    console.log(message);
  
  }

};

/**
 * Outputs a debugging message to the console if DEBUG_DEBUG is enabled.
 * @param {string} message - The debugging message to output.
 */
export const debugDebug = (message) => {

  if (isDebugModeEnabled('DEBUG_DEBUG')) {

    console.debug(message);
  
  }

};

/**
 * Outputs a warning message to the console if WARN_DEBUG is enabled.
 * @param {string} message - The warning message to output.
 */
export const debugWarn = (message) => {

  if (isDebugModeEnabled('WARN_DEBUG')) {

    console.warn(message);
  
  }

};

/**
 * Outputs an error message to the console if ERROR_DEBUG is enabled.
 * @param {string} message - The error message to output.
 */
export const debugError = (message) => {

  if (isDebugModeEnabled('ERROR_DEBUG')) {

    console.error(message);
  
  }

};

/**
 * Outputs an informational message to the console if INFO_DEBUG is enabled.
 * @param {string} message - The information message to output.
 */
export const debugInfo = (message) => {

  if (isDebugModeEnabled('INFO_DEBUG')) {

    console.info(message);
  
  }

};
