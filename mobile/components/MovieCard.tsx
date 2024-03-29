import {Image, TouchableOpacity, View} from 'react-native';
import {Movie} from "../interfaces/interfaces";
import {useNavigation} from "@react-navigation/native";
import * as Animatable from 'react-native-animatable';
import styled from "styled-components/native";
import {useEffect, useState} from "react";
import {StackNavigationProp} from "@react-navigation/stack";

// @ts-ignore
export function MovieCard({movie, size, tmdbMovieId}: { movie: Movie, size: string, tmdbMovieId: string }) {
    const navigation = useNavigation<StackNavigationProp<any>>();
    const [movieTitle, setMovieTitle] = useState(movie.title)
    const [imgWidth, setImgWidth] = useState(0)
    const [imgHeight, setImgHeight] = useState(0)
    const [imgResolution, setImgResolution] = useState('500')
    const [cardAnimation, setCardAnimation] = useState('fadeIn')
    const [posterIsLoading, setPosterIsLoading] = useState(true)
    const bgColor = posterIsLoading ? 'lightgray' : 'transparent'

    function goToMovieDetails() {
        // @ts-ignore
        navigation.push('MovieDetails', {tmdbMovieId: tmdbMovieId})
    }

    useEffect(() => {
        if (size === 'big') {
            setImgWidth(230)
            setImgHeight(345)
            setImgResolution('500')
            setCardAnimation('fadeInLeft')

        } else if (size === 'medium') {
            setImgWidth(170)
            setImgHeight(260)
            setImgResolution('342')
            setCardAnimation('fadeIn')

        } else if (size === 'small') {
            setImgWidth(150)
            setImgHeight(220)
            setImgResolution('185')
            setCardAnimation('fadeInRight')
        }
    }, [])

    return (
        <CardContainer>
            <Animatable.View animation={cardAnimation} delay={100}>
                <TouchableOpacity onPress={goToMovieDetails}>
                    <View style={{width: imgWidth}}>
                        <LoadingBackground bgColor={bgColor} height={imgHeight}/>
                        <Image
                            source={{uri: `https://image.tmdb.org/t/p/w${imgResolution}${movie.poster_path}`}}
                            style={{width: imgWidth, minWidth: imgWidth, height: imgHeight, minHeight: imgHeight, borderRadius: 10}}
                            onLoad={() => setPosterIsLoading(false)}
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
    color: black;
`

const MovieTitleContainer = styled.View`
    max-width: 100%;
    width: 100%;
    padding-left: 5px;
    padding-right: 10px;
    padding-top: 8px;
`
const LoadingBackground = styled.View<{bgColor: string, height: number}>`
    position: absolute;
    width: 100%;
    height: ${props => props.height}px;
    background-color: ${props => props.bgColor};
    border-radius: 10px;
`
