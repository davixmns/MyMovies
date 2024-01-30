import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Alert, ScrollView} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import {
    FavoriteButton,
    MovieDetailsContainer,
    BackButton,
    MovieDetailsContent,
    MoviePosterContainer,
    MoviePoster,
    HeaderContainer,
    HeaderTitle,
    LoadingContainer, DescriptionContainer, MovieTitle, MovieGenres,
} from "./styles";
import {useNavigation} from "@react-navigation/native";
import {useAuthContext} from "../../contexts/AuthContext";
import {useUserContext} from "../../contexts/UserContext";
import {FavoritedMovie, Movie} from "../../interfaces/interfaces";
import {getMovieByIdService} from "../../service/service";

//@ts-ignore
export function MovieDetails({route}) {
    const navigation = useNavigation();
    const {user, setUser} = useAuthContext()
    const {updateUserInCache} = useUserContext()
    const {movieId} = route.params
    const [isFavorited, setIsFavorited] = useState<boolean>(false);
    const [posterIsLoading, setPosterIsLoading] = useState<boolean>(true);
    const [canClick, setCanClick] = useState<boolean>(true);
    const [movie, setMovie] = useState<Movie>({} as Movie);
    const movieIsAlreadyFavorited = user?.favorite_movies.some(favorite => favorite.id === movieId)

    useEffect(() => {
        loadMovie()
    }, []);

    const loadMovie = async () => {
        const movie = await getMovieByIdService(movieId)
        setMovie(movie)
    }

    useEffect(() => {
        if(movieIsAlreadyFavorited) {
            setIsFavorited(true)
        }
    }, []);

    useEffect(() => {
        handleSaveFavorite()
    }, [isFavorited])

    function handleSaveFavorite() {
        try {
            // @ts-ignore
            // const newUser = {name: 'Davi Ximenes', email: 'daviximenes@unifor.br', password: 'asdasdasd', favorite_movies: []}
            // setUser(newUser)
            // updateUserInCache(newUser)

            setCanClick(false)
            if (isFavorited && !movieIsAlreadyFavorited) {
                const favoritedMovie: FavoritedMovie = {
                    id: movieId,
                    title: movie.title,
                    poster_path: movie.poster_path
                }
                user?.favorite_movies?.push(favoritedMovie)
                console.log('filme favoritado')
            } else if (!isFavorited && movieIsAlreadyFavorited) {
                // @ts-ignore
                user!.favorite_movies = user?.favorite_movies.filter(favorite => favorite.id !== movieId)
                console.log('filme desfavoritado')
            }
            updateUserInCache(user)
            console.log('seus favoritos -> ', user?.favorite_movies)
        } catch (e) {
            console.log(e)
            Alert.alert('Error', 'An error occurred while trying to save the favorite movie')
        } finally {
            setCanClick(true)
        }
    }

    const toggleFavorite = () => {
        if (!canClick) return;
        setIsFavorited(!isFavorited);
    };

    return (
        <MovieDetailsContainer>
            <MovieDetailsContent>
                <ScrollView contentContainerStyle={{alignItems: 'center'}}>
                    <HeaderContainer>
                        <BackButton onPress={() => navigation.goBack()}>
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
                    <DescriptionContainer>
                        <MovieTitle>{movie.title}</MovieTitle>
                        <MovieGenres>{movie.genres?.map(genre => genre.name).join(' • ')}</MovieGenres>
                    </DescriptionContainer>
                </ScrollView>
            </MovieDetailsContent>
        </MovieDetailsContainer>
    );
}
