import {View} from "react-native";
import {MovieGenre} from "../screens/movie_details/styles";
import {Genre} from "../interfaces/interfaces";

export default function GenresCapsules({genres}: { genres: Genre[] }) {
    function getGenreColor(genre: string) {
        let genderColor;
        switch (genre) {
            case 'Ficção científica':
                genderColor = '#7f8c8d';
                break;
            case 'Ação':
                genderColor = '#e74c3c';
                break;
            case 'Animação':
                genderColor = '#2ecc71';
                break;
            case 'Aventura':
                genderColor = '#f39c12';
                break;
            case 'Comédia':
                genderColor = '#f1c40f';
                break;
            case 'Terror':
                genderColor = '#95a5a6';
                break;
            case 'Fantasia':
                genderColor = '#9b59b6';
                break;
            case 'Romance':
                genderColor = '#e08283';
                break;
            case 'Suspense':
                genderColor = '#bdc3c7';
                break;
            case 'Drama':
                genderColor = '#8d6e63';
                break;
            case 'Documentário':
                genderColor = '#27ae60';
                break;
            case 'Família':
                genderColor = '#3498db';
                break;
            case 'Guerra':
                genderColor = '#34495e';
                break;
            case 'História':
                genderColor = '#e67e22';
                break;
            case 'Música':
                genderColor = '#8e44ad';
                break;
            case 'Mistério':
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
            default:
                genderColor = 'white'; // default color
        }
        return genderColor;
    }


    return (
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {genres.map((genre) => (
                <View key={genre.id.toString()}
                      style={{backgroundColor: getGenreColor(genre.name), borderRadius: 10, padding: 5, margin: 2}}>
                    <MovieGenre>
                        {genre.name}
                    </MovieGenre>
                </View>
            ))}
        </View>
    );
}