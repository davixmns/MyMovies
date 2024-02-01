import {useMovieContext} from "../../contexts/MovieContext";
import {MovieCard} from "../../components/MovieCard";
import styled from "styled-components/native";

export function Favorites() {
    const {myFavoriteMovies} = useMovieContext();

    return (
        <ContainerFavorites>
            <ContentFavorites>
                <ScrollFavorites>
                    <TitleFavoriteContainer>
                        <TitleFavorites>Favorite Movies ❤️</TitleFavorites>
                    </TitleFavoriteContainer>
                    <MoviesContainer>
                        {myFavoriteMovies.map((movie, index) => (
                            <MovieCardWrapper key={index}>
                                <MovieCard
                                    movie={movie}
                                    size={'medium'}
                                    tmdbMovieId={movie.tmdb_movie_id.toString()}
                                />
                            </MovieCardWrapper>
                        ))}
                    </MoviesContainer>
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
`;

const ContentFavorites = styled.View`
    flex: 0.93;
    align-items: center;
    justify-content: flex-start;
    width: 95%;
`;

const ScrollFavorites = styled.ScrollView.attrs({
    contentContainerStyle: {
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
})`
    width: 100%;
`;

const MoviesContainer = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    width: 100%;
    padding-top: 20px;
`;

const MovieCardWrapper = styled.View`
    width: 48%;
    margin-bottom: 10px;
    box-shadow: -10px 10px 5px rgba(0, 0, 0, 0.20);

`;

const TitleFavoriteContainer = styled.View`
    width: 100%;
    align-items: flex-start;
    //padding-left: 20px;
`;

const TitleFavorites = styled.Text`
    font-size: 24px;
    font-weight: bold;
    text-align: center;
`;
