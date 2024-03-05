import {User, UserContextType, UserProviderProps} from "../interfaces/interfaces";
import {createContext, useContext} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useAuthContext} from "./AuthContext";
import {createUserAccountService, saveProfilePictureService, updateUserAccountService} from "../service/service";
import {Alert} from "react-native";
import {MY_IP} from "../config";

const UserContext = createContext<UserContextType>({} as UserContextType)

export function useUserContext() {
    return useContext(UserContext)
}

export function UserProvider({children}: UserProviderProps) {
    const {setIsAuthenticated} = useAuthContext()
    const {setUser} = useAuthContext()

    async function createUserAccount(newUser: User) {
        await createUserAccountService(newUser)
            .then(async (response) => {
                setUser(response.data.user)
                await AsyncStorage.setItem('@user-jwt', response.data.user_jwt)
                setIsAuthenticated(true)
            })
            .catch((e) => {
                Alert.alert('Ops!', e.response.data.message)
                console.log('Error creating user account ->', e)
            })
    }

    async function updateUserProfilePicture(user: User, imageFormData: FormData) {
        const user_jwt = await AsyncStorage.getItem('@user-jwt')
        if (!user_jwt) return
        await saveProfilePictureService(imageFormData, user_jwt)
            .then((response) => {
                const newProfilePicture = response.data.profile_picture
                setUser({...user, profile_picture: newProfilePicture})
                console.log(response.data.message)
            })
            .catch((error) => {
                Alert.alert('Error', 'An error occurred while trying to update your profile picture')
                console.log(error)
            })
    }

    async function updateUserNameOrEmail(userToUpdate: User) {
        const user_jwt = await AsyncStorage.getItem('@user-jwt')
        if (!user_jwt) return
        await updateUserAccountService(userToUpdate, user_jwt)
            .then(async (response) => {
                setUser(response.data.user)
                console.log(response.data.message)
            })
            .catch((e) => {
                Alert.alert('Error', 'An error occurred while trying to update your account')
                console.log('Error updating user account ->', e)
            })
    }

    return (
        <UserContext.Provider value={{
            createUserAccount,
            updateUserNameOrEmail,
            updateUserProfilePicture,
        }}>
            {children}
        </UserContext.Provider>
    );
}
