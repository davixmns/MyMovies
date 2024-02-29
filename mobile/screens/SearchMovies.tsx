import styled from "styled-components/native";
import {MyTextInput} from "../components/MyTextInput";
import {useEffect, useState} from "react";
import {GenreCard} from "../components/GenreCard";
import {ActivityIndicator, Platform, View} from "react-native";
import {useMovieContext} from "../contexts/MovieContext";
import {searchActorService, searchMovieService} from "../service/service";
import {Movie} from "../interfaces/interfaces";
import {MovieCard} from "../components/MovieCard";
import {ActorsList} from "../components/ActorsList";


export function SearchMovies() {
    const [prevSearchText, setPrevSearchText] = useState('');
    const [searchText, setSearchText] = useState('')
    const [findedMovies, setFindedMovies] = useState<Movie[]>([])
    const [findedActors, setFindedActors] = useState<any[]>([])
    const {userFavoriteGenres, genreStylesForConsult} = useMovieContext()
    const [searchTimer, setSearchTimer] = useState<NodeJS.Timeout | null>(null);
    const [movieIsFinded, setMovieIsFinded] = useState<boolean>(false);
    const [actorIsFinded, setActorIsFinded] = useState<boolean>(false);
    const [isSearching, setIsSearching] = useState<boolean>(false);

    useEffect(() => {
        if (searchText !== prevSearchText) {
            if (searchTimer) {
                clearTimeout(searchTimer);
            }
            setIsSearching(true)
            startSearchTimer(searchText);
            setPrevSearchText(searchText);
        }
    }, [searchText, prevSearchText, searchTimer]);

    // Função para iniciar o timer de pesquisa
    function startSearchTimer(text: string) {
        setSearchTimer(setTimeout(() => {
            if (text === searchText) {
                performSearch(text);
            } else {
                startSearchTimer(searchText);
            }
        }, 500));
    }

    // Função para realizar a pesquisa
    async function performSearch(text: string) {
        if (text !== '' && text !== null) {
            const moviesResults = await searchMovieService(text);
            const filteredMovies = moviesResults.data.results.filter((movie: Movie) => movie.poster_path !== null)
            setFindedMovies(filteredMovies);
            const actorsResults = await searchActorService(text);
            setFindedActors(actorsResults);
            setIsSearching(false)
            if (moviesResults.data.results.length === 0) {
                setMovieIsFinded(false)
            } else {
                setMovieIsFinded(true)
            }
            if (actorsResults.length === 0) {
                setActorIsFinded(false)
            } else {
                setActorIsFinded(true)
            }
        } else {
            setFindedMovies([]);
        }
    }


    return (
        <Container>
            <Content>
                <Title>Search</Title>
                <Header>
                    <MyTextInput
                        text={searchText}
                        setText={setSearchText}
                        placeholder={'Type here...'}
                        iconName={'magnifying-glass'}
                    />
                </Header>
                <SearchScroll>
                    {isSearching && searchText !== '' && (
                        <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
                            <ActivityIndicator size="large" color="black"/>
                        </View>
                    )}
                    {findedMovies.length === 0 && searchText === '' && (
                        <>
                            <View style={{marginTop: 20}}>
                                <GridContainer>
                                    <SubTitle>Maybe Interesting</SubTitle>
                                    <GridContent>
                                        <GenreCard genreName={'Top Rated'} iconName={'star'}/>
                                        <GenreCard genreName={'TV Movie'} iconName={'tv'}/>
                                        <GenreCard genreName={'Music'} iconName={'music'}/>
                                        <GenreCard genreName={'Documentary'} iconName={'file'}/>
                                    </GridContent>
                                </GridContainer>
                            </View>
                            {userFavoriteGenres.length > 3 && (
                                <View style={{marginTop: 50}}>
                                    <GridContainer>
                                        <SubTitle>Favorite Genres</SubTitle>
                                        <GridContent>
                                            <GenreCard
                                                genreName={userFavoriteGenres[0].name}
                                                iconName={genreStylesForConsult.find(genre => genre.name === userFavoriteGenres[0].name)?.icon}
                                            />

                                            <GenreCard
                                                genreName={userFavoriteGenres[1].name}
                                                iconName={genreStylesForConsult.find(genre => genre.name === userFavoriteGenres[1].name)?.icon}
                                            />
                                            <GenreCard
                                                genreName={userFavoriteGenres[2].name}
                                                iconName={genreStylesForConsult.find(genre => genre.name === userFavoriteGenres[2].name)?.icon}
                                            />
                                            <GenreCard
                                                genreName={userFavoriteGenres[3].name}
                                                iconName={genreStylesForConsult.find(genre => genre.name === userFavoriteGenres[3].name)?.icon}
                                            />
                                        </GridContent>
                                    </GridContainer>
                                </View>
                            )}
                        </>
                    )}
                    {findedActors.length > 0 && searchText !== '' && !isSearching && (
                        <>
                            <ActorsList actors={findedActors}/>
                        </>
                    )}
                    {!isSearching && !movieIsFinded && !actorIsFinded && searchText !== '' && (
                        <View style={{alignItems: 'flex-start', justifyContent: 'flex-start', marginTop: 10}}>
                            <MovieNotFound>Nothing found</MovieNotFound>
                        </View>
                    )}
                    {!isSearching && !movieIsFinded && searchText !== '' && actorIsFinded && (
                        <View style={{alignItems: 'flex-start', justifyContent: 'flex-start', marginTop: 10}}>
                            <MovieNotFound>No movies found</MovieNotFound>
                        </View>
                    )}
                    {findedMovies.length > 0 && searchText !== '' && !isSearching && (
                        <MoviesContainer>
                            {findedMovies.map((movie, index) => (
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
                    )}
                </SearchScroll>
            </Content>
        </Container>
    );
}

const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: flex-end;
    background-color: white;
`

const Content = styled.View`
    flex: ${Platform.OS === 'ios' ? 0.93 : 0.99};
    align-items: flex-start;
    justify-content: flex-start;
    width: 95%;
`

const Header = styled.View`
    gap: 10px;
    padding-bottom: 10px;
`

const GridContainer = styled.View`
    display: flex;
    flex-direction: column;
    height: 45%;
`

const GridContent = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    height: 70%;
    gap: 10px;
`
const SubTitle = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: black;
    padding-left: 4px;
    margin-bottom: 10px;
`

const Title = styled.Text`
    font-size: 30px;
    font-weight: bold;
    color: black;
    padding-bottom: 10px;
`

const SearchScroll = styled.ScrollView.attrs({
    showsVerticalScrollIndicator: false,
    contentContainerStyle: {
        paddingBottom: 100,
    },
})`
    width: 100%;
    height: 100%;
`

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
    width: 46%;
`;

const MovieNotFound = styled.Text`
    font-size: 20px;
    color: black;
`