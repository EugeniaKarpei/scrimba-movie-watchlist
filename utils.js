const genresMap = new Map()

async function setMovieGenres(){
    const responce = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=a53d2701bc6ca0ce0275b059b9b55189&language=en-US`)
    const genres = await responce.json()
    genres.genres.forEach((genre) => genresMap.set(genre.id, genre.name))  
}

function getMovieGenre(keys){
    const movieGenres = keys.map((key) => genresMap.get(key))
    return movieGenres.join(", ")
}

function getWatchlist(){
    let watchlist = localStorage.getItem("watchlist")
    return JSON.parse(watchlist)
}

export {getMovieGenre, setMovieGenres, getWatchlist} 