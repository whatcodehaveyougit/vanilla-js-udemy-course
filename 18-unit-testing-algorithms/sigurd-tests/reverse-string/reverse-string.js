function reverseString1(string){
  return string.split('').reverse().join('');
}

// string.split(''): This method splits the input string string into an array of individual characters. The argument '' specifies that the splitting should occur at each character boundary. For example, if string is "hello", this operation would result in the array ["h", "e", "l", "l", "o"].
// .reverse(): This method reverses the order of elements in the array obtained from the previous step. So, using the previous example, the array ["h", "e", "l", "l", "o"] would become ["o", "l", "l", "e", "h"].
// .join(''): This method joins all elements of the array into a single string. The argument '' specifies that there should be no separator between the joined elements. Therefore, the array ["o", "l", "l", "e", "h"] would be joined into the string "olleh".

module.exports = reverseString1