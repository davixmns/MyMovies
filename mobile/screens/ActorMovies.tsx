import styled from "styled-components/native";
import {MovieCard} from "../components/MovieCard";
import {useEffect, useState} from "react";
import {getActorMoviesService} from "../service/service";
import {Alert, Image, Platform} from "react-native";
import {Movie} from "../interfaces/interfaces";
import {AntDesign} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";

// @ts-ignore
export function ActorMovies({route}) {
    const navigation = useNavigation();
    const actorId = route.params.actorId;
    const actorName = route.params.actorName;
    const actorProfilePath = route.params.actorProfilePath;
    const [moviesByActor, setMoviesByActor] = useState<Movie[]>([]);
    const randomIndex = Math.floor(Math.random() * moviesByActor.length);
    const posterBackground = moviesByActor[randomIndex]?.backdrop_path;

    useEffect(() => {
        async function loadMoviesByActor() {
            await getActorMoviesService(actorId)
                .then((response) => {
                    setMoviesByActor(response)
                })
                .catch((error) => {
                    console.log(error)
                    Alert.alert('Error', 'An error occurred while trying to load movies by genre')
                })
        }

        loadMoviesByActor()
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
                        <Title>Actor Movies</Title>
                    </TitleContainer>
                </HeaderContainer>
                <ScrollMovies>
                    <ActorInfoContainer>
                        <Image
                            source={{uri: `https://image.tmdb.org/t/p/w500${actorProfilePath}`}}
                            style={{width: 150, height: 150, borderRadius: 100}}
                        />
                        <Title style={{marginTop: 10}}>{actorName}</Title>
                    </ActorInfoContainer>
                    <MoviesContainer>
                        {moviesByActor.map((movie, index) => (
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

const ActorInfoContainer = styled.View`
    width: 100%;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

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
    padding-top: 20px;
    gap: 15px;
`;

const MovieCardWrapper = styled.View`
    margin-bottom: 10px;
    box-shadow: -10px 10px 5px rgba(0, 0, 0, 0.20);
    width: 170px;
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
