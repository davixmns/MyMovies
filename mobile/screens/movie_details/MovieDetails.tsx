import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Alert, ScrollView} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import {
    FavoriteButton,
    MovieDetailsContainer,
    BackButton, MovieDetailsContent, MoviePosterContainer, MoviePoster, HeaderContainer, HeaderTitle, LoadingContainer
} from "./styles";
import {useNavigation} from "@react-navigation/native";
import {useAuthContext} from "../../contexts/AuthContext";
import {useUserContext} from "../../contexts/UserContext";

//@ts-ignore
export function MovieDetails({route}) {
    const {user, setUser} = useAuthContext()
    const {updateUserInCache} = useUserContext()
    const navigation = useNavigation();
    const {movie} = route.params;
    const [isFavorited, setIsFavorited] = useState<boolean>(false);
    const [posterIsLoading, setPosterIsLoading] = useState<boolean>(true);
    const [canClick, setCanClick] = useState<boolean>(true);

    useEffect(() => {
        if (user?.favorite_movies?.includes(movie.id)) {
            setIsFavorited(true)
        }
    }, [])

    const toggleFavorite = () => {
        try {
            if (!canClick) return
            setCanClick(false)
            setIsFavorited(!isFavorited);
            if (isFavorited && !(user?.favorite_movies?.includes(movie.id))) {
                user?.favorite_movies?.push(movie.id)
            } else (!isFavorited && user?.favorite_movies?.includes(movie.id))
            {
                // @ts-ignore
                user.favorite_movies.splice(user.favorite_movies.indexOf(movie.id), 1)
            }
            // @ts-ignore
            updateUserInCache(user)
        } catch (e) {
            console.log(e)
            Alert.alert('Error', 'An error occurred while trying to update your favorites')
        } finally {
            setCanClick(true)
        }
    };

    const goBack = async () => {
        navigation.goBack();
    }


    return (
        <MovieDetailsContainer>
            <MovieDetailsContent>
                <HeaderContainer>
                    <BackButton onPress={goBack}>
                        <AntDesign name="arrowleft" size={35} color="black" style={{padding: 5}}/>
                    </BackButton>
                    <HeaderTitle>Movie Detail</HeaderTitle>
                    <FavoriteButton onPress={toggleFavorite}>
                        <AntDesign name={isFavorited ? 'heart' : 'hearto'} size={30} color="red"/>
                    </FavoriteButton>
                </HeaderContainer>
                {posterIsLoading && (
                    <LoadingContainer>
                        <ActivityIndicator size="large" color='black'/>
                    </LoadingContainer>
                )}
                <MoviePosterContainer>
                    <MoviePoster
                        source={{uri: `https://image.tmdb.org/t/p/w1280${movie.poster_path}`}}
                        onLoad={() => setPosterIsLoading(false)}
                    />
                </MoviePosterContainer>
            </MovieDetailsContent>
        </MovieDetailsContainer>
    );
}
