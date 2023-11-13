/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { getRulesFromTestTitle } from '../utils/getRulesFromTestTitle';

describe('getRulesFromTestTitle', function () {

  it('should extract a single rule name from a simple title', function () {

    const title = 'Test for |rule-name|';
    const rules = ['rule-name', 'another-rule'];
    expect(getRulesFromTestTitle(title, rules)).to.deep.equal(['rule-name']);
    
  });

  it('should extract multiple rule names from a complex title', function () {

    const title = 'Tests for |rule-one| and |rule-two|';
    const rules = ['rule-one', 'rule-two', 'rule-three'];
    expect(getRulesFromTestTitle(title, rules)).to.deep.equal(['rule-one', 'rule-two']);
    
  });

  it('should return an empty array if no rules match', function () {

    const title = 'Test for |nonexistent-rule|';
    const rules = ['rule-one', 'rule-two'];
    expect(getRulesFromTestTitle(title, rules)).to.be.empty;
    
  });

  it('should return an empty array if the title is empty', function () {

    const title = '';
    const rules = ['rule-one', 'rule-two'];
    expect(getRulesFromTestTitle(title, rules)).to.be.empty;
    
  });

  it('should return an empty array if there are no rules provided', function () {

    const title = 'Test for |rule-one|';
    const rules = [];
    expect(getRulesFromTestTitle(title, rules)).to.be.empty;
    
  });

});
