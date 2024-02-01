import styled from "styled-components/native";

export const MovieDetailsContainer = styled.View`
    flex: 1;
    align-items: center;
    justify-content: flex-end;
`;

export const MovieDetailsContent = styled.View`
    width: 90%;
    height: 96%;
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
    padding-right: 15px;
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
    flex-direction: column;
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

    margin-top: 20px;
`;

export const MovieTitle = styled.Text`
    font-size: 25px;
    font-weight: bold;
    color: black;
`;

export const MovieGenres = styled.Text.attrs({
    numberOfLines: 2
})`
    font-size: 16px;
    color: black;
`


export const MovieDuration = styled.Text`
    font-size: 16px;
    color: black;
    font-style: italic;
`;

export const GenresContainer = styled.View`
    width: 100%;
    max-width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-top: 10px;
`;

export const MovieDescription = styled.Text`
    font-size: 16px;
    color: black;
    padding-top: 45px;
`;

export const WriteReviewContainer = styled.View`
    //border-radius: 40px;
    position: absolute;
    width: 100%;
    height: 50px;
    bottom: 0;
    margin-bottom: 30px;
    //box-shadow: 20px 10px 20px rgba(0, 0, 0, 0.40);
`;

export const VoteAverageContainer = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-top: 20px;
`

export const VoteAverage = styled.Text`
    font-size: 30px;
    color: black;
    font-weight: bold;
`;

