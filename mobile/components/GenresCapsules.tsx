import {Genre} from "../interfaces/interfaces";
import styled from "styled-components/native";
import {useNavigation} from "@react-navigation/native";
import {useMovieContext} from "../contexts/MovieContext";

export default function GenresCapsules({genres}: { genres: Genre[] }) {
    const navigation = useNavigation();
    const {genreStylesForConsult} = useMovieContext()


    function goToMoviesByGenre(genre: Genre) {
        // @ts-ignore
        navigation.navigate('MoviesByGenre',
            {movieGenreId: genre.id, movieGenreName: genre.name}
        )
    }

    function getGenreCardColor(genreName: string) {
        return genreStylesForConsult.find(genre => genre.name === genreName)?.colors[0]
    }

    return (
        <CapsuleContainer>
            {genres.map((genre) => (
                <CapsuleContent
                    key={genre.id}
                    // @ts-ignore
                    style={{backgroundColor: getGenreCardColor(genre.name)}}
                    onPress={() => goToMoviesByGenre(genre)}
                >
                    <MovieGenre>
                        {genre.name}
                    </MovieGenre>
                </CapsuleContent>
            ))}
        </CapsuleContainer>
    );
}

const CapsuleContent = styled.TouchableOpacity`
    margin-right: 10px;
    margin-top: 5px;
    margin-bottom: 5px;
    border-radius: 10px;
    padding: 5px;
    box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.20);
`

const CapsuleContainer = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
`;

export const MovieGenre = styled.Text`
    font-size: 13px;
    font-weight: bold;
    color: white;
    padding: 2px 8px 2px 8px;
`