import {useMovieContext} from "../../contexts/MovieContext";
import {MovieCard} from "../../components/MovieCard";
import styled from "styled-components/native";
import {Platform, View} from "react-native";

export function Favorites() {
    const {myFavoriteMovies} = useMovieContext();

    return (
        <ContainerFavorites>
            <ContentFavorites>
                <TitleFavoriteContainer>
                    <TitleFavorites>Your Favorites ❤️</TitleFavorites>
                </TitleFavoriteContainer>
                <ScrollFavorites>
                    <MoviesContainer>
                        {myFavoriteMovies.map((movie, index) => (
                            <MovieCardWrapper key={index}>
                                <MovieCard
                                    // @ts-ignore
                                    movie={movie}
                                    size={'medium'}
                                    // @ts-ignore
                                    tmdbMovieId={movie.tmdb_movie_id.toString()}
                                />
                            </MovieCardWrapper>
                        ))}
                    </MoviesContainer>
                    <View style={{height: 100}}/>
                </ScrollFavorites>
            </ContentFavorites>
        </ContainerFavorites>
    );
}

const ContainerFavorites = styled.View`
    flex: 1;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    background-color: white;
`;

const ContentFavorites = styled.View`
    flex: ${Platform.OS === 'ios' ? 0.93 : 0.97};
    align-items: center;
    justify-content: flex-start;
    width: 95%;
`;

const ScrollFavorites = styled.ScrollView.attrs({
    contentContainerStyle: {
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    showsVerticalScrollIndicator: false,
})`
    width: 100%;
`;

const MoviesContainer = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    width: 100%;
`;

const MovieCardWrapper = styled.View`
    width: 48%;
    margin-bottom: 10px;
    box-shadow: -10px 10px 5px rgba(0, 0, 0, 0.20);

`;

const TitleFavoriteContainer = styled.View`
    width: 100%;
    align-items: flex-start;
    padding-bottom: 15px;
    //padding-left: 20px;
`;

const TitleFavorites = styled.Text`
    font-size: 30px;
    font-weight: bold;
    text-align: center;
`;
