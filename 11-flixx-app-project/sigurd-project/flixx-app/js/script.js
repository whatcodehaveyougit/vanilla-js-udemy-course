import { displayMovieDetails } from './movie-details-utils.js'
import { displayPopularMovies, displayPopularShows } from './home-page-utils.js'
import { displayShowDetails } from './show-details-utils.js'
import { fetchAPIData, filterUrl } from './generic-utils.js'
import { initSwiper } from './swiper-utils.js'

const global = {
  currentPage: window.location.pathname,
  search: {
    term: '',
    type: '',
    page: 1,
    totalPages: 1
  }
}

const navItems = document.querySelectorAll('.nav-link')

function highlightNavItem(){
  navItems.forEach((item) => {
    if(filterUrl(item.getAttribute('href')) === filterUrl(global.currentPage)){
      item.classList.add('active')
    }
  })
}

function showAlert(message, className){
  const alertEl = document.createElement('div');
  alertEl.classList.add('alert', className);
  alertEl.appendChild(document.createTextNode(message));
  document.querySelector('#alert').appendChild(alertEl);
  setTimeout(() => {
    alertEl.remove();
  }, 3000)
}

async function displaySlider(){
  const { results } = await fetchAPIData('movie/now_playing')
  console.log(results)
  results.forEach((result) => {
    const div = document.createElement('div');
    div.classList.add('swiper-slide');
    div.innerHTML = ` <a href="movie-details.html?id=${result.id}">
    <img src="https://image.tmdb.org/t/p/w500${result.poster_path}" alt="Movie Title" />
    </a>
    <h4 class="swiper-rating">
      <i class="fas fa-star text-secondary">${result.vote_average}</i>10
    </h4>`
    document.querySelector('.swiper-wrapper').appendChild(div);
  })
  initSwiper();
}


  async function search(){
    const queryString = window.location.search;
    console.log(queryString)
    const urlParams = new URLSearchParams(queryString);
    const type = urlParams.get('type');
    const searchTerm = urlParams.get('search-term');

    global.search.term = searchTerm;
    global.search.type = type;

    if (global.search.term !== '' && global.search.term !== null){
      //  Make Request
      const res = await fetchAPIData(`search/${global.search.type}`, `query=${global.search.term}&page=${global.search.page}&language=en-US`);
      console.log(res)
    } else {
      showAlert('No search term provided')
    }
    console.log(urlParams)
  }


function init(){

  highlightNavItem()
  console.log(filterUrl(global.currentPage))
  console.log('Init running')
  console.log('/shows-details.html' === filterUrl(global.currentPage))
  switch(filterUrl(global.currentPage)) {
    case '/':
      console.log('home here')
      displayPopularMovies();
      displayPopularShows();
      displaySlider();
      console.log('home 1')
      break;
    case '/index.html':
      displayPopularMovies();
      displayPopularShows();
      displaySlider();
      console.log('home 2')
      break;
    case '/shows.html':
      displayPopularShows();
      console.log('shows')
      break;
    case '/search.html':
      search()
      console.log('search')
      break;
    case '/movie-details.html':
      displayMovieDetails()
      break;
    case '/show-details.html':
      console.log('Shows')
      displayShowDetails()
      break;
    default:
      console.log('default')
      // code block
  }
}


init();
