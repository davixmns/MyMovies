import styled from "styled-components/native";
import { MovieCard } from "../components/MovieCard";
import { useEffect, useState } from "react";
import { getMoviesByGenreService } from "../service/service";
import {ActivityIndicator, Alert, FlatList, Platform, StyleSheet} from "react-native";
import { Movie } from "../interfaces/interfaces";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

// @ts-ignore
export function MoviesByGenre({ route }) {
    const movieGenreId = route.params.movieGenreId;
    const movieGenreName = route.params.movieGenreName;
    const [page, setPage] = useState(1);
    const [moviesByGenre, setMoviesByGenre] = useState<Movie[]>([]);
    const navigation = useNavigation();

    useEffect(() => {
        loadMoviesByGenre();
    }, [page]);

    const loadMoviesByGenre = async () => {
        try {
            const newMovies = await getMoviesByGenreService(movieGenreId, page);
            if (newMovies.length === 0) return
            setMoviesByGenre((oldMovies) => [...oldMovies, ...newMovies]);
        } catch (error) {
            console.log(error);
            Alert.alert("Error", "An error occurred while trying to load movies by genre");
        }
    };

    const loadMoreMovies = () => {
        setPage(page + 1);
    }

    return (
        <Container>
            <Content>
                <HeaderContainer>
                    <BackButton onPress={() => navigation.goBack()}>
                        <AntDesign name="arrowleft" size={35} color="black" style={{ padding: 5 }} />
                    </BackButton>
                    <TitleContainer>
                        <Title>{movieGenreName} Movies</Title>
                    </TitleContainer>
                </HeaderContainer>
                <FlatList
                    data={moviesByGenre}
                    keyExtractor={(item) => item.id.toString()} // Use unique ID as key
                    renderItem={({ item }) => (
                        <MovieCardWrapper>
                            <MovieCard movie={item} size="medium" tmdbMovieId={item.id.toString()} />
                        </MovieCardWrapper>
                    )}
                    onEndReached={loadMoreMovies}
                    onEndReachedThreshold={0.1}
                    numColumns={2}
                    ListFooterComponent={<ActivityIndicator size="large" color="black" />}
                    columnWrapperStyle={{ justifyContent: 'space-around' }}
                    style={{ width: "100%" }}
                />
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

const MovieCardWrapper = styled.View`
  margin-bottom: 10px;
  width: 170px;
  height: 310px;
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
  width: 95%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  padding-bottom: 20px;
`;

const BackButton = styled.TouchableOpacity`
`;
