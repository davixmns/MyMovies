import {User, UserContextType, UserProviderProps} from "../interfaces/interfaces";
import {createContext, useContext} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Alert} from "react-native";
import {useAuthContext} from "./AuthContext";
import {signJWT} from "../service/service";

const UserContext = createContext<UserContextType>({} as UserContextType)

export function useUserContext() {
    return useContext(UserContext)
}

export function UserProvider({children}: UserProviderProps) {
    const {setIsAuthenticated, setUser} = useAuthContext()

    async function saveUserInCache(newUser: User) {
        try {
            // Verifica se já existe um usuário com o mesmo e-mail
            const userExists = await AsyncStorage.getItem(`@user-${newUser.email}`);
            if (userExists) {
                Alert.alert("Erro", "Já existe uma conta com esse e-mail");
                return;
            }
            // Assina e salva o JWT do usuário
            const userJwt = await signJWT(newUser.email);
            await AsyncStorage.setItem("@user-jwt", userJwt.token.toString());
            const newUserJson = JSON.stringify(newUser);
            await AsyncStorage.setItem(`@user-${newUser.email}`, newUserJson);
            setUser(newUser);
            setIsAuthenticated(true);
        } catch (error) {
            console.error("Erro ao salvar usuário no cache: ", error);
        }
    }

    async function updateUserInCache(user: User) {
        try {
            const userJson = JSON.stringify(user);
            await AsyncStorage.setItem(`@user-${user.email}`, userJson);
            setUser(user);
        } catch (error) {
            console.error("Erro ao salvar usuário no cache: ", error);
        }
    }

    return (
        <UserContext.Provider value={{
            saveUserInCache,
            updateUserInCache
        }}>
            {children}
        </UserContext.Provider>
    );
}
