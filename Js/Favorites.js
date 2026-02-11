
(function(){
  const favListEl = document.getElementById("favList");
  const noFav = document.getElementById("noFav");
  let favs = JSON.parse(localStorage.getItem("favorites") || "[]");

  if(!favs.length){
    noFav.style.display = "block";
    return;
  }

  favs.forEach(m => {
    const card = document.createElement("article");
    card.className = "card";

    const poster = m.poster ? `https://image.tmdb.org/t/p/w500${m.poster}` : "";
    card.innerHTML = `
      <div class="poster-wrap">
        <img src="${poster}" alt="${m.title} poster">
        <button class="favBtn">Remove</button>
        <div class="meta">
          <h3>${m.title}</h3>
        </div>
      </div>
      <div class="rating">⭐ ${m.rating || 'N/A'}</div>
    `;

    const favBtn = card.querySelector('.favBtn');
    favBtn.addEventListener('click', e=>{
      e.stopPropagation();
      favs = favs.filter(f => f.id !== m.id);
      localStorage.setItem('favorites', JSON.stringify(favs));
      card.remove();
      if(favs.length===0) noFav.style.display='block';
    });

    card.addEventListener("click", () => {
      if(m.id) location.href = "MovieFinderSecond.html?id=" + m.id;
    });

    favListEl.appendChild(card);
  });
})();
