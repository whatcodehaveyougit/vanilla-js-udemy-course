const fizzBuzz = require('./fizzbuzz')

describe('fizzbuzz', () => {
  it('should be a function', () => {
    expect(typeof fizzBuzz).toEqual('function')
  })
  it('should return the number if not divisable by 3 or 5', () => {
    expect(fizzBuzz(1)).toEqual(1)
  });
  it('should return Fizz if divisible by 3', () => {
    expect(fizzBuzz(12)).toEqual('Fizz')
  })
  it('should return Buzz if divisible by 5', () => {
    expect(fizzBuzz(20)).toEqual('Buzz')
  })
  it('should return FizzBuzz if divisible by 3 & 5', () => {
    expect(fizzBuzz(15)).toEqual('FizzBuzz');
  });
})