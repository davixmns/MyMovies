import {useAuthContext} from "../contexts/AuthContext";
//@ts-ignore
import defaultPicture from '../assets/default_picture.jpg'
import {Alert, Platform, StyleSheet} from "react-native";
import {TextButton} from "../components/TextButton";
import {useMovieContext} from "../contexts/MovieContext";
import GenresCapsules from "../components/GenresCapsules";
import styled from "styled-components/native";
import {useNavigation} from "@react-navigation/native";
import {useEffect, useState} from "react";
import {LinearGradient} from "expo-linear-gradient";
import CircularImage from "../components/CircularImage";


export const Profile = () => {
    const navigation = useNavigation()
    const {user, logout} = useAuthContext()
    const {userFavoriteGenres, genreStylesForConsult} = useMovieContext()

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

    function goToScreen(screen: string) {
        // @ts-ignore
        navigation.navigate(screen)
    }


    return (
        <Container>
            <Content>
                <LinearGradient style={styles.header}
                                colors={genreStylesForConsult[Math.floor(Math.random() * genreStylesForConsult.length)].colors}>
                    <HeaderContent onPress={() => goToScreen('EditProfile')}>
                        <ImageShadow>
                            <CircularImage profilePicture={user?.profile_picture} width={100}/>
                        </ImageShadow>
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
                            <UserEmailText>You don't have favorite genres yet</UserEmailText>
                        )}
                    </FavoriteGenresContainer>
                </LinearGradient>
                <OptionsContainer>
                    <FavoriteGenresTitle>Options</FavoriteGenresTitle>
                    <ProfileItemContainer>
                        <TextButton
                            onPress={() => goToScreen('Settings')}
                            placeholder={'Settings'}
                            iconName={'gear'}
                            iconColor={'gray'}
                            arrowIcon={true}
                        />
                    </ProfileItemContainer>
                    <ProfileItemContainer>
                        <TextButton
                            onPress={() => goToScreen('EditProfile')}
                            placeholder={'Edit profile'}
                            iconName={'pencil'}
                            iconColor={'lightblue'}
                            arrowIcon={true}
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


const Content = styled.View`
  width: 92%;
  flex: ${Platform.OS === 'ios' ? 0.93 : 0.98};
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
`

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        width: '100%',
        padding: 20,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    }
})

const HeaderContent = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  gap: 20px;
`

const ImageShadow = styled.View`
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.20);
`

const UserDataContainer = styled.View`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 60%;
`

const UserNameText = styled.Text.attrs({
    numberOfLines: 2,
})`
  font-size: 25px;
  font-weight: bold;
  color: #000;
`

const UserEmailText = styled.Text.attrs({
    numberOfLines: 1,
})`
  width: 100%;
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