import {Movie} from "../interfaces/interfaces";
import * as Animatable from "react-native-animatable";
import {Image, TouchableOpacity} from "react-native";
import styled from "styled-components/native";

export default function BigMovieCard({movie}: { movie: Movie }) {

    function goToMovieDetails() {
        // @ts-ignore
        navigation.navigate('MovieDetails', {movie})
    }

    return (
        <CardContainer>
            <Animatable.View animation="fadeInLeft" delay={100}>
                <TouchableOpacity onPress={goToMovieDetails}>
                    <Image
                        source={{uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`}}
                        style={{width: 170, height: 250, borderRadius: 10}}
                    />
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
  max-width: 146px;
  padding-left: 5px;
  padding-right: 10px;
  padding-top: 8px;
`
;