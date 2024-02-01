import {FlatList, View} from 'react-native';
import {useMovieContext} from "../../contexts/MovieContext";
import {MovieCard} from "../../components/MovieCard";
import {
    CardPadding,
    ContainerHome,
    ContentHome,
    MainScroll,
    NowPlayingContainer,
    SearchContainer,
    TitleContainer,
    TitleHome
} from "./styles";
import {useAuthContext} from "../../contexts/AuthContext";
import {MyTextInput} from "../../components/MyTextInput";
import {useState} from "react";

export function Home() {
    const [searchText, setSearchText] = useState('')
    const {user} = useAuthContext()
    const {upcomingMovies, nowPlayingMovies, moviesIsLoading} = useMovieContext();
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
                        <TitleHome>{`Welcome ${user?.name.split(' ')[0]}! 👋`}</TitleHome>
                    </TitleContainer>
                    <SearchContainer>
                        <MyTextInput
                            text={searchText}
                            setText={setSearchText}
                            placeholder={'Search Here'}
                            iconName={'magnifying-glass'}
                        />
                    </SearchContainer>
                    <View>
                        <TitleContainer>
                            <TitleHome>Now Playing Movies 🎬</TitleHome>
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
                            <TitleHome>Upcoming Movies 🏃‍♂️</TitleHome>
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
