import {FlatList, RefreshControl, ScrollView,} from "react-native";
import {MovieCard} from "../../components/movie_card/MovieCard";
import {ContainerHome, ContentHome, TitleContainer, TitleHome} from "../home/styles";
import React, {useEffect, useState} from "react";
import {useAuthContext} from "../../contexts/AuthContext";
import {getMovieByIdService} from "../../service/service";
import {Movie} from "../../interfaces/interfaces";
import {AntDesign, FontAwesome6} from "@expo/vector-icons";
import {BackButton} from "../movie_details/styles";
import {RefreshButton} from "./styles";

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
                        numColumns={2} // Adiciona duas colunas
                        columnWrapperStyle={{justifyContent: 'space-between'}}
                    />
                </ScrollView>
                <RefreshButton onPress={loadFavorites}>
                    <FontAwesome6 name="arrows-rotate" size={40} color="black" style={{padding: 10}}/>
                </RefreshButton>
            </ContentHome>
        </ContainerHome>
    );
}