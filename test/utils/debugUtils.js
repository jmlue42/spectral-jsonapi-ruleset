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
 * @return {void}
 */
export const debugLog = (message) => {

  if (isDebugModeEnabled('LOG_DEBUG')) {

    console.log(`\x1b[33m[\x1b[0m  \x1b[1mLOG \x1b[0m\x1b[33m ] \x1b[0m${message}`);
  
  }

};

/**
 * Outputs a debugging message to the console if DEBUG_DEBUG is enabled.
 * @param {string} message - The debugging message to output.
 * @return {void}
 */
export const debugDebug = (message) => {

  if (isDebugModeEnabled('DEBUG_DEBUG')) {

    console.debug(`\x1b[36m[\x1b[0m  \x1b[1mDEBUG \x1b[0m\x1b[36m ] \x1b[35m${message}\x1b[0m`);
  
  }

};

/**
 * Outputs a warning message to the console if WARN_DEBUG is enabled.
 * @param {string} message - The warning message to output.
 * @return {void}
 */
export const debugWarn = (message) => {

  if (isDebugModeEnabled('WARN_DEBUG')) {

    console.warn(message);
  
  }

};

/**
 * Outputs an error message to the console if ERROR_DEBUG is enabled.
 * @param {string} message - The error message to output.
 * @return {void}
 */
export const debugError = (message) => {

  if (isDebugModeEnabled('ERROR_DEBUG')) {

    console.error(`\x1b[31m[\x1b[0m  \x1b[1mERROR \x1b[0m\x1b[31m ] \x1b[33m${message}\x1b[0m`);
  
  }

};

/**
 * Outputs an informational message to the console if INFO_DEBUG is enabled.
 * @param {string} message - The information message to output.
 * @return {void}
 */
export const debugInfo = (message) => {

  if (isDebugModeEnabled('INFO_DEBUG')) {

    console.info(`\x1b[32m[\x1b[0m  \x1b[1mINFO \x1b[0m\x1b[32m ] \x1b[36m${message}\x1b[0m`);
  
  }

};
