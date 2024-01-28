import axios from 'axios';
import {MY_IP, VITE_API, VITE_API_KEY} from "../config";

export async function signJWT(email: string) {
    return axios.post(
        `http://${MY_IP}:3000/sign-jwt`,
        {email: email}
    )
        .then(res => res.data)
        .catch(err => console.log(err))
}

export async function verifyJWT(token: string) {
    return await axios.post(
        `http://${MY_IP}:3000/verify-jwt`,
        {},
        {headers: {Authorization: `Bearer ${token}`}}
    )
        .then(res => res.data)
        .catch(err => console.log(err))
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

