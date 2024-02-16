import {useMovieContext} from "../contexts/MovieContext";
import {MovieCard} from "../components/MovieCard";
import styled from "styled-components/native";
import {Platform, View} from "react-native";

export function Favorites() {
    const {myFavoriteMovies} = useMovieContext();

    return (
        <Container>
            <Content>
                <TitleContainer>
                    <Title>Your Favorites</Title>
                </TitleContainer>
                <ScrollMovies>
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
                </ScrollMovies>
            </Content>
        </Container>
    );
}

const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    background-color: white;
`;

const Content = styled.View`
    flex: ${Platform.OS === 'ios' ? 0.93 : 0.97};
    align-items: center;
    justify-content: flex-start;
    width: 95%;
`;

const ScrollMovies = styled.ScrollView.attrs({
    contentContainerStyle: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingBottom: 100,
    },
    showsVerticalScrollIndicator: false,
})`
    width: 100%;
`;

const MoviesContainer = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    gap: 15px;
`;

const MovieCardWrapper = styled.View`
    box-shadow: -10px 10px 5px rgba(0, 0, 0, 0.20);
`;



const TitleContainer = styled.View`
    width: 100%;
    align-items: flex-start;
    padding-bottom: 20px;
`;

const Title = styled.Text`
    font-size: 30px;
    font-weight: bold;
    text-align: center;
`;
