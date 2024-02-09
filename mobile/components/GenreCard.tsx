import {FontAwesome6} from "@expo/vector-icons";
import {LinearGradient} from "expo-linear-gradient";
import {StyleSheet} from "react-native";
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
        // @ts-ignore
        <LinearGradient colors={genreStylesForConsult.find(genre => genre.name === genreName)?.colors}
                        style={styles.boxLinearGradient}>
            <IconContainer>

                <FontAwesome6 name={iconName} size={80} color="white"/>
            </IconContainer>
            <ColorBoxContent onPress={goToGenreMovies}>
                <BoxTitle>{genreName}</BoxTitle>
            </ColorBoxContent>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    boxLinearGradient: {
        width: '48%',
        height: '55%',
        maxHeight: 130,
        minHeight: 120,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

const BoxTitle = styled.Text`
    font-size: 22px;
    font-weight: bold;
    color: white;
`

const ColorBoxContent = styled.TouchableOpacity`
    width: 80%;
    height: 80%;
    gap: 5px
`

const IconContainer = styled.View`
    position: absolute;
    bottom: -5px;
    right: 12px;
`
