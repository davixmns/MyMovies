import {FlatList, ScrollView, StyleSheet, View} from "react-native";
import {MovieCard} from "../../components/movie_card/MovieCard";
import {ContainerHome, ContentHome, TitleContainer, TitleHome} from "../home/styles";
import {useEffect, useState} from "react";
import {useAuthContext} from "../../contexts/AuthContext";
import {getMovieByIdService} from "../../service/service";
import {Movie} from "../../interfaces/interfaces";
import CircleButton from "../../components/circle_button/CircleButton";
import {BlurView} from "expo-blur";

export function Favorites() {
    const {user} = useAuthContext()
    const [favorites, setFavorites] = useState<Movie[]>([])

    useEffect(() => {
        loadFavorites()
    }, [])

    function loadFavorites() {
        setFavorites([])
        const userFavorites = user?.favorite_movies
        userFavorites?.forEach(async (favorite) => {
            const movie = await getMovieByIdService(favorite)
            setFavorites(favorites => [...favorites, movie])
        })
    }

    // @ts-ignore
    function renderMovies({item: movie}) {
        return <MovieCard movie={movie}/>;
    }

    return (
        <ContainerHome>
            <ContentHome>
                <ScrollView>
                    <TitleContainer>
                        <TitleHome>Your Favorites</TitleHome>
                    </TitleContainer>
                    <FlatList
                        data={favorites}
                        renderItem={renderMovies}
                        keyExtractor={item => item.id.toString()}
                        numColumns={2}
                        columnWrapperStyle={{justifyContent: 'space-between'}}
                    />
                </ScrollView>
                <View style={styles.blurView}>
                    <CircleButton
                        iconName="rotate-right"
                        color="#fafafa"
                        onPress={loadFavorites}
                    />
                </View>
            </ContentHome>
        </ContainerHome>
    );
}

const styles = StyleSheet.create({
    blurView: {
        position: 'absolute',
        bottom: 65,
        right: 20,
        borderRadius: 30,
        backgroundColor: 'rgba(10, 10, 10, 0.2)',
    },
})