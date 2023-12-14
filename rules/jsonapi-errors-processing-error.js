// Errors - Processing Error  - https://jsonapi.org/format/#errors-processing

// All rules in the file MUST have corresponding tests

import { enumeration, length,pattern,truthy } from '@stoplight/spectral-functions';
import noMultiple4xxStatusCodes from '../functions/noMultiple4xxStatusCodes.js';
import noMultiple5xxStatusCodes from '../functions/noMultiple5xxStatusCodes.js';


export default {
  documentationUrl: 'https://jsonapi.org/format/#errors-processing',
  rules: {

    /**
     * Checks that error processing are structured correctly within the response.
     * Specifically, it ensures that the 'errors' key is an array, adhering
     * to the JSON:API specification.
     **/
    
/** Validates the HTTP status code indicating multiple errors for "4xx" responses 
 It ensures that general HTTP status code error is thrown for
  resposnes indicating multiple errors
**/

    'errors-processing-errors-no-multiple-4xx-codes': {
      description: 'Responses should not contain multiple 4XX status codes',
      message: `{{path}} - {{description}}`,
      severity: 'error',
       given: "$.paths.*.*.responses",
        then: {
        function: noMultiple4xxStatusCodes
      }
    },



    /**
      Checks that error processing are structured correctly within the response.
      Specifically, it ensures that the 'errors' key is an array, adhering
      to the JSON:API specification.
     **/
    /**
 Validates the HTTP status code indicating multiple errors for "5xx" responses 
 It ensures that general HTTP status code error is thrown for
  resposnes indicating multiple errors
**/

    'errors-processing-errors-no-multiple-5xx-codes': {
      description: 'Responses should not contain multiple 5XX status codes',
      message: `{{path}} - {{description}}`,
      severity: 'error',
      given: "$.paths.*.*.responses",
      then: {
        function: noMultiple5xxStatusCodes
      }
    },

  }
}
    


  

  















  
    



