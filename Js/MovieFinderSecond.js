const API_KEY = 'ca6bf942b9b43ae5663f3a9d252fe219';
const IMG_BASE = 'https://image.tmdb.org/t/p/w500';

const params = new URLSearchParams(window.location.search);
const id = params.get('id');

async function fetchMovieDetails(id){
  try {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
    if(!res.ok) throw new Error('Film bulunamadı');
    const movie = await res.json();
    return movie;
  } catch (err) {
    console.error(err);
    return null;
  }
}

function updateFavButton(movie){
  const btn = document.getElementById('favBtn');
  let favs = JSON.parse(localStorage.getItem('favorites')) || [];
  const isFav = favs.some(f => f.id === movie.id);

  btn.textContent = isFav ? 'Remove from Favorites' : 'Add to Favorites';
  btn.style.background = isFav ? 'linear-gradient(90deg,#800000,#ff1493)' : 'linear-gradient(90deg,#ff1493,#ff69b4)';

  btn.onclick = () => {
    let favs = JSON.parse(localStorage.getItem('favorites')) || [];
    if(isFav){
      favs = favs.filter(f => f.id !== movie.id);
    } else {
      favs.push({id: movie.id, title: movie.title, poster: movie.poster_path});
    }
    localStorage.setItem('favorites', JSON.stringify(favs));
    updateFavButton(movie);
  };
}

fetchMovieDetails(id).then(movie => {
  const content = document.getElementById('content');
  if(!movie){
    content.innerHTML = "<h2>Film bulunamadı!</h2>";
    return;
  }

  document.body.style.background = `linear-gradient(to bottom, #330000, #1a0a0f)`;
  document.getElementById('poster').src = movie.poster_path ? IMG_BASE + movie.poster_path : 'https://via.placeholder.com/500x750?text=No+Image';
  document.getElementById('title').textContent = movie.title;
  document.getElementById('rating').textContent = movie.vote_average ? '⭐ ' + movie.vote_average : '—';
  document.getElementById('desc').textContent = movie.overview || 'No description available';
  updateFavButton(movie);
});
