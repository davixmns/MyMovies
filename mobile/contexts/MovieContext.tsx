import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {Movie, MovieContextType, MovieProviderProps} from "../interfaces/interfaces";
import {getMovieByIdService, getTopRatedMoviesService} from "../service/service";
import {useAuthContext} from "./AuthContext";

const MovieContext = createContext<MovieContextType>({} as MovieContextType);

export const useMovieContext = () => {
    return useContext(MovieContext)
}

export function MovieProvider({children}: MovieProviderProps) {
    const isAuthenticated = useAuthContext()
    const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([])

    useEffect(() => {
        loadTopRatedMovies()
    }, [isAuthenticated])

    async function loadTopRatedMovies() {
        const response = await getTopRatedMoviesService()
        setTopRatedMovies(response)
    }

    return (
        <MovieContext.Provider
            value={{
                topRatedMovies,
            }}>
            {children}
        </MovieContext.Provider>
    )
}