import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import {
    FavoriteButton,
    MovieDescription,
    MovieDetailsContainer,
    MovieImage,
    MovieTitle,
    RatingContainer,
    RatingText,
    BackButton, MovieDetailsContent
} from "./styles";
import {useNavigation} from "@react-navigation/native";
import {useAuthContext} from "../../contexts/AuthContext";
import {useUserContext} from "../../contexts/UserContext";

//@ts-ignore
export function MovieDetails({route}) {
    const {user} = useAuthContext()
    const {updateUserInCache} = useUserContext()
    const navigation = useNavigation();
    const {movie} = route.params;
    const [isFavorited, setIsFavorited] = useState(false);

    useEffect(() => {
        if (user?.favorite_movies?.includes(movie.id)) {
            setIsFavorited(true)
        }
    }, [])

    const toggleFavorite = () => {
        setIsFavorited(!isFavorited);
    };

    const goBack = async () => {
        if (user?.favorite_movies?.includes(movie.id) && !isFavorited) {
            user.favorite_movies.splice(user.favorite_movies.indexOf(movie.id), 1)
            updateUserInCache(user)
        } else if (!user?.favorite_movies?.includes(movie.id) && isFavorited) {
            user?.favorite_movies.push(movie.id)
            updateUserInCache(user)
        }
        navigation.goBack();
    }


    return (
        <ScrollView>
            <MovieDetailsContainer>
                <MovieDetailsContent>
                    <MovieImage source={{uri: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}}/>
                    <BackButton onPress={goBack}>
                        <AntDesign name="arrowleft" size={40} color="black" style={{padding: 10}}/>
                    </BackButton>
                    <MovieTitle>{movie.title}</MovieTitle>
                    <RatingContainer>
                        <AntDesign name="star" size={30} color="#FFD700"/>
                        <RatingText>{movie.vote_average}</RatingText>
                    </RatingContainer>
                    <FavoriteButton onPress={toggleFavorite}>
                        <AntDesign name={isFavorited ? 'heart' : 'hearto'} size={40} color="red"/>
                    </FavoriteButton>
                    <MovieDescription>{movie.overview}</MovieDescription>
                </MovieDetailsContent>
            </MovieDetailsContainer>
        </ScrollView>
    );
}
