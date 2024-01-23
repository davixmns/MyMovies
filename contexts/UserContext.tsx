import {User, UserContextType, UserProviderProps} from "../interfaces/interfaces";
import {createContext} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {verifyIfUserIsFormatted} from "../utils/utils";
import {Alert} from "react-native";
import {useAuthContext} from "./AuthContext";

const UserContext = createContext<UserContextType>({} as UserContextType)

export function UserProvider({children}: UserProviderProps) {
    const {setIsAuthenticated, setUser} = useAuthContext()

    async function saveUserInCache(newUser: User) {
        try {
            //verifica se o usuário está formatado corretamente
            const verifyUserResponse = verifyIfUserIsFormatted(newUser);
            if (verifyUserResponse !== true) {
                Alert.alert("Erro", verifyUserResponse);
                return;
            }

            // Verifica se já existe um usuário com o mesmo e-mail
            const userExists = await AsyncStorage.getItem(`@user-${newUser.email}`);
            console.log("USER EXISTS -> ", userExists)
            if (userExists) {
                Alert.alert("Erro", "Já existe um usuário com esse e-mail -> ");
                return;
            }

            //Salva usuário no cache como um item do AsyncStorage
            const newUserJson = JSON.stringify(newUser);
            //o usuário é identificado no cache como: @user-<email_do_usuario>
            await AsyncStorage.setItem(`@user-${newUser.email}`, newUserJson);
            setUser(newUser);
            setIsAuthenticated(true);
        } catch (error) {
            console.error("Erro ao salvar usuário no cache: ", error);
        }
    }

    return (
        <UserContext.Provider value={{
            saveUserInCache
        }}>
            {children}
        </UserContext.Provider>
    );
}
