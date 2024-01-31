import {useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import {useNavigation} from "@react-navigation/native";
import {FavoritedMovie, Movie} from "../../interfaces/interfaces";
import {getMovieByIdService} from "../../service/service";
import {useMovieContext} from "../../contexts/MovieContext";
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

//@ts-ignore
export function MovieDetails({route}) {
    const navigation = useNavigation();
    const {movieId} = route.params
    const [wasFavorited, setWasFavorited] = useState<boolean>(false);
    const [isFavorited, setIsFavorited] = useState<boolean>(false);
    const [posterIsLoading, setPosterIsLoading] = useState<boolean>(true);
    const [movie, setMovie] = useState<Movie>({} as Movie);
    const {saveFavoriteMovie, deleteFavoriteMovie, checkIfMovieIsFavorited} = useMovieContext()
    const favoritedMovie: FavoritedMovie = {
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
    }

    useEffect(() => {
        const loadMovie = async () => {
            const movie = await getMovieByIdService(movieId)
            setMovie(movie)
        }
        async function handleCheckIfMovieIsFavorited() {
            const isMovieFavorited = await checkIfMovieIsFavorited(movieId)
            setIsFavorited(isMovieFavorited)
        }
        async function init() {
            await handleCheckIfMovieIsFavorited()
            await loadMovie()
        }
        init()
    }, []);

    useEffect(() => {
        saveFavoritedMovieOrNot()
    }, [isFavorited]);

    async function saveFavoritedMovieOrNot() {
        if (isFavorited && !wasFavorited) {
            await saveFavoriteMovie(favoritedMovie)
            setWasFavorited(true)
        } else if (!isFavorited && wasFavorited) {
            await deleteFavoriteMovie(movieId)
            setWasFavorited(false)
        }
    }


    async function toggleButton() {
        setIsFavorited(!isFavorited)
    }


    return (
        <MovieDetailsContainer>
            <MovieDetailsContent>
                <ScrollView contentContainerStyle={{alignItems: 'center'}}>
                    <HeaderContainer>
                        <BackButton onPress={() => navigation.goBack()}>
                            <AntDesign name="arrowleft" size={35} color="black" style={{padding: 5}}/>
                        </BackButton>
                        <HeaderTitle>Movie Detail</HeaderTitle>
                        <FavoriteButton onPress={toggleButton}>
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
