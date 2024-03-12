import { displayMovieDetails } from './movie-details-utils.js'
import { displayPopularMovies, displayPopularShows } from './home-page-utils.js'
import { displayShowDetails } from './show-details-utils.js'
import { fetchAPIData } from './generic-utils.js'

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
  // console.log(url)
  return url.replace("sigurd-project/flixx-app/", '');
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

function initSwiper(){
  const swiper = new Swiper('.swiper', {
    slidesPerView: 3,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      500: {
        slidesPerView: 2
      },
      700: {
        slidesPerView: 3
      },
      900: {
        slidesPerView: 4
      },
      }
    })
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
