import {
    ContainerProfile,
    ContentProfile,
    HeaderProfileContainer,
    ProfileImage,
    ProfileImageShadow,
    UserDataContainer,
    UserEmailText,
    UserNameText
} from "./styles";
import {MyButton} from "../../components/MyButton";
import {ButtonContainer} from "../login/styles";
import {useAuthContext} from "../../contexts/AuthContext";

//@ts-ignore
import defaultPicture from '../../assets/default_picture.jpg'
import {useMovieContext} from "../../contexts/MovieContext";
import {useEffect} from "react";

export const Profile = () => {
    const {myFavoriteMovies} = useMovieContext()
    const {user, logout} = useAuthContext()

    useEffect(() => {
        console.log(favoritesGenres())
    }, []);

    function favoritesGenres() {
        
    }

    function handleLogout() {
        if (logout) logout()
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
                    <ProfileImageShadow>
                        {renderProfileImage()}
                    </ProfileImageShadow>
                    <UserDataContainer>
                        <UserNameText>{user?.name.split(' ')[0] + ' ' + user?.name.split(' ')[1]}</UserNameText>
                        <UserEmailText>{user?.email}</UserEmailText>
                    </UserDataContainer>
                </HeaderProfileContainer>
                <ButtonContainer>
                    <MyButton onPress={handleLogout}>Log Out</MyButton>
                </ButtonContainer>
            </ContentProfile>
        </ContainerProfile>
    );
};