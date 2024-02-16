import styled from "styled-components/native";
import {MyTextInput} from "../components/MyTextInput";
import {useEffect, useState} from "react";
import {GenreCard} from "../components/GenreCard";
import {ActivityIndicator, Platform, View} from "react-native";
import {useMovieContext} from "../contexts/MovieContext";
import {searchMovieService} from "../service/service";
import {Movie} from "../interfaces/interfaces";
import {MovieCard} from "../components/MovieCard";


export function SearchMovies() {
    const [prevSearchText, setPrevSearchText] = useState('');
    const [searchText, setSearchText] = useState('')
    const [findedMovies, setFindedMovies] = useState<Movie[]>([])
    const {userFavoriteGenres, genreStylesForConsult} = useMovieContext()
    const [searchTimer, setSearchTimer] = useState<NodeJS.Timeout | null>(null);
    const [movieIsFinded, setMovieIsFinded] = useState<boolean>(false);
    const [isSearching, setIsSearching] = useState<boolean>(false);

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
            const results = await searchMovieService(text);
            setFindedMovies([])
            setFindedMovies(results.data.results);
            setIsSearching(false)
            if (results.data.results.length === 0) {
                setMovieIsFinded(false)
            } else {
                setMovieIsFinded(true)
            }
        } else {
            setFindedMovies([]);
        }
    }

    // Efeito que é acionado quando o texto de pesquisa é alterado
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

    return (
        <Container>
            <Content>
                <Title>Search</Title>
                <Header>
                    <MyTextInput
                        text={searchText}
                        setText={setSearchText}
                        placeholder={'Search Movies'}
                        iconName={'magnifying-glass'}
                    />
                </Header>
                <SearchScroll>
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
                        </>
                    )}
                    {findedMovies.length > 0 && searchText !== '' && (
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
                    {!isSearching && !movieIsFinded && searchText !== '' && (
                        <View style={{alignItems: 'flex-start', justifyContent: 'flex-start', marginTop: 10}}>
                            <MovieNotFound>No movies found</MovieNotFound>
                        </View>
                    )}

                    {isSearching && searchText !== '' && (
                        <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
                            <ActivityIndicator size="large" color="black"/>
                        </View>
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
    flex: ${Platform.OS === 'ios' ? 0.93 : 0.95};
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