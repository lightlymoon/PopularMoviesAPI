const API_KEY='ca6bf942b9b43ae5663f3a9d252fe219';
const IMG_BASE='https://image.tmdb.org/t/p/w500';
const results=document.getElementById('results');
const empty=document.getElementById('empty');
const input=document.getElementById('q');

if(!localStorage.getItem('loggedUser')) location.href='Login.html';

document.getElementById('logoutBtn').addEventListener('click', ()=>{
  localStorage.removeItem('loggedUser');
  location.href='Login.html';
});

async function fetchMovies(query=''){
  try{
    const url=query?`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`:`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
    const res=await fetch(url);
    const data=await res.json();
    return data.results||[];
  }catch(e){console.error(e);return [];}
}

function render(list){
  results.innerHTML='';
  if(!list.length){ empty.style.display='block'; return; }
  empty.style.display='none';
  
  list.forEach(m=>{
    const card=document.createElement('article');
    card.className='card';
    const favs=JSON.parse(localStorage.getItem('favorites')||'[]');
    const isFav=favs.some(f=>f.id===m.id);
    const poster=m.poster_path?IMG_BASE+m.poster_path:'';

    card.innerHTML=`
      <div class="poster-wrap">
        <img src="${poster}" alt="${m.title} poster">
        <button class="favBtn">${isFav?'Remove from Favorites':'Add to Favorites'}</button>
        <div class="meta"><h3>${m.title}</h3><p>${m.overview||''}</p></div>
      </div>
      <div class="rating">${m.vote_average?'⭐ '+m.vote_average:'—'}</div>
    `;

    const favBtn=card.querySelector('.favBtn');
    favBtn.addEventListener('click', e=>{
      e.stopPropagation();
      let favList=JSON.parse(localStorage.getItem('favorites')||'[]');
      if(favList.some(f=>f.id===m.id)){
        favList=favList.filter(f=>f.id!==m.id);
      }else{ favList.push({id:m.id,title:m.title,poster:m.poster_path,vote_average:m.vote_average}); }
      localStorage.setItem('favorites',JSON.stringify(favList));
      favBtn.textContent=favList.some(f=>f.id===m.id)?'Remove from Favorites':'Add to Favorites';
    });

    card.addEventListener('click',()=>{ if(m.id) location.href=`MovieFinderSecond.html?id=${m.id}`; });
    results.appendChild(card);
  });
}

fetchMovies().then(render);
input?.addEventListener('input',debounce(async e=>{
  const q=e.target.value.trim();
  const movies=await fetchMovies(q);
  render(movies);
},350));

function debounce(fn,wait){ let t; return function(...args){ clearTimeout(t); t=setTimeout(()=>fn.apply(this,args),wait); } }
