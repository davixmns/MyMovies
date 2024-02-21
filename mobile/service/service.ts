import axios from 'axios';
import {MY_IP, TMDB_URL_MOVIE, TMDB_API_KEY, TMDB_URL_PERSON} from "../config";
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

export async function searchMovieService(query: string){
    return await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${query}&page=1`)
}

export async function searchActorService(query: string) {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/person?api_key=${TMDB_API_KEY}&query=${query}&page=1`);
        const actors = response.data.results;

        const popularActors = actors.filter((actor: { popularity: number; }) => actor.popularity > 10);

        return popularActors.slice(0, 4);
    } catch (error) {
        console.error("Erro ao buscar atores:", error);
        return [];
    }
}

export async function updateUserAccountService(user: User, user_jwt: string){
    return await axios.put(
        `http://${MY_IP}/user`,
        {user},
        {headers: {Authorization: `Bearer ${user_jwt}`}}
    )
}

export async function getMovieRecommendationService(user_jwt: string){
    return await axios.get(
        `http://${MY_IP}/movie-recommendation`,
        {headers: {Authorization: `Bearer ${user_jwt}`}}
    )
}

export async function getMoviesByGenreService(genreId: number){
    return await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreId}`)
}

export async function deleteMyAccountService(user_jwt: string){
    return await axios.delete(
        `http://${MY_IP}/user`,
        {headers: {Authorization: `Bearer ${user_jwt}`}}
    )
}

export async function getUserFavoriteGenresService(user_jwt: string){
    return await axios.get(
        `http://${MY_IP}/favorite-genres`,
        {headers: {Authorization: `Bearer ${user_jwt}`}}
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
    const topRatedMovies = await axios.get(`${TMDB_URL_MOVIE}top_rated?api_key=${TMDB_API_KEY}&language=en-US&page=1`)
    return topRatedMovies.data.results
}

export async function getPopularMoviesService(){
    const popularMovies = await axios.get(`${TMDB_URL_MOVIE}popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`)
    return popularMovies.data.results
}

export async function getUpcomingMoviesService(){
    const upcomingMovies = await axios.get(`${TMDB_URL_MOVIE}upcoming?api_key=${TMDB_API_KEY}&language=en-US&page=1`)
    return upcomingMovies.data.results
}

export async function getNowPlayingMoviesService(){
    const nowPlayingMovies = await axios.get(`${TMDB_URL_MOVIE}now_playing?api_key=${TMDB_API_KEY}&language=en-US&page=1`)
    return nowPlayingMovies.data.results
}

export async function getMovieByIdService(id: string){
    const movie = await axios.get(`${TMDB_URL_MOVIE}${id}?api_key=${TMDB_API_KEY}&language=en-US`)
    return movie.data
}

export async function getActorsFromAMovieService(id: string){
    const actors = await axios.get(`${TMDB_URL_MOVIE}${id}/credits?api_key=${TMDB_API_KEY}&language=en-US&page=1`)
    return actors.data.cast.slice(0, 5);
}

export async function getActorMoviesService(id: string){
    const actorMovies = await axios.get(`${TMDB_URL_PERSON}/${id}/movie_credits?api_key=${TMDB_API_KEY}&language=en-US&page=1&sort_by=popularity`)
    return actorMovies.data.cast.slice(0, 15); // Retorna os 10 filmes mais populares
}


