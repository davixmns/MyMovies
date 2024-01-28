import React, {ReactNode} from "react";
import {Feather} from "@expo/vector-icons";

export interface User {
    name: string;
    email: string;
    password: string;
    favorite_movies: string[];
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
}

export interface UserContextType {
    saveUserInCache: (user: User) => void;
    updateUserInCache: (user: User) => void;
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

export interface Movie {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path?: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

