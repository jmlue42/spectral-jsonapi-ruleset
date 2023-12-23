// Errors - Processing Error  - https://jsonapi.org/format/#errors-processing

// All rules in the file MUST have corresponding tests

import { enumeration,length } from '@stoplight/spectral-functions';



export default {
  documentationUrl: 'https://jsonapi.org/format/#errors-processing',
  rules: {

        
  /** 
   Validates the HTTP status code indicating multiple errors for "4xx" responses 
   It ensures that general HTTP status code error is thrown for
   responses indicating multiple errors
  **/

    'errors-processing-errors-no-multiple-4xx-codes': {
      description: 'Responses should not contain multiple 4XX status codes',
      message: `{{path}} - {{description}}`,
      severity: 'error',
      given: "$..[?(@property >= '400' && @property <= '499')]..[*[?(@property == 'description')]]",
      then: {
        field: 'description',
       function: length,
         functionOptions: {
              max:1,
                               
                   
        }
      }
    },   

        
    /**
    Validates the HTTP status code indicating multiple errors for "5xx" responses 
    It ensures that general HTTP status code error is thrown for
    responses indicating multiple errors
    **/

    'errors-processing-errors-no-multiple-5xx-codes': 
  {
      description: 'Responses should not contain multiple 5XX status codes',
      message: `{{path}} - {{description}}`,
      severity: 'error',
      given: "$..[?(@property >= '500' && @property <= '599')]..[*[?(@property === 'description')]]",
      then: {
        field: '@key',
        function: length,
        functionOptions: {
           max:1,
          
                               
        }
      }
          }
        }
}






