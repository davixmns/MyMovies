import {useContext, createContext, useState, useEffect, ReactNode} from "react";
import {useNavigation} from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
    id: string;
    name: string;
    email: string;
    password: string;
}

interface AuthContextType {
    isLogged: boolean;
    setIsLogged: (isLogged: boolean) => void;
    user: User | null;
    setUser: (user: User) => void;
    users: User[];
    setUsers: (users: User[]) => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export function AuthProvider({ children }: AuthProviderProps) {
    const navigation = useNavigation()
    const [users, setUsers] = useState([])

    const [isLogged, setIsLogged] = useState(false)
    const [user, setUser] = useState({})

    useEffect(() => {
        loadDatabaseFromCache()
    }, [])

    async function loadDatabaseFromCache() {
        
    }
}
