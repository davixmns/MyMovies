import axios from 'axios';
import {MY_IP, VITE_API, VITE_API_KEY} from "../config";
import {FavoritedMovie, User} from "../interfaces/interfaces";

export async function loginService(email: string, password: string){
    return await axios.post(
        `http://${MY_IP}/login`,
        {email, password}
    )
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
        },
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
    const topRatedMovies = await axios.get(`${VITE_API}top_rated?api_key=${VITE_API_KEY}&language=pt-BR&page=1`)
    return topRatedMovies.data.results
}

export async function getPopularMoviesService(){
    const popularMovies = await axios.get(`${VITE_API}popular?api_key=${VITE_API_KEY}&language=pt-BR&page=1`)
    return popularMovies.data.results
}

export async function getUpcomingMoviesService(){
    const upcomingMovies = await axios.get(`${VITE_API}upcoming?api_key=${VITE_API_KEY}&language=pt-BR&page=1`)
    return upcomingMovies.data.results
}

export async function getNowPlayingMoviesService(){
    const nowPlayingMovies = await axios.get(`${VITE_API}now_playing?api_key=${VITE_API_KEY}&language=pt-BR&page=1`)
    return nowPlayingMovies.data.results
}

export async function getMovieByIdService(id: string){
    const movie = await axios.get(`${VITE_API}${id}?api_key=${VITE_API_KEY}&language=pt-BR`)
    return movie.data
}

