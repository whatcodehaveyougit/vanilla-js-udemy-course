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
  return url.replace("/11-flixx-app-project/sigurd-project/flixx-app/", '');
}


function init(){

  highlightNavItem()

  switch(filterUrl(global.currentPage)) {
    case '/':
      console.log('home here')
      displayPopularMovies();
      displayPopularShows();
      console.log('home 1')
      break;
    case 'index.html':
      displayPopularMovies();
      displayPopularShows();
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
      displayShowDetails()
      console.log('Shows')
      break;
    default:
      // code block
  }
}


init();
