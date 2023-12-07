import { getRulesFromTestTitle } from '../utils/getRulesFromTestTitle.js';

describe('getRulesFromTestTitle Utils:', function () {

  it('should return an array with a single rule name if it is in the rules list', function () {

    const ruleName = 'rule-name';
    const rules = ['rule-name', 'another-rule'];
    expect(getRulesFromTestTitle(ruleName, rules)).to.deep.equal(['rule-name']);

  });
  
  it('should return an empty array if the rule name is not in the rules list', function () {

    const ruleName = 'nonexistent-rule';
    const rules = ['rule-one', 'rule-two'];
    expect(getRulesFromTestTitle(ruleName, rules)).to.be.empty;

  });
  
  it('should return an empty array if no rule name is provided', function () {

    const ruleName = '';
    const rules = ['rule-one', 'rule-two'];
    expect(getRulesFromTestTitle(ruleName, rules)).to.be.empty;

  });
  
  it('should return an empty array if there are no rules provided', function () {

    const ruleName = 'rule-one';
    const rules = [];
    expect(getRulesFromTestTitle(ruleName, rules)).to.be.empty;
    
  });

});
