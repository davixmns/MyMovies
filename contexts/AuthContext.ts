import {useContext, createContext, useState, useEffect, ReactNode} from "react";
import {useNavigation} from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage";
import {AuthContextType, AuthProviderProps, User} from "../interfaces/interfaces";
import {verifyIfUserIsFormatted} from "../utils/utils";
import {Alert} from "react-native";


const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export function AuthProvider({ children }: AuthProviderProps) {
    const navigation = useNavigation()
    const [users, setUsers] = useState<User[]>([])
    const [user, setUser] = useState<User | null>(null)
    const [isLogged, setIsLogged] = useState(false)

    useEffect(() => {
        loadUsersFromCache()
    }, [])

    //Carrega os dados do usuário que estão no cache
    async function loadUsersFromCache() {
        await AsyncStorage.getItem('@users')
            .then(usersInCache => {
                if (usersInCache) {
                    const parsedUsers = JSON.parse(usersInCache) as User[]
                    setUsers(parsedUsers)
                }
            })
            .catch((error) => {
                console.log("Erro ao carregar dados de usuários no cache" + error)
            })
    }

    async function saveUserInCache(newUser: User) {
        try {
            // Carrega os usuários que estão no cache
            const usersInCache = await AsyncStorage.getItem('@users');
            let users: User[] = usersInCache ? JSON.parse(usersInCache) as User[] : [];

            // Verifica se o usuário está formatado corretamente
            const verifyUserResponse = verifyIfUserIsFormatted(newUser);
            if (verifyUserResponse !== true) {
                Alert.alert("Erro", verifyUserResponse);
                return;
            }

            // Verifica se já existe um usuário com o mesmo e-mail
            if (users.some(user => user.email === newUser.email)) {
                Alert.alert("Erro", "Já existe um usuário com esse e-mail");
                return;
            }

            // Adiciona o novo usuário à lista e salva no cache
            users.push(newUser);
            const jsonValue = JSON.stringify(users);
            await AsyncStorage.setItem('@users', jsonValue);
        } catch (error) {
            console.error("Erro ao salvar usuário no cache: ", error);
        }
    }

    //Salva os dados do usuário no cache

}
