import {ReactNode} from "react";

export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    favorite_movies: string[];
}

export interface AuthContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    user: User | null;
    setUser: (user: User | null) => void;
    login?: (email: string, password: string) => Promise<void>;
    logout?: () => void;
}

export interface UserContextType {
    saveUserInCache: (user: User) => void;
}

export interface AuthProviderProps {
    children: ReactNode;
}

export interface UserProviderProps {
    children: ReactNode
}

export interface DecodedToken {
    email: string;
}
