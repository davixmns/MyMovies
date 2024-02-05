import {useAuthContext} from "../../contexts/AuthContext";
//@ts-ignore
import defaultPicture from '../../assets/default_picture.jpg'
import {Alert} from "react-native";
import {TextButton} from "../../components/TextButton";
import {
    ContainerProfile,
    ContentProfile,
    HeaderProfileContainer, OptionsContainer,
    ProfileImage,
    ProfileImageShadow, ProfileItemContainer,
    UserDataContainer,
    UserEmailText,
    UserNameText
} from "./styles";


export const Profile = () => {
    const {user, logout} = useAuthContext()

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
                <OptionsContainer>
                    <ProfileItemContainer>
                        <TextButton
                            onPress={handleLogout}
                            placeholder={'Sign out'}
                            iconName={'right-from-bracket'}
                        />
                    </ProfileItemContainer>

                </OptionsContainer>
            </ContentProfile>
        </ContainerProfile>
    );
};