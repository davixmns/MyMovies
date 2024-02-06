import styled from "styled-components/native";
import {MovieCard} from "../../components/MovieCard";
import {useEffect, useState} from "react";
import {getMoviesByGenreService} from "../../service/service";
import {Alert, Image} from "react-native";
import {Movie} from "../../interfaces/interfaces";
import {AntDesign} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";

// @ts-ignore
export function MoviesByGenre({route}) {
    const movieGenreId = route.params.movieGenreId;
    const movieGenreName = route.params.movieGenreName;
    const [moviesByGenre, setMoviesByGenre] = useState<Movie[]>([]);
    const navigation = useNavigation();
    //escolher index aleatorio com limite de moviesByGenre.length
    const randomIndex = Math.floor(Math.random() * moviesByGenre.length);
    const posterBackground = moviesByGenre[randomIndex]?.backdrop_path;

    console.log(randomIndex)

    useEffect(() => {
        async function loadMoviesByGenre() {
            await getMoviesByGenreService(movieGenreId)
                .then((response) => {
                    const movies = response.data.results
                    setMoviesByGenre(movies)
                })
                .catch((error) => {
                    console.log(error)
                    Alert.alert('Error', 'An error occurred while trying to load movies by genre')
                })
        }

        loadMoviesByGenre()
    }, []);


    return (
        <Container>

            <Image
                source={{uri: `https://image.tmdb.org/t/p/w500${posterBackground}`}}
                style={{width: '100%', height: '100%', position: 'absolute', opacity: 0.7}}
                blurRadius={40}
            />

            <Content>
                <HeaderContainer>
                    <BackButton onPress={() => navigation.goBack()}>
                        <AntDesign name="arrowleft" size={35} color="black" style={{padding: 5}}/>
                    </BackButton>
                    <TitleContainer>
                        <Title>{movieGenreName} Movies</Title>
                    </TitleContainer>
                </HeaderContainer>
                <ScrollMovies>
                    <MoviesContainer>
                        {moviesByGenre.map((movie, index) => (
                            <MovieCardWrapper key={index}>
                                <MovieCard
                                    // @ts-ignore
                                    movie={movie}
                                    size={'medium'}
                                    // @ts-ignore
                                    tmdbMovieId={movie.id.toString()}
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
    flex: 0.93;
    align-items: center;
    justify-content: flex-start;
    width: 95%;
`;

const ScrollMovies = styled.ScrollView.attrs({
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
    padding-top: 20px;
`;

const MovieCardWrapper = styled.View`
    width: 48%;
    margin-bottom: 10px;
    box-shadow: -10px 10px 5px rgba(0, 0, 0, 0.20);

`;

const TitleContainer = styled.View`
    width: 100%;
    align-items: flex-start;
    //padding-left: 20px;
`;

const Title = styled.Text`
    font-size: 24px;
    font-weight: bold;
    text-align: center;
`;

const HeaderContainer = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
`;

const BackButton = styled.TouchableOpacity`
`;
