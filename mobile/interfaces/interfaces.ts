import {ReactNode} from "react";

export interface User {
    name: string;
    email: string;
    password?: string;
}

export interface Movie {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: null;
    budget: number;
    genres: any[];
    homepage: string;
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path?: string;
    release_date: string;
    revenue: number;
    runtime: number;
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface Genre {
    id: number;
    name: string;
}

export interface FavoritedMovie {
    id: number;
    title: string;
    poster_path?: string;
    genres: Genre[];
}

export interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    user: User | null;
    setUser: (user: User | null) => void;
    login?: (email: string, password: string) => Promise<void>;
    logout?: () => void;
}

export interface MovieContextType {
    topRatedMovies: Movie[];
    popularMovies: Movie[];
    upcomingMovies: Movie[];
    nowPlayingMovies: Movie[];
    myFavoriteMovies: FavoritedMovie[];
    saveFavoriteMovie: (movie: FavoritedMovie) => Promise<void>;
    deleteFavoriteMovie: (tmdbMovieId: number) => Promise<void>;
    checkIfMovieIsFavorited: (tmdbMovieId: number) => Promise<boolean>;
    moviesIsLoading: boolean;
    loadAllMyFavoriteMovies: () => Promise<void>;
}

export interface UserContextType {
    createUserAccount: (user: User) => Promise<void>;
}

export interface AuthProviderProps {
    children: ReactNode;
}

export interface UserProviderProps {
    children: ReactNode
}

export interface MovieProviderProps {
    children: ReactNode
}

