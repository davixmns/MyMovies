import styled from "styled-components/native";

export const ContainerProfile = styled.View`
  flex: 1;
  background-color: white;
  align-items: center;
  justify-content: center;
`

export const ContentProfile = styled.View`
    width: 95%;
    height: 80%;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
`

export const UserNameText = styled.Text`
    font-size: 30px;
    font-weight: bold;
    color: #000;
`

export const HeaderProfileContainer = styled.View`
    display: flex;
    flex-direction: column;
    width: 90%;
    background-color: antiquewhite;
    align-items: center;
`

export const ProfileImageShadow = styled.View`
    box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.20);
`

export const ProfileImage = styled.Image`
    width: 150px;
    height: 150px;
    border-radius: 100px;
    background-color: black;
`

export const UserDataContainer = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`

export const UserEmailText = styled.Text`
    font-size: 20px;
    color: #000;
`