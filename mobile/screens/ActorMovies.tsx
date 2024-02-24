import styled from "styled-components/native";
import {MovieCard} from "../components/MovieCard";
import {useEffect, useState} from "react";
import {getActorMoviesService} from "../service/service";
import {ActivityIndicator, Alert, FlatList, Image, ImageBackground, Platform} from "react-native";
import {Movie} from "../interfaces/interfaces";
import {AntDesign} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";

// @ts-ignore
export function ActorMovies({route}) {
    const navigation = useNavigation<StackNavigationProp<any>>();
    const actorId = route.params.actorId;
    const actorName = route.params.actorName;
    const actorProfilePath = route.params.actorProfilePath;
    const [moviesByActor, setMoviesByActor] = useState<Movie[]>([]);
    const randomIndex = Math.floor(Math.random() * moviesByActor?.length);
    const posterBackground = moviesByActor[randomIndex]?.backdrop_path;

    useEffect(() => {
        loadMoviesByActor()
    }, []);

    async function loadMoviesByActor() {
        await getActorMoviesService(actorId)
            .then((movies) => {
                setMoviesByActor(movies);
            })
            .catch((error) => {
                console.log(error);
                Alert.alert("Error", "An error occurred while trying to load movies by actor");
            })
    }

    return (
        <Container>
            <ImageBackground
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
                <ActorInfoContainer>
                    <Image
                        source={{uri: `https://image.tmdb.org/t/p/w500${actorProfilePath}`}}
                        style={{width: 150, height: 150, borderRadius: 100}}
                    />
                    <Title style={{marginTop: 10}}>{actorName}</Title>
                </ActorInfoContainer>
                {moviesByActor.length > 0 && (
                    <FlatList
                        data={moviesByActor}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({item}) => (
                            <MovieCardWrapper>
                                <MovieCard movie={item} size="medium" tmdbMovieId={item.id.toString()}/>
                            </MovieCardWrapper>
                        )}
                        numColumns={2}
                        columnWrapperStyle={{justifyContent: 'space-around'}}
                        style={{width: "100%"}}
                    />
                )}
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

const ActorInfoContainer = styled.View`
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const MovieCardWrapper = styled.View`
  margin-bottom: 10px;
  box-shadow: -10px 10px 5px rgba(0, 0, 0, 0.20);
  width: 170px;
  height: 310px;
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
