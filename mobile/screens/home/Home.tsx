import React from 'react';
import {FlatList, ScrollView} from 'react-native';
import {useMovieContext} from "../../contexts/MovieContext";
import {MovieCard} from "../../components/movie_card/MovieCard";
import {ContainerHome, ContentHome, TitleContainer, TitleHome} from "./styles";
import * as Animatable from "react-native-animatable";

export function Home() {
    const {topRatedMovies} = useMovieContext();

    // @ts-ignore
    function renderMovies({item: movie}) {

        return (
            <MovieCard movie={movie}/>
        )
    }

    return (
        <ContainerHome>
            <ContentHome>
                <ScrollView>
                    <TitleContainer>
                        <TitleHome>Top Rated Movies</TitleHome>
                    </TitleContainer>
                    <FlatList
                        data={topRatedMovies}
                        renderItem={renderMovies}
                        keyExtractor={item => item.id.toString()}
                        numColumns={2} // Adiciona duas colunas
                        columnWrapperStyle={{justifyContent: 'space-between'}}
                    />
                </ScrollView>
            </ContentHome>
        </ContainerHome>
    );
}
