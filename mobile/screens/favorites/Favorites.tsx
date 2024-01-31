import {FlatList, ScrollView} from "react-native";
import {CardPadding, ContainerHome, ContentHome, TitleContainer, TitleHome} from "../home/styles";
import {useMovieContext} from "../../contexts/MovieContext";
import BigMovieCard from "../../components/BigMovieCard";
import {MovieCard} from "../../components/MovieCard";
import styled from "styled-components/native";
import {useState} from "react";


export function Favorites() {
    const {myFavoriteMovies, loadAllMyFavoriteMovies} = useMovieContext()
    const [refreshing, setRefreshing] = useState(false)
    // @ts-ignore
    function renderFavoritedMovie({item: movie}) {
        return (
            <CardPadding>
                {/*@ts-ignore*/}
                <MovieCard
                    movie={movie}
                    size={'medium'}
                />
            </CardPadding>
        )
    }

    async function handleRefresh() {
        await loadAllMyFavoriteMovies()
        console.log(myFavoriteMovies)
    }


    return (
        <ContainerFavorites>
            <ContentFavorites>
                {/*<ScrollView>*/}
                    <TitleContainer>
                        <TitleHome>Your Favorites Movies ❤️</TitleHome>
                    </TitleContainer>
                    <FlatList
                        data={myFavoriteMovies}
                        renderItem={renderFavoritedMovie}
                        // @ts-ignore
                        keyExtractor={item => item.tmdb_movie_id.toString()}
                        numColumns={2}
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                    />
                {/*</ScrollView>*/}
            </ContentFavorites>
        </ContainerFavorites>
    );
}

const ContainerFavorites = styled.View`
    flex: 1;
    align-items: center;
    justify-content: flex-end;
`

const ContentFavorites = styled.View`
    flex: 0.93;
    width: 100%;
    justify-content: center;
    align-items: center;
`