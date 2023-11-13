/**
 * Formats an error message for readability. It replaces escaped
 * characters with their unescaped counterparts.
 * 
 * @param {Error} error - The error object that needs formatting.
 * @returns {string} A formatted, human-readable error message.
 */
export function formattedErrorMessage(error) {

  // Convert error object to string if necessary
  const errorString = typeof error.message === 'string'
    ? error.message
    : JSON.stringify(error.message, null, 2);

  // Replace escaped characters like '\"' with '"'
  const readableErrorMessage = errorString.replace(/\\\\"/gu, '"').replace(/\\n/gu, '\n');

  // Log the error message if needed for debugging
  // console.log(`Spectral Error: ${readableErrorMessage}`);

  return readableErrorMessage;
  
}
