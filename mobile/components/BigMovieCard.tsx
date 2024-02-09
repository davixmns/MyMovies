import {Movie} from "../interfaces/interfaces";
import * as Animatable from "react-native-animatable";
import {Image, TouchableOpacity, View} from "react-native";
import styled from "styled-components/native";
import {useNavigation} from "@react-navigation/native";
import {useState} from "react";

export default function BigMovieCard({movie}: { movie: Movie }) {
    const navigation = useNavigation()
    const [posterIsLoading, setPosterIsLoading] = useState(true)
    const bgColor = posterIsLoading ? 'lightgray' : 'transparent'

    function goToMovieDetails() {
        // @ts-ignore
        navigation.navigate('MovieDetails', {tmdbMovieId: movie.id})
    }

    return (
        <CardContainer>
            <Animatable.View animation="fadeInLeft" delay={100} style={{display: 'flex', flexDirection: 'row'}}>
                <View style={{backgroundColor: bgColor}}>
                    <TouchableOpacity onPress={goToMovieDetails}>
                        <Image
                            source={{uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`}}
                            style={{width: 170, height: 250, borderRadius: 10}}
                            onLoad={() => setPosterIsLoading(false)}
                        />
                    </TouchableOpacity>
                </View>
                <Description>
                    <MovieTitle numberOfLines={2}>{movie.title}</MovieTitle>
                    <MovieTitle numberOfLines={2}>{movie.release_date}</MovieTitle>
                </Description>

            </Animatable.View>
        </CardContainer>
    );

}


const CardContainer = styled.View`
    flex: 1;
    overflow: hidden;
    margin-bottom: 10px;
    margin-top: 10px;
`

const MovieTitle = styled.Text`
    font-size: 15px;
`

const Description = styled.View`
    flex: 1;
    padding: 10px;
    justify-content: space-between;
`
