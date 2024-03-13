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
  } else if (type === 'show') {
    document.querySelector('#show-details').appendChild(overlayDiv);
  }
}


async function fetchAPIData(endpoint, queryString = ''){
  const API_KEY = '3fba2112c4120089009c0ca88d8eefcd'
  const API_URL = 'https://api.themoviedb.org/3/'
  const fullEndpoint = `${API_URL}${endpoint}?api_key=${API_KEY}&${queryString}`
  console.log(fullEndpoint)
  // Show spinner ?
  const res = await fetch(fullEndpoint)
  const res2 = await res.json();
  // Hide spinner ?
  return res2;
}

function formatNumberWithCommas(number) {
  return number.toString().replace(/\\B(?=(\\d{3})+(?!\\d))/g, ",");
}





function filterUrl(url){
  // console.log(url)
  return url.replace("sigurd-project/flixx-app/", '');
}


export { displayBackgroundImage, fetchAPIData, formatNumberWithCommas, filterUrl };