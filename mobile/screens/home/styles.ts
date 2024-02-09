import styled from "styled-components/native";
import {Platform} from "react-native";

export const ContainerHome = styled.View`
    flex: 1;
    align-items: center;
    justify-content: flex-end;
    background-color: white;

`

export const ContentHome = styled.View`
    flex: ${Platform.OS === 'ios' ? 0.93 : 0.97};
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    width: 95%;
`;

export const TitleHome = styled.Text`
    font-size: 30px;
    font-weight: bold;
    color: black;
    margin-bottom: 10px;
`

export const SubTitleHome = styled.Text`
    font-size: 24px;
    font-weight: bold;
    color: black;
    margin-bottom: 10px;
`



export const TitleContainer = styled.View`
    width: 100%;
    align-items: flex-start;
    flex-direction: row;
    gap: 15px;
    margin-bottom: 15px;
`

export const MainScroll = styled.ScrollView`
    height: 100%;
    width: 100%;
`

export const CardPadding = styled.View`
    padding-right: 10px;
    box-shadow: -10px 10px 5px rgba(0, 0, 0, 0.20);
`

export const NowPlayingContainer = styled.View`
    padding-bottom: 20px;
    padding-right: 10px;
    box-shadow: -10px 10px 5px rgba(0, 0, 0, 0.20);
`

export const GenresContainer = styled.View`
    margin-bottom: 10px;
`

export const TinyProfilePic = styled.Image`
    width: 50px;
    height: 50px;
    border-radius: 25px;
`
