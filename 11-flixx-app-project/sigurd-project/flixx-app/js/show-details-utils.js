
import { fetchAPIData, formatNumberWithCommas } from './generic-utils.js'
import {displayBackgroundImage} from "./generic-utils.js"


async function displayShowDetails(){
  const searchId = window.location.search.split('=')[1]
  const show = await fetchAPIData(`tv/${searchId}`)
  const div = document.createElement('div');
  displayBackgroundImage('tv', show.backdrop_path)

  div.innerHTML =
    `<div class="details-top">
    <div>
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
    </div>
    <div>
      <h2>${show.name}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${show.vote_average} / 10
      </p>
      <p class="text-muted">Last Air Date: ${show.last_air_date}</p>
      <p>
        ${show.overview}
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
        ${show.genres.map((genre) => `<li>${genre.name}</li>`).join()}
      </ul>
      <a href="${show.homepage}" target="_blank" class="btn">Visit show Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>show Info</h2>
    <ul>
      <li><span class="text-secondary">Status:</span> Released</li>
    </ul>
    ${ show.production_companies.length ?
      `<h4>Production Companies</h4>
      <div class="list-group">${show.production_companies.map((company) => `<span>${company.name}</span>`)}</div>`
      : ''
    }

  </div>`
  document.querySelector('#show-details').appendChild(div)
}

export { displayShowDetails }