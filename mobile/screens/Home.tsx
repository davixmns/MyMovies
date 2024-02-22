import {FlatList, Platform, ScrollView, TouchableOpacity, View} from 'react-native';
import {useMovieContext} from "../contexts/MovieContext";
import {MovieCard} from "../components/MovieCard";
import {useAuthContext} from "../contexts/AuthContext";
import GenresCapsules from "../components/GenresCapsules";

// @ts-ignore
import defaultPicture from '../assets/default_picture.jpg'
import {FontAwesome6} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import styled from "styled-components/native";

export function Home() {
    const {user} = useAuthContext()
    const navigation = useNavigation();
    const {upcomingMovies, nowPlayingMovies, allGenres, popularMovies} = useMovieContext();
    const sortedNowPlayingMovies = nowPlayingMovies.sort((a, b) => {
        return b.vote_average - a.vote_average
    })

    // @ts-ignore
    function renderNowPlayingMovie({item: movie}) {
        return (
            <NowPlayingContainer>
                <MovieCard
                    movie={movie}
                    size={'big'}
                    tmdbMovieId={movie.id.toString()}
                />
            </NowPlayingContainer>
        );
    }

    // @ts-ignore
    function renderUpcomingMovie({item: movie}) {
        return (
            <CardPadding>
                <MovieCard
                    movie={movie}
                    size={'small'}
                    tmdbMovieId={movie.id.toString()}
                />
            </CardPadding>
        )
    }

    // @ts-ignore
    function renderPopularMovie({item: movie}) {
        return (
            <CardPadding>
                <MovieCard
                    movie={movie}
                    size={'small'}
                    tmdbMovieId={movie.id.toString()}
                />
            </CardPadding>
        )
    }

    function goToProfile() {
        // @ts-ignore
        navigation.navigate('Profile')
    }

    return (
        <Container>
            <Content>
                <MainScroll showsVerticalScrollIndicator={false}>
                    <HeaderContainer>
                        {user?.profile_picture === null ? (
                            <TouchableOpacity onPress={goToProfile}>
                                <TinyProfilePic source={defaultPicture}/>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={goToProfile}>
                                {/*@ts-ignore*/}
                                {/*<TinyProfilePic source={{uri: user?.profile_picture}}/>*/}
                            </TouchableOpacity>
                        )}
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
                    {sortedNowPlayingMovies?.length > 0 && (
                        <SectionContainer>
                            <SectionTitleContainer>
                                <SectionTitle>Now Playing Movies 🎬</SectionTitle>
                            </SectionTitleContainer>
                            <FlatList
                                data={sortedNowPlayingMovies}
                                renderItem={renderNowPlayingMovie}
                                keyExtractor={item => item.id.toString()}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                numColumns={1}
                            />
                        </SectionContainer>
                    )}
                    {sortedNowPlayingMovies?.length > 0 && (
                        <SectionContainer2>
                            <SectionTitleContainer>
                                <SectionTitle>Popular Movies 🌟</SectionTitle>
                            </SectionTitleContainer>
                            <FlatList
                                data={popularMovies}
                                renderItem={renderPopularMovie}
                                keyExtractor={item => item.id.toString()}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                numColumns={1}
                            />
                        </SectionContainer2>
                    )}
                    {upcomingMovies?.length > 0 && (
                        <SectionContainer2>
                            <SectionTitleContainer>
                                <SectionTitle>Upcoming Movies 🏃‍♂️</SectionTitle>
                            </SectionTitleContainer>
                            <FlatList
                                data={upcomingMovies}
                                renderItem={renderUpcomingMovie}
                                keyExtractor={item => item.id.toString()}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                numColumns={1}
                            />
                        </SectionContainer2>
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

const NowPlayingContainer = styled.View`
    padding-bottom: 20px;
    padding-left: 10px;
    padding-right: 10px;
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

const TinyProfilePic = styled.Image`
    width: 50px;
    height: 50px;
    border-radius: 25px;
`
const SectionContainer = styled.View`
    height: 37%;
`

const SectionContainer2 = styled.View`
    height: 27%;
`

