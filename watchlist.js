import {getMovieGenre, setMovieGenres, getWatchlist} from '/utils.js'

const movieListContainer = document.getElementById("movie-list-container")
let watchlist = getWatchlist()

await setMovieGenres()
loadWatchlist()

function loadWatchlist(){
    if (watchlist.length > 0){
        displayWatchlist(watchlist)
    } else {
        movieListContainer.innerHTML = getEemptyWatchlistBoxHTML()
    }
}

function displayWatchlist(watchlist){
    let moviesHTML = ""
    for (let i = 0; i < watchlist.length; i++){
        moviesHTML += getMovieHTML(watchlist[i], i)
    }
    movieListContainer.innerHTML = moviesHTML
}

function getMovieHTML(movie, index){
    return `<div class="movie-container">
                <div class="movie-img-box">
                    <img class="movie-img" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}">
                </div>
                <div class="movie-discription-container">
                    <div class="movie-name-box">
                        <h3 class="movie-name">${movie.original_title}</h3>
                        <i class="fa-solid fa-star star-icon"></i>
                        <p class="movie-rating">${Number.parseFloat(movie.vote_average).toFixed(1)}</p>
                    </div>
                    <div class="movie-info-box">
                        <p class="release-date">${movie.release_date.split('-')[0]}</p>
                        <p class="movie-genre">${getMovieGenre(movie.genre_ids)}</p>
                        <div class="add-movie-btn-container">
                            <i id="remove-watchlist-btn-${index}" class="fa-solid fa-circle-minus"></i>
                            <p class="remove-movie-btn-label">Remove</p>
                        </div>
                    </div>
                    <p class="movie-about-text">
                        ${movie.overview}
                    </p>
                </div>
            </div>
            <hr>`
}

function getEemptyWatchlistBoxHTML(){
    return `<div id="empty-watchlist-box" class="start-exploring-box">
                <h2 class="start-exploring-text">Your watchlist is looking a little empty...</h2>
                <div class="add-movie-container">
                    <i class="fa-solid fa-circle-plus"></i>
                    <p class="add-movie-text">Let’s add some movies!</p>
                </div>
            </div>`
}

document.addEventListener("click", function(e){
    const elementId = e.target.id
    if (elementId.includes('remove-watchlist-btn-')){
        const id = elementId.replace('remove-watchlist-btn-','')
        watchlist = watchlist.filter((movie) => watchlist.indexOf(movie) != id)
        localStorage.setItem("watchlist", JSON.stringify(watchlist))
        loadWatchlist()
    }
})