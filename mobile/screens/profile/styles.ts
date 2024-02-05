import styled from "styled-components/native";

export const ContainerProfile = styled.View`
  flex: 1;
  background-color: white;
  align-items: center;
  justify-content: center;
`

export const ContentProfile = styled.View`
  width: 90%;
  height: 80%;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
`

export const UserNameText = styled.Text`
  font-size: 30px;
  font-weight: bold;
  color: #000;
`

export const HeaderProfileContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  gap: 20px
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
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`

export const UserEmailText = styled.Text`
  font-size: 20px;
  color: #000;
`

export const OptionsContainer = styled.View`
  margin-top: 60px;
  background-color: red;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 70%;
  align-items: flex-start;
  justify-content: flex-start;
`

export const ProfileItemContainer = styled.View`
  display: flex;
  align-items: flex-start;
  padding: 10px;
`
