import styled from "styled-components/native";
import {Platform} from "react-native";

export const ContainerProfile = styled.View`
    flex: 1;
    background-color: white;
    align-items: center;
    justify-content: center;
`

export const UserNameText = styled.Text`
    font-size: 30px;
    font-weight: bold;
    color: #000;
`

export const ContentProfile = styled.View`
    width: 92%;
    flex: 0.90;
    align-items: center;
    flex-direction: column;
    justify-content: flex-start;
`

export const HeaderProfileContainer = styled.View`
    display: flex;
    flex-direction: column;
    //background-color: #f5f5f5;
    //padding: 20px;
    //border-radius: 15px;
    gap: 20px;
    width: 100%;
`

export const HeaderProfileContent = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    gap: 20px;
`

export const ProfileImageShadow = styled.View`
    box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.20);
`

export const ProfileImage = styled.Image`
    width: 100px;
    height: 100px;
    border-radius: 100px;
    background-color: black;
`

export const UserDataContainer = styled.View`
    display: flex;
    align-items: flex-start;
    justify-content: center;
`

export const UserEmailText = styled.Text`
    font-size: 20px;
    color: #000;
`

export const OptionsContainer = styled.View`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 70%;
    gap: 30px;
    align-items: flex-start;
    justify-content: flex-start;
    margin-top: 50px;
`

export const ProfileItemContainer = styled.View`
    display: flex;
    align-items: flex-start;
    width: 100%;
`

export const FavoriteGenresContainer = styled.View`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 10px;
    align-items: flex-start;
    justify-content: flex-start;
`

export const FavoriteGenresTitle = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: #000;
`