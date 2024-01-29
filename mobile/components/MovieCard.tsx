import {Image, TouchableOpacity} from 'react-native';
import {Movie} from "../interfaces/interfaces";
import {useNavigation} from "@react-navigation/native";
import * as Animatable from 'react-native-animatable';
import styled from "styled-components/native";
import {useEffect, useState} from "react";

export function MovieCard({movie}: { movie: Movie }) {
    const navigation = useNavigation()
    const [movieTitle, setMovieTitle] = useState(movie.title)
    const maxTitleLength = 30
    function goToMovieDetails() {
        // @ts-ignore
        navigation.navigate('MovieDetails', {movie})
    }

    useEffect(() => {
        if (movie.title.length > maxTitleLength) {
            setMovieTitle(movie.title.substring(0, maxTitleLength) + '...')
        }
    }, [])

    return (
        <CardContainer>
            <Animatable.View animation="fadeInLeft" delay={100}>
                <TouchableOpacity onPress={goToMovieDetails}>
                    <Image
                        source={{uri: `https://image.tmdb.org/t/p/w300${movie.poster_path}`}}
                        style={{width: 146, height: 220, borderRadius: 10}}
                    />
                    <MovieTitleContainer>
                        <MovieTitle>{movieTitle}</MovieTitle>
                    </MovieTitleContainer>
                </TouchableOpacity>
            </Animatable.View>
        </CardContainer>
    );

}

const CardContainer = styled.View`
  flex: 1;
  overflow: hidden;
`

const MovieTitle = styled.Text`
  font-size: 18px;
`

const MovieTitleContainer = styled.View`
  max-width: 170px;
  padding-left: 5px;
  padding-right: 10px;
  padding-top: 8px;
`
