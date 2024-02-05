import {useEffect, useState} from 'react';
import {ActivityIndicator, Image, ScrollView, View} from 'react-native';
import {AntDesign, FontAwesome6} from '@expo/vector-icons';
import {useNavigation} from "@react-navigation/native";
import {FavoritedMovie, Genre, Movie} from "../../interfaces/interfaces";
import {getMovieByIdService} from "../../service/service";
import {useMovieContext} from "../../contexts/MovieContext";
import {WriteReviewButton} from "../../components/WriteReviewButton";
import * as Haptics from "expo-haptics";
import {
    MovieDetailsContainer, BackButton, MovieDetailsContent, MoviePosterContainer,
    MoviePoster, HeaderContainer, HeaderTitle, LoadingContainer,
    DescriptionContainer, MovieTitle, MovieDuration, MovieDescription,
    WriteReviewContainer, VoteAverage, GenreContainer, MovieGenre,
    MovieDurationContainer, SectionTitle, ReleaseAndRatingContent,
    ReleaseAndRatingContainer, VoteAverageContainer, OverviewContainer,
    FavoriteButton, ReleaseDateText,
} from "./styles";
import GenresCapsules from "../../components/GenresCapsules";

//@ts-ignore
export function MovieDetails({route}) {
    const navigation = useNavigation();
    const {tmdbMovieId} = route.params
    const [wasFavorited, setWasFavorited] = useState<boolean>(false);
    const [isFavorited, setIsFavorited] = useState<boolean>(false);
    const [canClick, setCanClick] = useState<boolean>(true);
    const [posterIsLoading, setPosterIsLoading] = useState<boolean>(true);
    const [movie, setMovie] = useState<Movie>({} as Movie);
    const {saveFavoriteMovie, deleteFavoriteMovie, checkIfMovieIsFavorited} = useMovieContext()
    const movieDuration = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : ''
    const isMovieReleased = movie.status === 'Released'
    const moviePlaceholder = isMovieReleased ? 'Review Movie' : 'Movie not released yet'
    const parsedVoteAverage = movie.vote_average?.toFixed(2)
    const parsedReleaseDate = movie.release_date ? formatDate(movie.release_date) : ''
    const [movieGenres, setMovieGenres] = useState<Genre[]>([])

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
        genres: movieGenres,
    }

    useEffect(() => {
        const loadMovie = async () => {
            const movie = await getMovieByIdService(tmdbMovieId)
            setMovie(movie)
            setMovieGenres(movie.genres || [])
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
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
        saveFavoritedMovieOrNot()
    }, [isFavorited]);

    async function saveFavoritedMovieOrNot() {
        if (!canClick) return
        if (isFavorited && !wasFavorited) {
            await saveFavoriteMovie(favoritedMovie)
            setWasFavorited(true)
        } else if (!isFavorited && wasFavorited) {
            await deleteFavoriteMovie(tmdbMovieId)
            setWasFavorited(false)
        }
        setCanClick(true)
    }

    async function toggleButton() {
        setIsFavorited(!isFavorited)
    }

    function formatDate(date: string) {
        const dateArray = date.split('-')
        return `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`
    }


    return (
        <MovieDetailsContainer>
            <Image
                style={{width: '100%', height: '100%', position: 'absolute', opacity: 0.7}}
                source={{uri: `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}}
                blurRadius={40}
            />
            <MovieDetailsContent>
                <ScrollView contentContainerStyle={{alignItems: 'center'}} showsVerticalScrollIndicator={false}>
                    <HeaderContainer>
                        <BackButton onPress={() => navigation.goBack()}>
                            <AntDesign name="arrowleft" size={35} color="black" style={{padding: 5}}/>
                        </BackButton>
                        <HeaderTitle>Detalhes</HeaderTitle>
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
                        <GenreContainer>
                            <GenresCapsules genres={movieGenres}/>
                            <MovieDurationContainer>
                                <>
                                    <FontAwesome6 name={'clock'} size={15} color={'black'}/>
                                    <MovieDuration>{movieDuration}</MovieDuration>
                                </>
                            </MovieDurationContainer>
                        </GenreContainer>

                        <ReleaseAndRatingContainer>
                            <ReleaseAndRatingContent>
                                <SectionTitle>Rating</SectionTitle>
                                <VoteAverageContainer>
                                    <VoteAverage>{parsedVoteAverage}</VoteAverage>
                                    <VoteAverage>{voteAverageEmoji(movie.vote_average)}</VoteAverage>
                                </VoteAverageContainer>
                            </ReleaseAndRatingContent>
                            <ReleaseAndRatingContent>
                                <SectionTitle>Release Date</SectionTitle>
                                <ReleaseDateText>{parsedReleaseDate}</ReleaseDateText>
                            </ReleaseAndRatingContent>
                        </ReleaseAndRatingContainer>

                        <OverviewContainer>
                            <SectionTitle>Overview:</SectionTitle>
                            {movie.overview ? (
                                <MovieDescription>{movie.overview}</MovieDescription>
                            ) : (
                                <MovieDescription>No description available...</MovieDescription>
                            )}
                        </OverviewContainer>

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