const global = {
  currentPage: window.location.pathname
}

const navItems = document.querySelectorAll('.nav-link')

function highlightNavItem(){
  navItems.forEach((item) => {
    if(filterUrl(item.getAttribute('href')) === filterUrl(global.currentPage)){
      item.classList.add('active')
    }
  })
}

function filterUrl(url){
  return url.replace("/11-flixx-app-project/01-theme-overview-prep/flixx-app/", '');
}

function toggleSpinner(){
  // This does not remove it for some reason
  document.querySelector('.spinner').classList.toggle('show')
}

function removeSpinner(){
  document.querySelector('.spinner').classList.remove('show')
}

function formatNumberWithCommas(number) {
  return number.toString().replace(/\\B(?=(\\d{3})+(?!\\d))/g, ",");
}

function displayBackgroundImage(type, backgroundPath) {
  const overlayDiv = document.createElement('div');
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
  overlayDiv.style.backgroundSize = 'cover';
  overlayDiv.style.backgroundPosition = 'center';
  overlayDiv.style.backgroundRepeat = 'no-repeat';
  overlayDiv.style.height = '100vh';
  overlayDiv.style.width = '100vw';
  overlayDiv.style.position = 'absolute';
  overlayDiv.style.top = '0';
  overlayDiv.style.left = '0';
  overlayDiv.style.zIndex = '-1';
  overlayDiv.style.opacity = '0.1';

  if (type === 'movie') {
    document.querySelector('#movie-details').appendChild(overlayDiv);
  } else {
    document.querySelector('#show-details').appendChild(overlayDiv);
  }
}

async function displayMovieDetails(){
  const searchId = window.location.search.split('=')[1]
  const movie = await fetchAPIData(`movie/${searchId}`)
  const div = document.createElement('div');
  displayBackgroundImage('movie', movie.backdrop_path)
  console.log(movie);
  console.log(movie.adult)
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

async function displayPopularMovies(){
  toggleSpinner()
  const {results} = await fetchAPIData('movie/popular')
  console.log(results)
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

async function fetchAPIData(endpoint){
  const API_KEY = '3fba2112c4120089009c0ca88d8eefcd'
  const API_URL = 'https://api.themoviedb.org/3/'
  const res = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}`)
  const res2 = await res.json();
  return res2;
}



function init(){


  highlightNavItem()

  switch(filterUrl(global.currentPage)) {
    case '/':
      displayPopularMovies();
      console.log('home 1')
      break;
    case 'index.html':
      displayPopularMovies();
      console.log('home 2')
      break;
    case 'search.html':
      console.log('search')
      break;
    case 'movie-details.html':
      console.log('details')
      displayMovieDetails()
      break;
      case 'shows.html':
      console.log('Shows')
      break;
    default:
      // code block
  }
}

// Next step - Write first Fetch request



init();
