import {View} from "react-native";
import {Genre} from "../interfaces/interfaces";
import styled from "styled-components/native";
import {useNavigation} from "@react-navigation/native";

export default function GenresCapsules({genres}: { genres: Genre[] }) {
    const navigation = useNavigation();

    function getGenreColor(genre: string) {
        let genderColor;
        switch (genre) {
            case 'Science Fiction':
                genderColor = '#7f8c8d';
                break;
            case 'Action':
                genderColor = '#e74c3c';
                break;
            case 'Animation':
                genderColor = '#2ecc71';
                break;
            case 'Adventure':
                genderColor = '#f39c12';
                break;
            case 'Comedy':
                genderColor = '#f1c40f';
                break;
            case 'Fantasy':
                genderColor = '#9b59b6';
                break;
            case 'Romance':
                genderColor = '#e08283';
                break;
            case 'Drama':
                genderColor = '#8d6e63';
                break;
            case 'Documentary':
                genderColor = '#27ae60';
                break;
            case 'Family':
                genderColor = '#3498db';
                break;
            case 'War':
                genderColor = '#34495e';
                break;
            case 'History':
                genderColor = '#e67e22';
                break;
            case 'Music':
                genderColor = '#8e44ad';
                break;
            case 'Mystery':
                genderColor = '#8e44ad';
                break;
            case 'Crime':
                genderColor = 'gray';
                break;
            case 'Thriller':
                genderColor = 'black';
                break;
            case 'Horror':
                genderColor = '#95a5a6';
                break;
            case 'TV Movie':
                genderColor = '#d35400';
                break;
            case 'Western':
                genderColor = '#c0392b';
                break;
            default:
                genderColor = 'gray'; // default color
        }
        return genderColor;
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
                    style={{backgroundColor: getGenreColor(genre.name)}}
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