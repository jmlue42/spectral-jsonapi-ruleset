/* eslint-disable no-undef */
/* eslint-disable no-console */

import { debugError } from './debugUtils.js';

/**
 * Processes and logs errors, specifically handling AggregateErrors separately.
 * This function checks if the provided error is an instance of AggregateError. If so,
 * it iterates over each individual error within the aggregate and logs them separately.
 * For all other types of errors, it logs them as unexpected errors. This utility is
 * particularly useful for handling and debugging multiple errors that can occur during
 * Spectral setup or execution.
 *
 * @param {Error | AggregateError} error - The error object to process. Can be an instance of Error or AggregateError.
 *
 * Example Usage:
 * - To process a caught error in a try-catch block, call processErrors(error).
 *
 * Notes:
 * - This function re-throws the received error after logging, allowing for further handling or propagation.
 * - The function is designed to enhance error visibility, especially useful in complex asynchronous operations
 *   where multiple errors might occur and be wrapped in an AggregateError.
 * - Consider customizing the error logging or handling based on the application's needs.
 * @returns {void}
 */
export function processErrors(error) {

  if (error instanceof AggregateError) {

    for (const individualError of error.errors) {

      debugError('Aggregate error encountered: ', individualError);
      
    }
  
  } else {

    debugError('Unexpected error during Spectral setup: ', error);
  
  }

  // Re-throw the error or handle it as needed.
  throw error;

}
