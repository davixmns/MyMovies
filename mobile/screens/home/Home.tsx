import {ActivityIndicator, FlatList, ScrollView, View} from 'react-native';
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
    SubTitleHome,
    TitleContainer,
    TitleHome
} from "./styles";
import {LoadingContainer} from "../movie_details/styles";

export function Home() {
    const {user} = useAuthContext()
    const {upcomingMovies, nowPlayingMovies, allGenres, moviesIsLoading} = useMovieContext();
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

    return (
        <ContainerHome>
            <ContentHome>
                <MainScroll showsVerticalScrollIndicator={false}>
                    <TitleContainer>
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
