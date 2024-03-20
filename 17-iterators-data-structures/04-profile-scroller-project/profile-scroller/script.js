const people = [
  {
    name: 'Jamie Williams',
    age: 26,
    gender: 'female',
    location: 'Los Angeles, CA',
    imageURL: 'https://randomuser.me/api/portraits/women/1.jpg',
    looking: 'Female looking for male',
  },
  {
    name: 'John Smith',
    age: 35,
    gender: 'male',
    location: 'New York, NY',
    imageURL: 'https://randomuser.me/api/portraits/men/1.jpg',
    looking: 'Male looking for female',
  },
  {
    name: 'Bob Johnson',
    age: 42,
    gender: 'male',
    location: 'Chicago, IL',
    imageURL: 'https://randomuser.me/api/portraits/men/2.jpg',
    looking: 'Male looking for male',
  },
  {
    name: 'Shannon Jackson',
    age: 29,
    gender: 'female',
    location: 'Los Angeles, CA',
    imageURL: 'https://randomuser.me/api/portraits/women/2.jpg',
    looking: 'Female looking for female',
  },
];

const container = document.querySelector('.container');
const img = document.querySelector('img');
const profileInfo = document.querySelector('.profile-info');
const nextBtn = document.querySelector('#next');

function* createPersonIterator(){
  let index = 0;
  while(true){
    console.log(index , 'index')
    console.log(index++ % people.length)
    yield people[index++ % people.length];
  }
}

const iterator = createPersonIterator();

nextBtn.addEventListener('click', () => {
  const person = iterator.next().value;
  console.log(person)
})









// What does the % do ?

// In the provided code, the % symbol is the modulus operator. It calculates the remainder when the left operand (in this case, index) is divided by the right operand (in this case, people.length).

// In the context of the code snippet you shared, index++ % people.length ensures that the value of index stays within the range of valid indices for the people array. It allows the code to cycle through the array repeatedly, returning each person's information one by one.

// For example, if index is initially 0 and people.length is 4, the expression index++ % people.length will evaluate to 0. On the next iteration, index will be 1, and the expression will evaluate to 1. This process continues until index reaches the length of the people array, at which point it wraps around to 0 again.

// By using the modulus operator, the code ensures that the iterator createPersonIterator will always yield a valid person from the people array, regardless of the current value of index.