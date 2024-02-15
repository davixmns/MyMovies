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
                        {user?.profile_picture === undefined ? (
                            <TouchableOpacity onPress={goToProfile}>
                                <TinyProfilePic source={defaultPicture}/>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={goToProfile}>
                                {/*@ts-ignore*/}
                                <TinyProfilePic source={{uri: user?.profile_picture}}/>
                            </TouchableOpacity>
                        )}
                        <TitleHome>MyMovies</TitleHome>
                        <FontAwesome6 name="bell" size={30} color="black"/>
                    </HeaderContainer>
                    <GenresContainer>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <GenresCapsules genres={allGenres}/>
                        </ScrollView>
                    </GenresContainer>
                    <View>
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
                    </View>
                    <View>
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
                    </View>
                    <View style={{marginTop: 15}}>
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
                    </View>
                    <View style={{height: 100}}></View>
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
    flex: ${Platform.OS === 'ios' ? 0.95 : 0.97};
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    width: 95%;
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
`

const SectionTitleContainer = styled.View`
    width: 100%;
    flex-direction: row;
    gap: 15px;
`

const HeaderContainer = styled.View`
    width: 100%;
    flex-direction: row;
    margin-bottom: 10px;
    align-items: center;
    justify-content: space-between
`

const MainScroll = styled.ScrollView`
    height: 100%;
    width: 100%;
`

const CardPadding = styled.View`
    padding-right: 10px;
    box-shadow: -10px 10px 5px rgba(0, 0, 0, 0.20);
`

const NowPlayingContainer = styled.View`
    padding-bottom: 20px;
    padding-right: 10px;
    box-shadow: -10px 10px 5px rgba(0, 0, 0, 0.20);
`

const GenresContainer = styled.View`
    margin-bottom: 20px;
`

const TinyProfilePic = styled.Image`
    width: 50px;
    height: 50px;
    border-radius: 25px;
`

