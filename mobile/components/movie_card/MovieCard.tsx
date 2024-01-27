import {View, Text, Image, TouchableOpacity} from 'react-native';
import {CardContainer} from './styles'
import {Movie} from "../../interfaces/interfaces";
import {StyleSheet} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import * as Animatable from 'react-native-animatable';

export function MovieCard({movie}: { movie: Movie }) {
    const navigation = useNavigation()

    function goToMovieDetails() {
        // @ts-ignore
        navigation.navigate('MovieDetails', {movie})
    }

    return (
        <CardContainer>
            <Animatable.View animation="fadeInUp" delay={200} style={{flex: 1}}>
            <TouchableOpacity onPress={goToMovieDetails}>
                <View style={styles.photoShadow}>
                    <Image
                        source={{uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`}}
                        style={{width: '100%', height: 250, borderRadius: 12}}
                    />
                </View>
                <View style={styles.movieTitle}>
                    <Text style={{fontSize: 18}}>{movie.title}</Text>
                </View>
            </TouchableOpacity>
            </Animatable.View>
        </CardContainer>
    );

}

const styles = StyleSheet.create({
    photoShadow: {
        flex: 1,
        backgroundColor: '#fafafa',
        borderRadius: 12,
        margin: 10,
        elevation: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },

    movieTitle: {
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
    }
})
