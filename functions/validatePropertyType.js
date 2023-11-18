// Importing createRulesetFunction from @stoplight/spectral-core
import pkg from '@stoplight/spectral-core';
import { debugDebug, debugError } from '../test/utils/debugUtils.js';
const { createRulesetFunction } = pkg;

/**
 * Custom Spectral function to validate the type of a specified property within a target object.
 * 
 * @summary Validates the type of a specified property in a target object.
 * 
 * @param {Object} targetVal - The target object to validate.
 * @param {Object} options - Options for the validation.
 * @param {string} options.propertyName - The name of the property to check for in the target objects.
 * @param {string} [options.propertyType] - The expected type of the property
 * 
 * @returns {Array<Object>} An array of result objects, empty if validation passes.
 */
const validatePropertyType = createRulesetFunction(
  {
    input: {
      type: 'object'
    },
    options: {
      type: 'object',
      properties: {
        propertyName: {
          type: 'string',
          description: 'The name of the property to check.'
        },
        propertyType: {
          type: 'string',
          description: 'The expected type of the property.'
        }
      },
      required: ['propertyName', 'propertyType']
    }
  },
  function validatePropertyType(targetVal, { propertyName, propertyType }) {

    // debugDebug(`\x1b[46mFunction Start: \x1b[4mvalidatePropertyType \x1b[0m\n`);

    // debugDebug(`\x1b[35mFunction Option - Property Name - Value:\x1b[36m ${propertyName}  \n\x1b[0m`);
    // debugDebug(`\x1b[35mFunction Option - Property Type - Value:\x1b[36m ${propertyType}  \n\x1b[0m`);

    debugDebug(`\x1b[35mJSONPath targetVal Details:\x1b[36m ${JSON.stringify(targetVal, null, 2)}\x1b[0m\n`);

    // debugDebug(`\x1b[35mHas Own Property:\x1b[36m ${Object.hasOwnProperty.call(targetVal, propertyName)}\x1b[0m\n`);

    let errors;

    if (Object.hasOwnProperty.call(targetVal, propertyName)) {

      const propertyValue = targetVal[propertyName];

      // debugDebug(`\x1b[35mProperty Value Type:\x1b[36m ${propertyValue.type}  \n\x1b[0m`);
      // debugDebug(`\x1b[35mProperty Name Contents:\x1b[36m ${JSON.stringify(propertyValue, null, 2)}  \n\x1b[0m`);
      // debugDebug(`\x1b[35mProperty Name Contents Type:\x1b[36m ${propertyValue.type}  \n\x1b[0m`);

      if (propertyValue.type !== propertyType) {

        errors = errors || [];
        debugError(`Property "${propertyName}" should be of type ${propertyType}, found type "${propertyValue.type}" instead.\x1b[0m\n`);
        errors.push({ message: `Property "${propertyName}" should be of type ${propertyType}, found type "${propertyValue.type}" instead.` });
      
      }
    
    }

    // debugDebug(`\x1b[46mFunction End: \x1b[4mvalidatePropertyType \x1b[0m\n`);

    return errors;
  
  }
);

export default validatePropertyType;
