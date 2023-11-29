/* eslint-disable no-use-before-define */
/**
 * Retrieves and resolves the object pointed to by a `$ref` string in the root document.
 * It checks if the reference has already been resolved to avoid duplication and circular references.
 * If not, it navigates through the JSON structure based on the `$ref` path and returns the resolved object.
 * 
 * @param {string} ref - The `$ref` string specifying the path to the object.
 * @param {Object} root - The root document which contains the reference definitions.
 * @param {Set<string>} resolvedRefs - A set of resolved reference paths to detect circular references.
 * @param {Object} resolvedObjects - A map of previously resolved objects to reuse and prevent recursion.
 * @returns {Object} - The resolved object referred to by the `$ref` path.
 * @throws {Error} - If the reference path is invalid or the reference cannot be found in the root document.
 */
function getRefObject(ref, root, resolvedRefs, resolvedObjects) {

  // Check and return early if already resolved
  if (resolvedRefs.has(ref)) {

    return resolvedObjects[ref];
  
  }

  resolvedRefs.add(ref);

  // Resolve the path to the object
  const path = ref.replace(/^#\//u, '').split('/');
  let current = root;
  for (const segment of path) {

    if (!current || typeof current !== 'object') {

      throw new Error(`Invalid reference path: ${ref}`);
    
    }

    current = current[segment];
  
  }

  if (typeof current === 'undefined') {

    throw new Error(`Reference not found: ${ref}`);
    
  }

  const resolvedObject = resolveRef(current, root, resolvedRefs, resolvedObjects);
  resolvedObjects[ref] = resolvedObject;
    
  return resolvedObject;

}

/**
* Resolves references within an object. This function iterates over each property of the object.
* If the property is an object or array, it resolves any `$ref` references within it recursively.
* It uses the provided sets to track and reuse resolved references and to detect circular references.
* 
* @param {Object} obj - The object to resolve references in.
* @param {Object} root - The root document which contains the reference definitions.
* @param {Set<string>} resolvedRefs - A set of resolved reference paths to detect circular references.
* @param {Object} resolvedObjects - A map of previously resolved objects to reuse and prevent recursion.
* @returns {Object} - The object with resolved references.
*/
function resolveObject(obj, root, resolvedRefs, resolvedObjects) {

  const resolvedObj = {};
  for (const key in obj) {

    if (Object.prototype.hasOwnProperty.call(obj, key)) {

      resolvedObj[key] = resolveRef(obj[key], root, resolvedRefs, resolvedObjects);
    
    }
  
  }
  
  return resolvedObj;

}

/**
* Recursively resolves `$ref` references in an OpenAPI document. This function handles objects and arrays,
* resolving all `$ref` references found within. It supports nested structures and arrays, handles circular
* references, and removes resolved references from the `components` section if they are no longer needed.
* 
* @param {Object|Array} obj - The object or array to resolve references in.
* @param {Object} root - The root document which contains the reference definitions.
* @param {Set<string>} resolvedRefs - A set of resolved reference paths to detect circular references (default is an empty set).
* @param {Object} resolvedObjects - A map of previously resolved objects to reuse and prevent recursion (default is an empty object).
* @returns {Object|Array} - The object or array with resolved references.
*/
export function resolveRef(obj, root, resolvedRefs = new Set(), resolvedObjects = {}) {

  if (Array.isArray(obj)) {

    return obj.map((item) => {

      return resolveRef(item, root, resolvedRefs, resolvedObjects); 

    });
  
  } else if (obj && typeof obj === 'object') {

    if ('$ref' in obj) {

      const resolved = getRefObject(obj.$ref, root, resolvedRefs, resolvedObjects);
      // Remove the reference from 'components' if it's there
      if (obj.$ref.startsWith('#/components/')) {

        const path = obj.$ref.replace(/^#\/components\//u, '').split('/');
        let current = root.components;
        const lastSegment = path.pop();
        for (const segment of path) {

          current = current[segment];
        
        }
        delete current[lastSegment];
      
      }
      
      return resolved;
    
    }
    
    return resolveObject(obj, root, resolvedRefs, resolvedObjects);
  
  }
  
  return obj;

}
