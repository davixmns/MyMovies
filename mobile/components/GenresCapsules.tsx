import {Genre} from "../interfaces/interfaces";
import styled from "styled-components/native";
import {useNavigation} from "@react-navigation/native";

export default function GenresCapsules({genres}: { genres: Genre[] }) {
    const navigation = useNavigation();

    const genderColors = {
        'Science Fiction': '#7f8c8d',
        'Action': '#e74c3c',
        'Animation': '#2ecc71',
        'Adventure': '#f39c12',
        'Comedy': '#f1c40f',
        'Fantasy': '#9b59b6',
        'Romance': '#e08283',
        'Drama': '#8d6e63',
        'Documentary': '#27ae60',
        'Family': '#3498db',
        'War': '#34495e',
        'History': '#e67e22',
        'Music': '#8e44ad',
        'Mystery': '#8e44ad',
        'Crime': 'gray',
        'Thriller': 'black',
        'Horror': '#95a5a6',
        'TV Movie': '#d35400',
        'Western': '#c0392b',
    }

    function goToMoviesByGenre(genre: Genre) {
        // @ts-ignore
        navigation.navigate('MoviesByGenre',
            {movieGenreId: genre.id, movieGenreName: genre.name}
        )
    }

    return (
        <CapsuleContainer>
            {genres.map((genre) => (
                <CapsuleContent
                    key={genre.id}
                    // @ts-ignore
                    style={{backgroundColor: genderColors[genre.name]}}
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