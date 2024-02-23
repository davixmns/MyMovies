import {User, UserContextType, UserProviderProps} from "../interfaces/interfaces";
import {createContext, useContext} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useAuthContext} from "./AuthContext";
import {createUserAccountService, saveProfilePictureService, updateUserAccountService} from "../service/service";
import {Alert} from "react-native";
import * as ImagePicker from "expo-image-picker";
import {MY_IP} from "../config";
import * as ImageManipulator from "expo-image-manipulator";

const UserContext = createContext<UserContextType>({} as UserContextType)

export function useUserContext() {
    return useContext(UserContext)
}

export function UserProvider({children}: UserProviderProps) {
    const {setIsAuthenticated} = useAuthContext()
    const {user, setUser} = useAuthContext()

    async function createUserAccount(newUser: User) {
        await createUserAccountService(newUser)
            .then(async (response) => {
                const data = response.data
                setUser(data.user)
                await AsyncStorage.setItem('@user-jwt', data.user_jwt)
                setIsAuthenticated(true)
            })
            .catch((e) => {
                console.log(e)
            })
    }

    async function updateUserAccount(userToUpdate: User) {
        const user_jwt = await AsyncStorage.getItem('@user-jwt')
        if (!user_jwt) return
        await updateUserAccountService(userToUpdate, user_jwt)
            .then((response) => {
                const receivedUser = response.data.user
                setUser({...user, name: receivedUser.name, email: receivedUser.email})
            })
            .catch((e) => {
                Alert.alert('Erro', e.response.data.message)
                console.log(e)
            })
    }

    async function compressImage(uri: string) {
        //deixar imagem 50x50
        return await ImageManipulator.manipulateAsync(uri,
            [{resize: {width: 800, height: 800}}],
            {compress: 0.0}
        )
    }

    async function updateProfilePicture() {
        const formData = new FormData()
        const response = await ImagePicker.launchImageLibraryAsync({
            aspect: [4, 4],
            allowsEditing: true,
            base64: true,
            quality: 1
        });
        // @ts-ignore
        if (!response.cancelled) {
            const user_jwt = await AsyncStorage.getItem('@user-jwt')
            if (!user_jwt) return
            // @ts-ignore
            const compressedImage = await compressImage(response.assets[0].uri)
            console.log(compressedImage)
            // @ts-ignore
            formData.append('file', {
                name: `.jpeg`,
                type: 'image/jpeg',
                // @ts-ignore
                uri: compressedImage.uri
            })

            await saveProfilePictureService(formData, user_jwt)
                .then((response) => {
                    const imgPath = `http://${MY_IP}/${response.data.profile_picture}?timestamp=${Date.now()}`
                    // @ts-ignore
                    setUser({...user, profile_picture: imgPath})
                    console.log('Foto de perfil atualizada')
                })
                .catch((error) => {
                    console.log(error)
                    Alert.alert('Error', 'An error occurred while trying to update your profile picture')
                })
        }
    }

    return (
        <UserContext.Provider value={{
            createUserAccount,
            updateUserAccount,
            updateProfilePicture
        }}>
            {children}
        </UserContext.Provider>
    );
}
