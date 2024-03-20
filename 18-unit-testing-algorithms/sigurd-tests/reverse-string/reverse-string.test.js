const reverseString1 = require('./reverse-string')

describe('test reverse string functions', () => {
  it('should be a function', () => {
    expect(typeof reverseString1).toEqual('function')
  })
  it('should return a string', () => {
    expect(typeof reverseString1('hello')).toEqual('string')
  })
  it('should return correct value', () => {
    expect(reverseString1('he')).toEqual('eh')
  })
})