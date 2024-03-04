
import { fetchAPIData } from './generic-utils.js';

function toggleSpinner(){
  // This does not remove it for some reason
  document.querySelector('.spinner').classList.toggle('show')
}

function removeSpinner(){
  document.querySelector('.spinner').classList.remove('show')
}

async function displayPopularMovies(){
  toggleSpinner()
  const {results} = await fetchAPIData('movie/popular')
  results.forEach((movie) => {
    const div = document.createElement('div')
    div.classList.add('card');
    div.innerHTML =
    `<a href="movie-details.html?id=${movie.id}">
        ${ movie.poster_path ?
          `<img
        src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
        class="card-img-top"
        alt=${movie.title}
      />` :
        `<img
        src="images/no-image.jpg"
        class="card-img-top"
        alt="Movie Title"
      />`}
    </a>
    <div class="card-body">
      <h5 class="card-title">${movie.title}</h5>
      <p class="card-text">
        <small class="text-muted">${movie.release_date}</small>
      </p>
    </div>`
    removeSpinner()
    document.querySelector('#popular-movies').appendChild(div)
    })
}

async function displayPopularShows(){
  toggleSpinner()
  console.log('helo')
  const {results} = await fetchAPIData('tv/popular')
  results.forEach((show) => {
    const div = document.createElement('div')
    div.classList.add('card');
    div.innerHTML =
    `<a href="show-details.html?id=${show.id}">
        ${ show.poster_path ?
          `<img
        src="https://image.tmdb.org/t/p/w500${show.poster_path}"
        class="card-img-top"
        alt=${show.name}
      />` :
        `<img
        src="images/no-image.jpg"
        class="card-img-top"
        alt="show Title"
      />`}
    </a>
    <div class="card-body">
      <h5 class="card-title">${show.name}</h5>
      <p class="card-text">
        <small class="text-muted">${show.first_air_date}</small>
      </p>
    </div>`
    removeSpinner()
    document.querySelector('#popular-shows').appendChild(div)
    })
}

export { displayPopularMovies, displayPopularShows}
