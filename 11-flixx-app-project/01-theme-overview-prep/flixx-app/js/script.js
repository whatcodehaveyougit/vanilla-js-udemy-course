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

function init(){

  highlightNavItem()

  switch(filterUrl(global.currentPage)) {
    case '/':
      console.log('home 1')
      break;
    case 'index.html':
      console.log('home 2')
      break;
    case 'search.html':
      console.log('search')
      break;
    case 'shows.html':
      console.log('Shows')
      break;
    default:
      // code block
  }
}




init();
