import {FlatList, ScrollView, View} from 'react-native';
import {useMovieContext} from "../../contexts/MovieContext";
import {MovieCard} from "../../components/MovieCard";
import {useAuthContext} from "../../contexts/AuthContext";
import {MyTextInput} from "../../components/MyTextInput";
import {useState} from "react";
import {
    CardPadding,
    ContainerHome,
    ContentHome, GenresContainer,
    MainScroll,
    NowPlayingContainer,
    SearchContainer,
    TitleContainer,
    TitleHome
} from "./styles";
import GenresCapsules from "../../components/GenresCapsules";

export function Home() {
    const [searchText, setSearchText] = useState('')
    const {user} = useAuthContext()
    const {upcomingMovies, nowPlayingMovies, allGenres} = useMovieContext();
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
                    <SearchContainer>
                        <MyTextInput
                            text={searchText}
                            setText={setSearchText}
                            placeholder={'Search Here'}
                            iconName={'magnifying-glass'}
                        />
                    </SearchContainer>
                    <GenresContainer>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <GenresCapsules genres={allGenres}/>
                        </ScrollView>
                    </GenresContainer>
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
