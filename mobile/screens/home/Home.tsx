import {FlatList, ScrollView, View} from 'react-native';
import {useMovieContext} from "../../contexts/MovieContext";
import {MovieCard} from "../../components/MovieCard";
import {useAuthContext} from "../../contexts/AuthContext";
import GenresCapsules from "../../components/GenresCapsules";
import {
    CardPadding,
    ContainerHome,
    ContentHome,
    GenresContainer,
    MainScroll,
    NowPlayingContainer,
    SubTitleHome, TinyProfilePic,
    TitleContainer,
    TitleHome
} from "./styles";


// @ts-ignore
import defaultPicture from '../../assets/default_picture.jpg'

export function Home() {
    const {user} = useAuthContext()
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

    return (
        <ContainerHome>
            <ContentHome>
                <MainScroll showsVerticalScrollIndicator={false}>
                    <TitleContainer>
                        {user?.profile_picture === undefined ? (
                            <TinyProfilePic source={defaultPicture}/>
                        ) : (
                            <TinyProfilePic source={{uri: user?.profile_picture}}/>
                        )}
                        <TitleHome>{`Welcome, ${user?.name.split(' ')[0]}! 👋`}</TitleHome>
                    </TitleContainer>
                    <GenresContainer>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <GenresCapsules genres={allGenres}/>
                        </ScrollView>
                    </GenresContainer>
                    <View>
                        <TitleContainer>
                            <SubTitleHome>Now Playing Movies 🎬</SubTitleHome>
                        </TitleContainer>
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
                        <TitleContainer>
                            <SubTitleHome>Popular Movies 🌟</SubTitleHome>
                        </TitleContainer>
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
                        <TitleContainer>
                            <SubTitleHome>Upcoming Movies 🏃‍♂️</SubTitleHome>
                        </TitleContainer>
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
            </ContentHome>
        </ContainerHome>
    );
}
