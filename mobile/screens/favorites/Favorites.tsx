import {FlatList, ScrollView, StyleSheet, View} from "react-native";
import {MovieCard} from "../../components/MovieCard";
import {ContainerHome, ContentHome, TitleContainer, TitleHome} from "../home/styles";
import {useEffect, useState} from "react";
import {useAuthContext} from "../../contexts/AuthContext";
import {FavoritedMovie} from "../../interfaces/interfaces";
import CircleButton from "../../components/CircleButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useUserContext} from "../../contexts/UserContext";

export function Favorites() {
    const {user} = useAuthContext()
    const [favorites, setFavorites] = useState<FavoritedMovie[]>([])

    useEffect(() => {
        loadFavorites()
    }, [])

    function loadFavorites() {
        setFavorites([])
        if (user?.favorite_movies) {
            setFavorites(user.favorite_movies)
        }
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
                    {/*<FlatList*/}
                    {/*    data={favorites}*/}
                    {/*    renderItem={renderMovies}*/}
                    {/*    keyExtractor={item => item.id.toString()}*/}
                    {/*    numColumns={2}*/}
                    {/*    columnWrapperStyle={{justifyContent: 'space-between'}}*/}
                    {/*/>*/}
                    <View style={styles.blurView}>
                        <CircleButton
                            iconName="rotate-right"
                            color="#fafafa"
                            onPress={loadFavorites}
                        />
                    </View>
                </ScrollView>
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