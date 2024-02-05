import axios from 'axios';
import {MY_IP, TMDB_URL, TMDB_API_KEY} from "../config";
import {FavoritedMovie, User} from "../interfaces/interfaces";

export async function loginService(email: string, password: string){
    return await axios.post(
        `http://${MY_IP}/login`,
        {email, password}
    )
}

export async function getAllGenresService(){
    return await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_API_KEY}&language=en-US`)
}

export async function createUserAccountService(user: User){
    return await axios.post(
        `http://${MY_IP}/user`,
        {user}
    )
}

export async function verifyUserJwtService(user_jwt: string){
    return await axios.post(
        `http://${MY_IP}/verify-jwt`,
        {},
        {headers: {Authorization: `Bearer ${user_jwt}`}}
    )
}

export async function saveFavoritedMovieService(movie : FavoritedMovie, user_jwt: string) {
    return await axios.post(
        `http://${MY_IP}/favorite-movie`,
        {
            title: movie.title,
            tmdb_movie_id: movie.id,
            poster_path: movie.poster_path,
            genres: movie.genres
        },
        {headers: {Authorization: `Bearer ${user_jwt}`}}
    )
}

export async function getAllFavoriteMoviesService(user_jwt: string){
    return await axios.get(
        `http://${MY_IP}/favorite-movies`,
        {headers: {Authorization: `Bearer ${user_jwt}`}}
    )
}

export async function deleteFavoritedMovieService(tmdbMovieId: number, user_jwt: string){
    return await axios.delete(
        `http://${MY_IP}/favorite-movie/${tmdbMovieId}`,
        {headers: {Authorization: `Bearer ${user_jwt}`}}
    )
}

export async function checkIfMovieIsFavoritedService(tmdbMovieId: number, user_jwt: string){
    return await axios.get(
        `http://${MY_IP}/favorite-movie/${tmdbMovieId}`,
        {headers: {Authorization: `Bearer ${user_jwt}`}}
    )
}

export async function getTopRatedMoviesService(){
    const topRatedMovies = await axios.get(`${TMDB_URL}top_rated?api_key=${TMDB_API_KEY}&language=en-US&page=1`)
    return topRatedMovies.data.results
}

export async function getPopularMoviesService(){
    const popularMovies = await axios.get(`${TMDB_URL}popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`)
    return popularMovies.data.results
}

export async function getUpcomingMoviesService(){
    const upcomingMovies = await axios.get(`${TMDB_URL}upcoming?api_key=${TMDB_API_KEY}&language=en-US&page=1`)
    return upcomingMovies.data.results
}

export async function getNowPlayingMoviesService(){
    const nowPlayingMovies = await axios.get(`${TMDB_URL}now_playing?api_key=${TMDB_API_KEY}&language=en-US&page=1`)
    return nowPlayingMovies.data.results
}

export async function getMovieByIdService(id: string){
    const movie = await axios.get(`${TMDB_URL}${id}?api_key=${TMDB_API_KEY}&language=en-US`)
    return movie.data
}

