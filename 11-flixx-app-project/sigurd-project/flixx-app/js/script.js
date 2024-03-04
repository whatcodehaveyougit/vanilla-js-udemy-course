import { displayMovieDetails } from './movie-details-utils.js'
import { displayPopularMovies, displayPopularShows } from './home-page-utils.js'
import { displayShowDetails } from './show-details-utils.js'

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
  console.log(url)
  return url.replace("sigurd-project/flixx-app/", '');
}


function init(){

  highlightNavItem()
  console.log(filterUrl(global.currentPage))

  switch(filterUrl(global.currentPage)) {
    case '/':
      console.log('home here')
      displayPopularMovies();
      displayPopularShows();
      console.log('home 1')
      break;
    case '/index.html':
      displayPopularMovies();
      displayPopularShows();
      console.log('home 2')
      break;
    case '/shows.html':
      displayPopularShows();
      console.log('shows')
      break;
      case 'search.html':
    case 'search.html':
      console.log('search')
      break;
    case 'movie-details.html':
      console.log('details')
      displayMovieDetails()
      break;
      case 'shows-details.html':
      displayShowDetails()
      console.log('Shows')
      break;
    default:
      // code block
  }
}


init();
