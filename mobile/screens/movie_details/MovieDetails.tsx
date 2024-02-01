import React, {useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, View} from 'react-native';
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
    LoadingContainer,
    DescriptionContainer,
    MovieTitle,
    MovieGenres,
    GenresContainer,
    MovieDuration,
    MovieDescription,
    WriteReviewContainer, VoteAverage, VoteAverageContainer,
} from "./styles";
import {MyButton} from "../../components/MyButton";
import {WriteReviewButton} from "../../components/WriteReviewButton";

//@ts-ignore
export function MovieDetails({route}) {
    const navigation = useNavigation();
    const {tmdbMovieId} = route.params
    const [wasFavorited, setWasFavorited] = useState<boolean>(false);
    const [isFavorited, setIsFavorited] = useState<boolean>(false);
    const [posterIsLoading, setPosterIsLoading] = useState<boolean>(true);
    const [movie, setMovie] = useState<Movie>({} as Movie);
    const {saveFavoriteMovie, deleteFavoriteMovie, checkIfMovieIsFavorited} = useMovieContext()
    const movieDuration = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : ''
    const isMovieReleased = movie.status === 'Released'
    const moviePlaceholder = isMovieReleased ? 'Review Movie' : 'Movie not released yet'
    const parsedVoteAverage = movie.vote_average?.toFixed(2)
    const voteAverageEmoji = (voteAverage: number) => {
        if (voteAverage >= 9) return '🤩'
        if (voteAverage >= 8) return '😍'
        if (voteAverage >= 7) return '😃'
        if (voteAverage >= 6) return '😮'
        if (voteAverage >= 5) return '😐'
        if (voteAverage >= 4) return '😕'
        if (voteAverage >= 3) return '☹️'
        if (voteAverage >= 2) return '😡'
        if (voteAverage >= 1) return '🤢'
        return '🤮'
    }

    const favoritedMovie: FavoritedMovie = {
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
    }

    useEffect(() => {
        const loadMovie = async () => {
            const movie = await getMovieByIdService(tmdbMovieId)
            setMovie(movie)
        }

        async function handleCheckIfMovieIsFavorited() {
            const isMovieFavorited = await checkIfMovieIsFavorited(tmdbMovieId)
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
            await deleteFavoriteMovie(tmdbMovieId)
            setWasFavorited(false)
        }
    }

    async function toggleButton() {
        setIsFavorited(!isFavorited)
    }

    return (
        <MovieDetailsContainer>
            <MovieDetailsContent>
                <ScrollView contentContainerStyle={{alignItems: 'center'}} showsVerticalScrollIndicator={false}>
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
                        <VoteAverageContainer>
                            <VoteAverage>{parsedVoteAverage}</VoteAverage>
                            <VoteAverage>{voteAverageEmoji(movie.vote_average)}</VoteAverage>
                        </VoteAverageContainer>
                    </MoviePosterContainer>
                    <DescriptionContainer>
                        <MovieTitle>{movie.title}</MovieTitle>
                        <GenresContainer>
                            <MovieGenres>{movie.genres?.map(genre => genre.name).join(' • ')}</MovieGenres>
                            <MovieDuration>{movieDuration}</MovieDuration>
                        </GenresContainer>
                        {movie.overview ? (
                            <MovieDescription>{movie.overview}</MovieDescription>
                        ) : (
                            <MovieDescription>No description available...</MovieDescription>
                        )}
                    </DescriptionContainer>
                    <View style={{height: 120}}/>
                </ScrollView>
                <WriteReviewContainer>
                    <WriteReviewButton isActive={isMovieReleased} placeholder={moviePlaceholder}/>
                </WriteReviewContainer>
            </MovieDetailsContent>
        </MovieDetailsContainer>
    );
}
