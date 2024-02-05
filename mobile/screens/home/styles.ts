import styled from "styled-components/native";

export const ContainerHome = styled.View`
    flex: 1;
    align-items: center;
    justify-content: flex-end;
    background-color: white;
`

export const ContentHome = styled.View`
  flex: 0.93;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`

export const TitleHome = styled.Text`
    font-size: 25px;
    font-weight: bold;
    color: black;
    margin-bottom: 10px;
`

export const TitleContainer = styled.View`
    width: 100%;
    align-items: flex-start;
    padding: 0 10px;
`

export const MainScroll = styled.ScrollView`
    height: 100%;
`

export const CardPadding = styled.View`
    padding-left: 10px;
    padding-right: 10px;
    box-shadow: -10px 10px 5px rgba(0, 0, 0, 0.20);
`

export const SearchContainer = styled.View`
    width: 97%;
    padding-left: 10px;
    padding-bottom: 10px;
`

export const NowPlayingContainer = styled.View`
    padding-bottom: 20px;
    padding-left: 10px;
    padding-right: 10px;
    box-shadow: -10px 10px 5px rgba(0, 0, 0, 0.20);
`

export const GenresContainer = styled.View`
    margin-bottom: 20px;
    padding-left: 10px;
`
