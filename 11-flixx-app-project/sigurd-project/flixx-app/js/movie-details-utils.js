import {displayBackgroundImage} from "./generic-utils.js"
import { fetchAPIData, formatNumberWithCommas } from './generic-utils.js'

export async function displayMovieDetails(){
  const searchId = window.location.search.split('=')[1]
  const movie = await fetchAPIData(`movie/${searchId}?`)
  const div = document.createElement('div');
  displayBackgroundImage('movie', movie.backdrop_path)
  // console.log(movie);
  // console.log(movie.adult)
  div.innerHTML =
    `<div class="details-top">
    <div>
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
    </div>
    <div>
      <h2>${movie.title}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${movie.vote_average} / 10
      </p>
      <p class="text-muted">Release Date: XX/XX/XXXX</p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
        atque molestiae error debitis provident dolore hic odit, impedit
        sint, voluptatum consectetur assumenda expedita perferendis
        obcaecati veritatis voluptatibus. Voluptatum repellat suscipit,
        quae molestiae cupiditate modi libero dolorem commodi obcaecati!
        Ratione quia corporis recusandae delectus perspiciatis consequatur
        ipsam. Cumque omnis ad recusandae.
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
        ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join()}
      </ul>
      <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>Movie Info</h2>
    <ul>
      <li><span class="text-secondary">Budget:</span>$${formatNumberWithCommas(movie.budget)}</li>
      <li><span class="text-secondary">Revenue:</span>$${formatNumberWithCommas(movie.revenue)}</li>
      <li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes</li>
      <li><span class="text-secondary">Status:</span> Released</li>
    </ul>
    ${ movie.production_companies.length ?
      `<h4>Production Companies</h4>
      <div class="list-group">${movie.production_companies.map((company) => `<span>${company.name}</span>`)}</div>`
      : ''
    }

  </div>`
  console.log(searchId)
  document.querySelector('#movie-details').appendChild(div)
}

