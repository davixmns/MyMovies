import {Image, TouchableOpacity, View} from 'react-native';
import {Movie} from "../interfaces/interfaces";
import {useNavigation} from "@react-navigation/native";
import * as Animatable from 'react-native-animatable';
import styled from "styled-components/native";
import {useEffect, useState} from "react";

// @ts-ignore
export function MovieCard({movie, size}: { movie: Movie, size: string }) {
    const navigation = useNavigation()
    const [movieTitle, setMovieTitle] = useState(movie.title)
    const [imgWidth, setImgWidth] = useState(0)
    const [imgHeight, setImgHeight] = useState(0)

    function goToMovieDetails() {
        const movieId = movie.id
        // @ts-ignore
        navigation.navigate('MovieDetails', {movieId: movieId})
    }

    useEffect(() => {
        if (size === 'big') {
            setImgWidth(230)
            setImgHeight(345)

        } else if (size === 'medium') {
            setImgWidth(170)
            setImgHeight(260)

        } else if (size === 'small') {
            setImgWidth(150)
            setImgHeight(220)

        }

    }, [])

    return (
        <CardContainer>
            <Animatable.View animation="fadeInLeft" delay={100}>
                <TouchableOpacity onPress={goToMovieDetails}>
                    <View style={{width: imgWidth}}>
                        <Image
                            source={{uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`}}
                            style={{width: imgWidth, height: imgHeight, borderRadius: 10}}
                        />
                        <MovieTitleContainer>
                            <MovieTitle numberOfLines={2}>{movieTitle}</MovieTitle>
                        </MovieTitleContainer>
                    </View>
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
    max-width: 100%;
    width: 100%;
    padding-left: 5px;
    padding-right: 10px;
    padding-top: 8px;
`

const CardContent = styled.View`
;
`
