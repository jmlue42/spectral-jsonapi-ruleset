  //Importing createRulesetFunction from @stoplight/spectral-core
  import pkg from "@stoplight/spectral-core"
  import { debugDebug } from "../test/utils/debugUtils.js";
  
  const { createRulesetFunction } = pkg;
  
  const noMultiple4xxStatusCodes = createRulesetFunction(
  
    {
      input: null,
      options: null
    },
    function noMultiple4xxStatusCodes(targetVal, options, context) {
      const errors = [];
      let count4xx = 0;
  
      
      debugDebug(`Targe Val: ${JSON.stringify(targetVal, null, 2)}`);
  
      for (const statusCode in targetVal) {
        if (statusCode.startsWith('4')){
          count4xx++;
        }
      }
  
      debugDebug(`Count Status Codes: ${JSON.stringify(count4xx, null, 2)}`);
  
      if(count4xx > 1) {
        errors.push({
          message: `Multiple 4xx status codes are not alllowed in the same response.`,
          path: context.path
        })
      }
  
      debugDebug(`Pushed Error: ${JSON.stringify(errors, null, 2)}`);
  
      return errors;
    }
  );
  
  export default noMultiple4xxStatusCodes;
 
   
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
  