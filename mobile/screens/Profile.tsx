import {useAuthContext} from "../contexts/AuthContext";
//@ts-ignore
import defaultPicture from '../assets/default_picture.jpg'
import {Alert, Platform} from "react-native";
import {TextButton} from "../components/TextButton";
import {useMovieContext} from "../contexts/MovieContext";
import GenresCapsules from "../components/GenresCapsules";
import styled from "styled-components/native";
import {useNavigation} from "@react-navigation/native";
import {useState} from "react";


export const Profile = () => {
    const navigation = useNavigation()
    const {user, logout} = useAuthContext()
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

    function renderProfileImage() {
        if (user?.profile_picture) {
            return <ProfileImage source={{uri: user?.profile_picture}}/>
        } else {
            return <ProfileImage source={defaultPicture}/>
        }
    }

    function goToScreen(screen: string) {
        // @ts-ignore
        navigation.navigate(screen)
    }


    return (
        <Container>
            <Content>
                <HeaderContainer>
                    <HeaderContent>
                        <ImageContainerButton onPress={() => goToScreen('EditProfile')}>
                            {renderProfileImage()}
                        </ImageContainerButton>
                        <UserDataContainer>
                            <UserNameText>{user?.name}</UserNameText>
                            <UserEmailText>{user?.email}</UserEmailText>
                        </UserDataContainer>
                    </HeaderContent>

                    <FavoriteGenresContainer>
                        <FavoriteGenresTitle>Favorite Genres</FavoriteGenresTitle>
                        {userFavoriteGenres.length > 0 ? (
                            <GenresCapsules genres={userFavoriteGenres}/>
                        ) : (
                            <FavoriteGenresTitle>No favorite genres</FavoriteGenresTitle>
                        )}
                    </FavoriteGenresContainer>
                </HeaderContainer>
                <OptionsContainer>
                    <FavoriteGenresTitle>Options</FavoriteGenresTitle>
                    <ProfileItemContainer>
                        <TextButton
                            onPress={() => goToScreen('Settings')}
                            placeholder={'Settings'}
                            iconName={'gear'}
                            iconColor={'gray'}
                        />
                    </ProfileItemContainer>
                    <ProfileItemContainer>
                        <TextButton
                            onPress={() => goToScreen('EditProfile')}
                            placeholder={'Edit profile'}
                            iconName={'pencil'}
                            iconColor={'lightblue'}
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
                </OptionsContainer>
            </Content>
        </Container>
    );
};

const Container = styled.View`
  flex: 1;
  background-color: white;
  align-items: center;
  justify-content: flex-end;
`

const UserNameText = styled.Text.attrs({
    numberOfLines: 1
})`
  font-size: 30px;
  font-weight: bold;
  color: #000;
`

const Content = styled.View`
  width: 92%;
  flex: ${Platform.OS === 'ios' ? 0.93 : 0.98};
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
`

const HeaderContainer = styled.View`
  display: flex;
  flex-direction: column;

  gap: 20px;
  width: 100%;
`

const HeaderContent = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  gap: 20px;
`

const ImageContainerButton = styled.TouchableOpacity`
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.20);
`

const ProfileImage = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 100px;
  background-color: black;
`

const UserDataContainer = styled.View`
  display: flex;
  align-items: flex-start;
  justify-content: center;
`

const UserEmailText = styled.Text`
  font-size: 20px;
  color: #000;
`

const OptionsContainer = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 70%;
  gap: 30px;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 25px;
`

const ProfileItemContainer = styled.View`
  display: flex;
  align-items: flex-start;
  width: 100%;
`

const FavoriteGenresContainer = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
  align-items: flex-start;
  justify-content: flex-start;
`

const FavoriteGenresTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #000;
`