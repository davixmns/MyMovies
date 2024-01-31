import styled from "styled-components/native";

export const MovieDetailsContainer = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const MovieDetailsContent = styled.View`
    width: 90%;
    height: 90%;
    align-items: center;
    justify-content: flex-start;
`

export const HeaderContainer = styled.View`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 70px;
    align-items: center;
    justify-content: space-between;
`;

export const HeaderTitle = styled.Text`
    font-size: 22px;
    font-weight: bold;
    color: black;
`;


export const FavoriteButton = styled.TouchableOpacity`
    
`;


export const BackButton = styled.TouchableOpacity`
    border-radius: 16px;
`;

export const MoviePoster = styled.Image`
    width: 240px;
    height: 360px;
    border-radius: 20px;
`;

export const MoviePosterContainer = styled.View`
    padding-top: 20px;
    flex-direction: row;
    align-items: center;
    box-shadow: 20px 20px 20px rgba(0, 0, 0, 0.40);
`;

export const LoadingContainer = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 100px;
`;

export const DescriptionContainer = styled.View`
    width: 100%;
    align-items: flex-start;
    justify-content: flex-start;
    
    margin-top: 40px;
`;

export const MovieTitle = styled.Text`
    font-size: 25px;
    font-weight: bold;
    color: black;
`;

export const MovieGenres = styled.Text`
    font-size: 16px;
    color: black;
`;