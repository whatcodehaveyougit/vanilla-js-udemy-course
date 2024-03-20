function* generatorFunction(){
  yield 1;
  yield 2;
}

const generatorFunctionVar = generatorFunction();
console.log(generatorFunction().next())
console.log(generatorFunction().next())
console.log(generatorFunction().next())