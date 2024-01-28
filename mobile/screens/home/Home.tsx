import React from 'react';
import {FlatList} from 'react-native';
import {useMovieContext} from "../../contexts/MovieContext";
import {MovieCard} from "../../components/movie_card/MovieCard";
import {CardPadding, ContainerHome, ContentHome, MainScroll, TitleContainer, TitleHome} from "./styles";

export function Home() {
    const {nowPlayingMovies} = useMovieContext();

    // @ts-ignore
    function renderMovies({item: movie}) {
        return (
            <CardPadding>
                <MovieCard movie={movie}/>
            </CardPadding>
        )
    }

    return (
        <ContainerHome>
            <ContentHome>
                <MainScroll>
                    <TitleContainer>
                        <TitleHome>Now Playing</TitleHome>
                    </TitleContainer>
                    <FlatList
                        data={nowPlayingMovies}
                        renderItem={renderMovies}
                        keyExtractor={item => item.id.toString()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        numColumns={1}
                    />
                </MainScroll>
            </ContentHome>
        </ContainerHome>
    );
}
