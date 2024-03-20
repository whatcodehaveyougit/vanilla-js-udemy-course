const container = document.querySelector('.container');
const img = document.querySelector('img');
const profileInfo = document.querySelector('.profile-info');
const nextBtn = document.querySelector('#next');

function* createPeopleIterator() {
  let index = 0;
  while (true) {
    yield people[index++ % people.length];
  }
}

const iterator = createPeopleIterator();

nextBtn.addEventListener('click', () => {
  const person = iterator.next().value;
  img.src = person.imageURL;
  profileInfo.querySelector('h3').textContent = person.name;
  profileInfo.querySelectorAll('p')[0].textContent = `${person.age} Years Old`;
  profileInfo.querySelectorAll('p')[1].textContent = `From ${person.location}`;
  profileInfo.querySelectorAll('p')[2].textContent = person.looking;
});

nextBtn.click();
