import {createContext, useContext, useEffect, useState} from "react";
import {FavoritedMovie, Genre, Movie, MovieContextType, MovieProviderProps} from "../interfaces/interfaces";
import {useAuthContext} from "./AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MovieContext = createContext<MovieContextType>({} as MovieContextType);
import {
    checkIfMovieIsFavoritedService,
    deleteFavoritedMovieService,
    getAllFavoriteMoviesService, getAllGenresService,
    getNowPlayingMoviesService,
    getPopularMoviesService,
    getTopRatedMoviesService,
    getUpcomingMoviesService, getUserFavoriteGenresService,
    saveFavoritedMovieService
} from "../service/service";

export const useMovieContext = () => {
    return useContext(MovieContext)
}

export function MovieProvider({children}: MovieProviderProps) {
    const isAuthenticated = useAuthContext()
    const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([])
    const [popularMovies, setPopularMovies] = useState<Movie[]>([])
    const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([])
    const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([])
    const [myFavoriteMovies, setMyFavoriteMovies] = useState<FavoritedMovie[]>([])
    const [moviesIsLoading, setMoviesIsLoading] = useState<boolean>(true)
    const [allGenres, setAllGenres] = useState<Genre[]>([])
    const [userFavoriteGenres, setUserFavoriteGenres] = useState<Genre[]>([])

    useEffect(() => {
        async function init() {
            try {
                await Promise.all([
                    loadTopRatedMovies(),
                    loadPopularMovies(),
                    loadUpcomingMovies(),
                    loadNowPlayingMovies(),
                    loadAllMyFavoriteMovies(),
                    loadAllGenres(),
                    loadUserFavoriteGenres(),
                ])
            } catch (e) {
                console.log(e)
            } finally {
                setMoviesIsLoading(false)
            }
        }

        if (isAuthenticated) {
            init()
            return
        }
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
                console.log('Movie saved to favorites')
            })
            .catch((e) => {
                // console.log("Error saving the movie ->",e)
            })
        await loadAllMyFavoriteMovies()
    }

    async function deleteFavoriteMovie(tmdb_movie_id: number) {
        const user_jwt = await AsyncStorage.getItem('@user-jwt')
        if (!user_jwt) return
        await deleteFavoritedMovieService(tmdb_movie_id, user_jwt)
            .then(() => {
                console.log('Movie deleted from favorites')
            })
            .catch((e) => {
                // console.log("Error deleting the movie ->", e)
            })
        await loadAllMyFavoriteMovies()
    }

    async function checkIfMovieIsFavorited(tmdb_movie_id: number) {
        try {
            const user_jwt = await AsyncStorage.getItem('@user-jwt')
            if (!user_jwt) return
            const response = await checkIfMovieIsFavoritedService(tmdb_movie_id, user_jwt)
            return response.data
        } catch (e) {
            console.log(e)
        }
    }

    async function loadAllMyFavoriteMovies() {
        try {
            const user_jwt = await AsyncStorage.getItem('@user-jwt')
            if (!user_jwt) return
            const response = await getAllFavoriteMoviesService(user_jwt)
            setMyFavoriteMovies([])
            setMyFavoriteMovies(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    async function loadAllGenres() {
        try {
            const response = await getAllGenresService()
            setAllGenres(response.data.genres)
        } catch (e) {
            console.log(e)
        }
    }

    async function loadUserFavoriteGenres() {
        try {
            const user_jwt = await AsyncStorage.getItem('@user-jwt')
            if (!user_jwt) return
            const favoriteGenres = await getUserFavoriteGenresService(user_jwt)
            setUserFavoriteGenres(favoriteGenres.data)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <MovieContext.Provider
            value={{
                topRatedMovies,
                popularMovies,
                upcomingMovies,
                nowPlayingMovies,
                myFavoriteMovies,
                moviesIsLoading,
                allGenres,
                userFavoriteGenres,
                saveFavoriteMovie,
                deleteFavoriteMovie,
                checkIfMovieIsFavorited,
                loadAllMyFavoriteMovies,
            }}>
            {children}
        </MovieContext.Provider>
    )
}