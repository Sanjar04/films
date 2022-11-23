
const select = document.querySelector(".form-select");
const list = document.querySelector(".movies__list");
const search = document.querySelector(".search");

let uniqGenres = (films) => {
   let uniqGenresArr = []

      films.map(film => {
         film.genres.map(genre => {
            if(!uniqGenresArr.includes(genre)){
               uniqGenresArr.push(genre)
            }
      })
   })
   return uniqGenresArr
}

let renderGeners = (genres) => {
   let res = ''

   genres.map(genre => {
      res += `
         <option class="option" value="${genre}">${genre}</option>
      `
   })
   select.innerHTML += res
}
renderGeners(uniqGenres(films), select);

let renderFilms = (films) => {
   let filmRes = ''


   films.map(film =>{
      filmRes += `
      <li class="col-4 list-group-item" id="${film.id}">
         <div class="card" style="width: 18rem;">
            <img src="${film.poster}" class="card-img-top" alt="...">
            <div class="card-body">
               <h5 class="card-title">${film.title}</h5>
               <p class="card-text">${film.overview}</p>
               <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
      </li>
      `
   });
   list.innerHTML = filmRes
}

renderFilms(films, list);

select.addEventListener("change", (evt)=>{
   let option = evt.target.value.trim()

   if(option !== "All"){
      let filteredFilmsByGenres = films.filter(film =>{
         return film.genres.includes(option)
      })
      renderFilms(filteredFilmsByGenres, list)
   }
   else {
      let renderAll = (films) => {
         return films
      }
      renderFilms(renderAll(films), list)
   }
});

search.addEventListener("change", (evt)=>{
   evt.preventDefault()

   let search = evt.target.value.trim()

   let regex = new RegExp(search, "gi")

   let filteredFilmsBySearch = films.filter(film => {
      return film.title.match(regex)
   })
   renderFilms((filteredFilmsBySearch), list)
})