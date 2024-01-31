import {createContext, useContext, useEffect, useState} from "react";
import {FavoritedMovie, Movie, MovieContextType, MovieProviderProps} from "../interfaces/interfaces";
import {
    saveFavoritedMovieService,
    getNowPlayingMoviesService,
    getPopularMoviesService,
    getTopRatedMoviesService,
    getUpcomingMoviesService, deleteFavoritedMovieService, checkIfMovieIsFavoritedService
} from "../service/service";
import {useAuthContext} from "./AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MovieContext = createContext<MovieContextType>({} as MovieContextType);

export const useMovieContext = () => {
    return useContext(MovieContext)
}

export function MovieProvider({children}: MovieProviderProps) {
    const isAuthenticated = useAuthContext()
    const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([])
    const [popularMovies, setPopularMovies] = useState<Movie[]>([])
    const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([])
    const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([])

    useEffect(() => {
        loadTopRatedMovies()
        loadPopularMovies()
        loadUpcomingMovies()
        loadNowPlayingMovies()
    }, [isAuthenticated])

    async function loadTopRatedMovies() {
        const response = await getTopRatedMoviesService()
        setTopRatedMovies(response)
    }

    async function loadPopularMovies() {
        const response = await getPopularMoviesService()
        setPopularMovies(response)
    }

    async function loadUpcomingMovies() {
        const response = await getUpcomingMoviesService()
        setUpcomingMovies(response)
    }

    async function loadNowPlayingMovies() {
        const response = await getNowPlayingMoviesService()
        setNowPlayingMovies(response)
    }

    async function saveFavoriteMovie(movie: FavoritedMovie) {
        const user_jwt = await AsyncStorage.getItem('@user-jwt')
        if (!user_jwt) return
        await saveFavoritedMovieService(movie, user_jwt)
            .then(() => {
                console.log('Movie favorited')
            })
            .catch((e) => {
                console.log(e)
            })
    }

    async function deleteFavoriteMovie(tmdb_movie_id: number) {
        const user_jwt = await AsyncStorage.getItem('@user-jwt')
        if (!user_jwt) return
        await deleteFavoritedMovieService(tmdb_movie_id, user_jwt)
            .then(() => {
                console.log('Movie deleted from favorites')
            })
            .catch((e) => {
                console.log(e)
            })
    }

    async function checkIfMovieIsFavorited(tmdb_movie_id: number) {
        const user_jwt = await AsyncStorage.getItem('@user-jwt')
        if (!user_jwt) return
        await checkIfMovieIsFavoritedService(tmdb_movie_id, user_jwt)
            .then((response) => {
                console.log(response.data)
            })
            .catch((e) => {
                console.log('erro ao capturar status', e)
            })
    }

    return (
        <MovieContext.Provider
            value={{
                topRatedMovies,
                popularMovies,
                upcomingMovies,
                nowPlayingMovies,
                saveFavoriteMovie,
                deleteFavoriteMovie,
                checkIfMovieIsFavorited,
            }}>
            {children}
        </MovieContext.Provider>
    )
}