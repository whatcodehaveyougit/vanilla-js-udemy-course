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

async function fetchAPIData(endpoint){
  const API_KEY = '3fba2112c4120089009c0ca88d8eefcd'
  const API_URL = 'https://api.themoviedb.org/3/'
  const res = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}`)
  const res2 = await res.json();
  return res2;
}

function formatNumberWithCommas(number) {
  return number.toString().replace(/\\B(?=(\\d{3})+(?!\\d))/g, ",");
}


export { displayBackgroundImage, fetchAPIData, formatNumberWithCommas };