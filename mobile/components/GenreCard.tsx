import {FontAwesome6} from "@expo/vector-icons";
import {LinearGradient} from "expo-linear-gradient";
import {StyleSheet} from "react-native";
import styled from "styled-components/native";
import {useNavigation} from "@react-navigation/native";
import {useMovieContext} from "../contexts/MovieContext";

export function GenreCard({genreName, colors, iconName}: {
    genreName: string,
    colors: string[],
    iconName: string,
}) {
    const navigation = useNavigation();
    const {allGenres} = useMovieContext()

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
        <LinearGradient colors={[colors[0], colors[1]]} style={styles.boxLinearGradient}>
            <ColorBoxContent onPress={goToGenreMovies}>
                <FontAwesome6 name={iconName} size={30} color="white"/>
                <BoxTitle>{genreName}</BoxTitle>
            </ColorBoxContent>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    boxLinearGradient: {
        width: '48%',
        height: '55%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

const BoxTitle = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: white;
`

const ColorBoxContent = styled.TouchableOpacity`
    width: 80%;
    height: 80%;
    gap: 5px
`
