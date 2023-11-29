import { getAllRulesets } from '../utils/getAllRulesets.js';

describe('getAllRulesets Utils:', function () {

  it('should return all rule names from a given ruleset', function () {
        
    const ruleset = {
      rules: {
        'rule-one': { },
        'rule-two': { }
      }
    };
    expect(getAllRulesets(ruleset)).to.deep.equal(['rule-one', 'rule-two']);

  });

  it('should return an empty array for an empty ruleset', function () {

    const ruleset = { rules: { } };
    expect(getAllRulesets(ruleset)).to.be.empty;

  });

  it('should return an empty array for invalid ruleset', function () {

    const ruleset = null;
    expect(getAllRulesets(ruleset)).to.be.empty;

  });

});
