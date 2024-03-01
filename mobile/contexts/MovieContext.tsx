import {createContext, useContext, useEffect, useState} from "react";
import {FavoritedMovie, Genre, Movie, MovieContextType, MovieProviderProps} from "../interfaces/interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MovieContext = createContext<MovieContextType>({} as MovieContextType);
import {
    checkIfMovieIsFavoritedService,
    deleteFavoritedMovieService,
    getAllFavoriteMoviesService, getAllGenresService, getMovieRecommendationService,
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
    const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([])
    const [popularMovies, setPopularMovies] = useState<Movie[]>([])
    const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([])
    const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([])
    const [myFavoriteMovies, setMyFavoriteMovies] = useState<FavoritedMovie[]>([])
    const [moviesIsLoading, setMoviesIsLoading] = useState<boolean>(true)
    const [allGenres, setAllGenres] = useState<Genre[]>([])
    const [userFavoriteGenres, setUserFavoriteGenres] = useState<Genre[]>([])
    const [recommendedMovie, setRecommendedMovie] = useState<Movie>({} as Movie)

    const genreStylesForConsult = [
        { name: 'Top Rated', colors: ['#fceabb', '#f8b500'], icon: 'star' },
        { name: 'Music', colors: ['#fbc7d4', '#9796f0'], icon: 'music' },
        { name: 'TV Movie', colors: ['#ff512f', '#f09819'], icon: 'tv' },
        { name: 'Documentary', colors: ['#2ecc71', '#27ae60'], icon: 'file' },
        { name: 'Science Fiction', colors: ['#7f8c8d', '#95a5a6'], icon: 'flask' },
        { name: 'Action', colors: ['#e74c3c', '#c0392b'], icon: 'fire' },
        { name: 'Animation', colors: ['#2ecc71', '#27ae60'], icon: 'smile' },
        { name: 'Adventure', colors: ['#f39c12', '#e67e22'], icon: 'compass' },
        { name: 'Comedy', colors: ['#f1c40f', '#f39c12'], icon: 'laugh' },
        { name: 'Fantasy', colors: ['#9b59b6', '#8e44ad'], icon: 'hat-wizard' },
        { name: 'Romance', colors: ['#e08283', '#e74c3c'], icon: 'heart' },
        { name: 'Drama', colors: ['#8d6e63', '#7f8c8d'], icon: 'masks-theater' },
        { name: 'Family', colors: ['#3498db', '#2980b9'], icon: 'home' },
        { name: 'War', colors: ['#34495e', '#2c3e50'], icon: 'helicopter' },
        { name: 'History', colors: ['#e67e22', '#d35400'], icon: 'landmark' },
        { name: 'Mystery', colors: ['#8e44ad', '#9b59b6'], icon: 'search' },
        { name: 'Crime', colors: ['gray', '#95a5a6'], icon: 'user-secret' },
        { name: 'Thriller', colors: ['black', '#34495e'], icon: 'mask' },
        { name: 'Horror', colors: ['#95a5a6', '#7f8c8d'], icon: 'ghost' },
        { name: 'Western', colors: ['#c0392b', '#e74c3c'], icon: 'horse' },
    ];


    useEffect(() => {
        async function init() {
            console.log('MovieContext init')
            try {
                await Promise.all([
                    // getMovieRecommendation(),
                    loadAllGenres(),
                    loadNowPlayingMovies(),
                    loadPopularMovies(),
                    loadUpcomingMovies(),
                    loadAllMyFavoriteMovies(),
                    loadUserFavoriteGenres(),
                    loadTopRatedMovies(),
                ])
            } catch (e) {
                console.log(e)
            } finally {
                setMoviesIsLoading(false)
            }
        }

        init()
        return
    }, [])

    async function loadTopRatedMovies() {
        const response = await getTopRatedMoviesService()
        setTopRatedMovies(response)
    }

    async function loadPopularMovies() {
        const response = await getPopularMoviesService()
        setPopularMovies([])
        setPopularMovies(response)
    }

    async function loadUpcomingMovies() {
        const response = await getUpcomingMoviesService()
        setUpcomingMovies([])
        setUpcomingMovies(response)
    }

    async function loadNowPlayingMovies() {
        const response = await getNowPlayingMoviesService()
        setNowPlayingMovies([])
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
            setMyFavoriteMovies(response.data.reverse())
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
                recommendedMovie,
                genreStylesForConsult,
                saveFavoriteMovie,
                deleteFavoriteMovie,
                checkIfMovieIsFavorited,
                loadAllMyFavoriteMovies,
            }}>
            {children}
        </MovieContext.Provider>
    )
}