import {ReactNode} from "react";

export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    confirm_password: string;
    favorite_movies: string[];
}

export interface AuthContextType {
    isLogged: boolean;
    setIsLogged: (isLogged: boolean) => void;
    user: User | null;
    setUser: (user: User) => void;
    users: User[];
    setUsers: (users: User[]) => void;
}

export interface AuthProviderProps {
    children: ReactNode;
}