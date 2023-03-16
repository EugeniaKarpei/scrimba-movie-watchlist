import {getMovieGenre, setMovieGenres, getWatchlist} from '../utils.js'

const apiKey = "a53d2701bc6ca0ce0275b059b9b55189"
const searchInput = document.getElementById("search-input")
const movieListContainer = document.getElementById("movie-list-container")
let searchResult = []
let watchlist = getWatchlist()

setMovieGenres()
showStartExploringBox()

function showStartExploringBox(){
    movieListContainer.innerHTML = `<div id="start-exploring-box" class="start-exploring-box">
         <i class="fa-solid fa-film fa-4x"></i>
         <h2 class="start-exploring-text">Start exploring</h2>
     </div>`
}

function showNoResultsBox(){
    movieListContainer.innerHTML = `<div id="no-results-box" class="no-results-box">
        <h2 class="no-results-text">Unable to find what you’re looking for. Please try another search.</h2></div>`
}

document.getElementById("search-btn").addEventListener("click", displaySearchResults)

async function displaySearchResults(){
    const searchStr = searchInput.value
    if (searchStr != "") {
        const resp = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchStr}`)
        const data = await resp.json()
        if (data.results.length != 0){
            searchResult = data.results.filter((movie) => {
            if (movie.original_language == "en"){
                return movie
            }}) 
            
            let moviesHTML = ""
            for (let i = 0; i < searchResult.length; i++){
                moviesHTML += getMovieHTML(searchResult[i], i) 
                }
            movieListContainer.innerHTML = moviesHTML
        } else {
            showNoResultsBox()
        }       
        searchInput.value = ""              
    } 
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
                            <i id="add-watchlist-btn-${index}" class="fa-solid fa-circle-plus 
                            ${isDisabled(movie.id)}"></i>
                            <p class="add-movie-btn-label">Watchlist</p>
                        </div>
                    </div>
                    <p class="movie-about-text">
                        ${movie.overview}
                    </p>
                </div>
            </div>
            <hr>`
}

document.addEventListener("click", function(e){
    const elementId = e.target.id
    if (elementId.includes('add-watchlist-btn-')){
        const id = elementId.replace('add-watchlist-btn-','')
        watchlist.push(searchResult[id])
        localStorage.setItem("watchlist", JSON.stringify(watchlist))
        disableBtn(`add-watchlist-btn-${id}`)
    }
})

function disableBtn(id){
    document.getElementById(id).classList.add("disabled-btn");
}

function isDisabled(id){
    if (watchlist.length > 0){
        for (let i = 0; i < watchlist.length; i++){
            if (watchlist[i].id == id){
                return "disabled-btn"
            }
        }
    }   
    return ""
}

