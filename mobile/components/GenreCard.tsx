import {FontAwesome6} from "@expo/vector-icons";
import {LinearGradient} from "expo-linear-gradient";
import {StyleSheet, TouchableOpacity} from "react-native";
import styled from "styled-components/native";
import {useNavigation} from "@react-navigation/native";
import {useMovieContext} from "../contexts/MovieContext";

export function GenreCard({genreName, iconName}: {
    genreName: string,
    iconName: string,
}) {
    const navigation = useNavigation();
    const {allGenres} = useMovieContext()
    const {genreStylesForConsult} = useMovieContext()

    function goToGenreMovies() {
        if (genreName === 'Top Rated') {
            // @ts-ignore
            navigation.navigate('TopRatedMovies')
        } else {
            const genreId = allGenres.find(genre => genre.name === genreName)?.id
            // @ts-ignore
            navigation.navigate('MoviesByGenre', {movieGenreId: genreId, movieGenreName: genreName})
        }
    }

    return (
        <Container onPress={goToGenreMovies}>
            <LinearGradient colors={genreStylesForConsult.find(genre => genre.name === genreName)?.colors}
                            style={styles.boxLinearGradient}>
                <IconContainer>
                    <FontAwesome6 name={iconName} size={80} color="white"/>
                </IconContainer>
                {/*@ts-ignore*/}
                <ColorBoxContent onPress={goToGenreMovies}>
                    <BoxTitle>{genreName}</BoxTitle>
                </ColorBoxContent>
            </LinearGradient>
        </Container>
    );
}

const styles = StyleSheet.create({
    boxLinearGradient: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

const Container = styled.TouchableOpacity`
  width: 48%;
  height: 55%;
  max-height: 130px;
  min-height: 130px;
  justify-content: center;
  align-items: center;
`

const BoxTitle = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: white;
`

const ColorBoxContent = styled.View`
  width: 80%;
  height: 80%;
  gap: 5px
`

const IconContainer = styled.View`
  position: absolute;
  bottom: -5px;
  right: 12px;
`
