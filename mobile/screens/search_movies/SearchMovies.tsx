import styled from "styled-components/native";
import {MyTextInput} from "../../components/MyTextInput";
import {useState} from "react";
import {GenreCard} from "../../components/GenreCard";
import {Platform} from "react-native";
import {useMovieContext} from "../../contexts/MovieContext";


export function SearchMovies() {
    const [searchText, setSearchText] = useState('')
    const {userFavoriteGenres, genreStylesForConsult} = useMovieContext()

    return (
        <Container>
            <Content>
                <Header>
                    <Title>Search</Title>
                    <MyTextInput
                        text={searchText}
                        setText={setSearchText}
                        placeholder={'Search Here'}
                        iconName={'magnifying-glass'}
                    />
                </Header>

                <GridContainer>
                    <SubTitle>Maybe Interesting</SubTitle>
                    <GridContent>
                        <GenreCard genreName={'Top Rated'} iconName={'star'}/>
                        <GenreCard genreName={'TV Movie'} iconName={'tv'}/>
                        <GenreCard genreName={'Music'} iconName={'music'}/>
                        <GenreCard genreName={'Documentary'} iconName={'file'}/>
                    </GridContent>
                </GridContainer>

                <GridContent>
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
                </GridContent>

            </Content>
        </Container>
    );
}

const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: white;
`

const Content = styled.View`
    flex: ${Platform.OS === 'ios' ? 0.93 : 0.95};
    align-items: flex-start;
    justify-content: flex-start;
    width: 95%;
`

const Header = styled.View`
`

const GridContainer = styled.View`
    display: flex;
    flex-direction: column;
    height: 45%;
    margin-top: 40px;
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
    padding-bottom: 10px;
`

const Title = styled.Text`
    font-size: 30px;
    font-weight: bold;
    color: black;
`