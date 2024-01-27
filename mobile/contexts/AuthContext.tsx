import {useContext, createContext, useState, useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {AuthContextType, AuthProviderProps, User} from "../interfaces/interfaces";
import {Alert} from "react-native";
import {signJWT, verifyJWT} from "../service/service";

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export function AuthProvider({children}: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

    useEffect(() => {
        verifyIfUserIsAuthenticated()
    }, [])

    // Verifica se o usuário está autenticado
    async function verifyIfUserIsAuthenticated() {
        try {
            const userJwt = await AsyncStorage.getItem('@user-jwt');
            if (userJwt) {
                const response = await verifyJWT(userJwt.toString())
                const userEmail = response.decoded.email
                if (userEmail) {
                    const user = await AsyncStorage.getItem('@user-' + userEmail);
                    setUser(JSON.parse(user as string));
                    setIsAuthenticated(true);
                }
            }
        } catch (e) {
            console.error('Erro ao verificar a jwt do usuário:', e);
        }
    }

    async function login(email: string, password: string) {
        try {
            const user = await AsyncStorage.getItem('@user-' + email);
            if (!user) {
                Alert.alert("Erro", "Usuário não encontrado")
                return
            }
            const parsedUser = JSON.parse(user)
            if (parsedUser.password === password) {
                const response = await signJWT(email)
                const jwt = response.token
                await AsyncStorage.setItem('@user-jwt', jwt)
                setUser(parsedUser)
                setIsAuthenticated(true)
            }
        } catch (e) {
            console.log(e)
        }
    }

    async function logout() {
        try {
            await AsyncStorage.removeItem('@user-jwt')
            setIsAuthenticated(false)
            setUser(null)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            setIsAuthenticated,
            user,
            setUser,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )

}
