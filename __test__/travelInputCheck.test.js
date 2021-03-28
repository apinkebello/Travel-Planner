import { checkInputText } from '../src/client/js/travelCheck.js';

describe('RegExp: input', function () {
  it('should be a string', function () {
    
    expect(checkInputText('London','Lagos')).toBeFalsy();
  });
});
