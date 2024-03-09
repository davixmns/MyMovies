import {FlatList, Platform, TouchableOpacity} from 'react-native';
import {useMovieContext} from "../contexts/MovieContext";
import {MovieCard} from "../components/MovieCard";
import {useAuthContext} from "../contexts/AuthContext";
import GenresCapsules from "../components/GenresCapsules";
import {FontAwesome6} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import styled from "styled-components/native";
import CircularImage from "../components/CircularImage";
import {Movie} from "../interfaces/interfaces";

export function Home() {
    const {user} = useAuthContext()
    const navigation = useNavigation<any>();
    const {upcomingMovies, nowPlayingMovies, allGenres, popularMovies} = useMovieContext();

    function renderMovie({item: movie}: { item: Movie }, size: string) {
        return (
            <CardPadding>
                <MovieCard
                    movie={movie}
                    size={size}
                    tmdbMovieId={movie.id.toString()}
                />
            </CardPadding>
        )
    }

    return (
        <Container>
            <Content>
                <MainScroll showsVerticalScrollIndicator={false}>
                    <HeaderContainer>
                        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                            <CircularImage profilePicture={user?.profile_picture} width={50}/>
                        </TouchableOpacity>
                        <TitleHome>MyMovies</TitleHome>
                        <FontAwesome6 name="bell" size={30} color="black"/>
                    </HeaderContainer>
                    {allGenres?.length > 0 && (
                        <GenresContainer>
                            <GenresScroll>
                                <GenresCapsules genres={allGenres}/>
                            </GenresScroll>
                        </GenresContainer>
                    )}
                    {nowPlayingMovies?.length > 0 && (
                        <ListContainer>
                            <SectionTitleContainer>
                                <SectionTitle>Now Playing Movies 🎬</SectionTitle>
                            </SectionTitleContainer>
                            <FlatList
                                data={nowPlayingMovies}
                                renderItem={({item}) => renderMovie({item}, 'big')}
                                keyExtractor={item => item.id.toString()}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                numColumns={1}
                            />
                        </ListContainer>
                    )}
                    {popularMovies?.length > 0 && (
                        <ListContainer2>
                            <SectionTitleContainer>
                                <SectionTitle>Popular Movies 🌟</SectionTitle>
                            </SectionTitleContainer>
                            <FlatList
                                data={popularMovies}
                                renderItem={({item}) => renderMovie({item}, 'medium')}
                                keyExtractor={item => item.id.toString()}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                numColumns={1}
                            />
                        </ListContainer2>
                    )}
                    {upcomingMovies?.length > 0 && (
                        <ListContainer2>
                            <SectionTitleContainer>
                                <SectionTitle>Upcoming Movies 🏃‍♂️</SectionTitle>
                            </SectionTitleContainer>
                            <FlatList
                                data={upcomingMovies}
                                renderItem={({item}) => renderMovie({item}, 'small')}
                                keyExtractor={item => item.id.toString()}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                numColumns={1}
                            />
                        </ListContainer2>
                    )}
                </MainScroll>
            </Content>
        </Container>
    )
}

const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: flex-end;
    background-color: white;
`

const Content = styled.View`
    flex: ${Platform.OS === 'ios' ? 0.94 : 0.98};
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
`;

const TitleHome = styled.Text`
    font-size: 25px;
    font-weight: bold;
    color: black;
    margin-bottom: 10px;
    align-self: flex-end;
    padding-right: 20px;
`

const SectionTitle = styled.Text`
    font-size: 24px;
    font-weight: bold;
    color: black;
    margin-bottom: 10px;
    padding-left: 10px;
`

const SectionTitleContainer = styled.View`
    width: 100%;
    flex-direction: row;
    gap: 15px;
`

const HeaderContainer = styled.View`
    width: 95%;
    flex-direction: row;
    margin-bottom: 10px;
    align-items: center;
    align-self: center;
    justify-content: space-between
`

const MainScroll = styled.ScrollView.attrs({
    showsVerticalScrollIndicator: false,
    contentContainerStyle: {
        width: '100%',
        paddingBottom: 90,
    }
})`
`

const CardPadding = styled.View`
  padding-right: 10px;
  padding-left: 10px;
  box-shadow: -10px 10px 5px rgba(0, 0, 0, 0.20);
`

const GenresContainer = styled.View`
    margin-bottom: 20px;
`

const GenresScroll = styled.ScrollView.attrs({
    horizontal: true,
    showsHorizontalScrollIndicator: false,
})`
    width: 100%;
    padding-left: 10px;
`

const ListContainer = styled.View`
  min-height: 34%;
`

const ListContainer2 = styled.View`
  margin-top: 15px;
  min-height: 27%;
`

