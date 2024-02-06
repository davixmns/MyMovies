import {useAuthContext} from "../../contexts/AuthContext";
//@ts-ignore
import defaultPicture from '../../assets/default_picture.jpg'
import {Alert} from "react-native";
import {TextButton} from "../../components/TextButton";
import {
    ContainerProfile,
    ContentProfile, FavoriteGenresContainer, FavoriteGenresTitle, HeaderProfileContainer,
    HeaderProfileContent, OptionsContainer,
    ProfileImage,
    ProfileImageShadow, ProfileItemContainer,
    UserDataContainer,
    UserEmailText,
    UserNameText
} from "./styles";
import {useMovieContext} from "../../contexts/MovieContext";
import GenresCapsules from "../../components/GenresCapsules";


export const Profile = () => {
    const {user, logout, deleteMyAccount} = useAuthContext()
    const {userFavoriteGenres} = useMovieContext()

    function handleLogout() {
        if (!logout) return
        Alert.alert(
            "Sign out",
            "Are you sure you want to sign out?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {text: "Sign out", onPress: () => logout()}
            ]
        );
    }

    function handleDeleteMyAccount() {
        if (!deleteMyAccount) return
        Alert.alert(
            "Delete account",
            "Are you sure you want to delete your account?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {text: "Delete account", onPress: () => deleteMyAccount()}
            ]
        );
    }

    function renderProfileImage() {
        // @ts-ignore
        if (user?.profile_image) {
            // @ts-ignore
            return <ProfileImage source={{uri: user?.profile_image}}/>
        }
        return <ProfileImage source={defaultPicture}/>
    }

    return (
        <ContainerProfile>
            <ContentProfile>
                <HeaderProfileContainer>
                    <HeaderProfileContent>
                        <ProfileImageShadow>
                            {renderProfileImage()}
                        </ProfileImageShadow>
                        <UserDataContainer>
                            <UserNameText>{user?.name.split(' ')[0] + ' ' + user?.name.split(' ')[1]}</UserNameText>
                            <UserEmailText>{user?.email}</UserEmailText>
                        </UserDataContainer>
                    </HeaderProfileContent>

                    <FavoriteGenresContainer>
                        <FavoriteGenresTitle>Favorite Genres:</FavoriteGenresTitle>
                        <GenresCapsules genres={userFavoriteGenres} />
                    </FavoriteGenresContainer>

                </HeaderProfileContainer>
                <OptionsContainer>
                    <ProfileItemContainer>
                        <TextButton
                            onPress={() => {
                            }}
                            placeholder={'Edit profile'}
                            iconName={'pencil'}
                            iconColor={'lightblue'}
                        />
                    </ProfileItemContainer>
                    <ProfileItemContainer>
                        <TextButton
                            onPress={() => {
                            }}
                            placeholder={'Change password'}
                            iconName={'key'}
                            iconColor={'gold'}
                        />
                    </ProfileItemContainer>
                    <ProfileItemContainer>
                        <TextButton
                            onPress={handleLogout}
                            placeholder={'Sign out'}
                            iconName={'right-from-bracket'}
                            iconColor={'black'}
                        />
                    </ProfileItemContainer>
                    <ProfileItemContainer>
                        <TextButton
                            onPress={handleDeleteMyAccount}
                            placeholder={'Delete account'}
                            iconName={'trash'}
                            iconColor={'red'}
                        />
                    </ProfileItemContainer>

                </OptionsContainer>
            </ContentProfile>
        </ContainerProfile>
    );
};