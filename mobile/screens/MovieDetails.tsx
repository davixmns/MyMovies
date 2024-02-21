import {useEffect, useState} from 'react';
import {Image, Platform, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {AntDesign, FontAwesome6} from '@expo/vector-icons';
import {useNavigation} from "@react-navigation/native";
import {FavoritedMovie, Genre, Movie} from "../interfaces/interfaces";
import {getActorsFromAMovieService, getMovieByIdService} from "../service/service";
import {useMovieContext} from "../contexts/MovieContext";
import {WriteReviewButton} from "../components/WriteReviewButton";
import * as Haptics from "expo-haptics";
import GenresCapsules from "../components/GenresCapsules";
import styled from "styled-components/native";
import {ActorsList} from "../components/ActorsList";

//@ts-ignore
export function MovieDetails({route}) {
    const navigation = useNavigation();
    const {tmdbMovieId} = route.params
    const [actors, setActors] = useState([])
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
    const bgColor = posterIsLoading ? 'lightgray' : 'transparent'
    const imgWidth = 240
    const imgHeight = 360

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
            await loadMovie()
            await handleCheckIfMovieIsFavorited()
            await loadActors()
        }

        init()
    }, []);

    useEffect(() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
        saveFavoritedMovieOrNot()
    }, [isFavorited]);

    async function loadActors() {
        const actors = await getActorsFromAMovieService(tmdbMovieId)
        setActors(actors)
    }

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
        <Container>
            <Image
                style={{width: '100%', height: '100%', position: 'absolute', opacity: 0.7}}
                source={{uri: `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}}
                blurRadius={40}
            />
            <Content>
                <HeaderContainer>
                    <BackButton onPress={() => navigation.goBack()}>
                        <AntDesign name="arrowleft" size={35} color="black" style={{padding: 5}}/>
                    </BackButton>
                    <HeaderTitle>Movie Details</HeaderTitle>
                    <FavoriteButton onPress={toggleButton}>
                        <AntDesign name={isFavorited ? 'heart' : 'hearto'} size={30} color="red"/>
                    </FavoriteButton>
                </HeaderContainer>
                <ScrollView contentContainerStyle={{alignItems: 'center'}} showsVerticalScrollIndicator={false}>

                    <MoviePosterContainer>
                        {posterIsLoading && (
                            <LoadingBackground bgColor={bgColor} height={imgHeight} width={imgWidth}/>
                        )}
                        <MoviePoster
                            source={{uri: `https://image.tmdb.org/t/p/w1280${movie.poster_path}`}}
                            onLoad={() => setPosterIsLoading(false)}
                        />
                    </MoviePosterContainer>

                    <DescriptionContainer>
                        <MovieTitle>{movie.title}</MovieTitle>

                        <GenreAndDurationContainer>
                            <GenreContainer>
                                <GenresCapsules genres={movieGenres}/>
                            </GenreContainer>

                            <MovieDurationContainer>
                                <MovieDurationContent>
                                    {movieDuration !== '' ? (
                                        <>
                                            <FontAwesome6 name={'clock'} size={16} color={'black'}/>
                                            <MovieDuration>{movieDuration}</MovieDuration>
                                        </>
                                    ) : (
                                        <>
                                            <FontAwesome6 name={'clock'} size={16} color={'black'}/>
                                            <MovieDuration>???</MovieDuration>
                                        </>
                                    )}
                                </MovieDurationContent>
                            </MovieDurationContainer>
                        </GenreAndDurationContainer>

                        <ReleaseAndRatingContainer>
                            <ReleaseAndRatingContent>
                                <SectionTitle>Rating</SectionTitle>
                                <VoteAverageContainer>
                                    {movie.vote_average ? (
                                        <>
                                            <VoteAverage>{parsedVoteAverage}</VoteAverage>
                                            <VoteAverage>{voteAverageEmoji(movie.vote_average)}</VoteAverage>
                                        </>
                                    ) : (
                                        <VoteAverage>???</VoteAverage>
                                    )}
                                </VoteAverageContainer>
                            </ReleaseAndRatingContent>
                            <ReleaseAndRatingContent>
                                <SectionTitle>Release Date</SectionTitle>
                                {parsedReleaseDate !== '' ? (
                                    <ReleaseDateText>{parsedReleaseDate}</ReleaseDateText>
                                ) : (
                                    <ReleaseDateText>???</ReleaseDateText>
                                )}
                            </ReleaseAndRatingContent>
                        </ReleaseAndRatingContainer>

                        <OverviewContainer>
                            <SectionTitle>Overview:</SectionTitle>
                            {movie.overview ? (
                                <MovieDescription>{movie.overview}</MovieDescription>
                            ) : (
                                <MovieDescription>???</MovieDescription>
                            )}
                        </OverviewContainer>

                        <OverviewContainer>
                            <SectionTitle>Actors:</SectionTitle>
                            {actors.length > 0 ? (
                                <ActorsList actors={actors}/>
                            ) : (
                                <Text>???</Text>
                            )}
                        </OverviewContainer>

                    </DescriptionContainer>


                    <View style={{height: 120}}/>
                </ScrollView>
                <WriteReviewContainer>
                    <WriteReviewButton isActive={isMovieReleased} placeholder={moviePlaceholder}/>
                </WriteReviewContainer>
            </Content>
        </Container>
    );
}

const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
`;

const Content = styled.View`
    width: 95%;
    flex: ${Platform.OS === 'ios' ? 0.96 : 0.99};
    align-items: center;
    justify-content: flex-start;
`

const HeaderContainer = styled.View`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 70px;
    align-items: center;
    justify-content: space-between;
`;

const HeaderTitle = styled.Text`
    font-size: 22px;
    font-weight: bold;
    color: black;
    padding-right: 15px;
`;

export const FavoriteButton = styled.TouchableOpacity`
`;


const BackButton = styled.TouchableOpacity`
    border-radius: 16px;
`;

const MoviePoster = styled.Image`
    width: 240px;
    height: 360px;
    border-radius: 20px;
`;

const MoviePosterContainer = styled.View`
    flex-direction: column;
    align-items: center;
    box-shadow: 20px 20px 20px rgba(0, 0, 0, 0.40);
`;

const DescriptionContainer = styled.View`
    width: 100%;
    align-items: flex-start;
    justify-content: flex-start;
    margin-top: 20px;
`;

const MovieTitle = styled.Text`
    font-size: 25px;
    font-weight: bold;
    color: black;
`;

const SectionTitle = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: black;
`;

const GenreAndDurationContainer = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 100%;
`;

const GenreContainer = styled.View`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    gap: 10px;
    margin-bottom: 10px;
    width: 73%;
    align-items: center;
`

const MovieDurationContainer = styled.View`
    display: flex;
    align-self: flex-start;
    margin-top: 5px;
    width: 100%;
`;

const MovieDurationContent = styled.View`
    background-color: #fafafa;
    display: flex;
    flex-direction: row;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    width: 90px;
    height: 30px;
`;

const MovieDuration = styled.Text`
    font-size: 13px;
    color: black;
    font-weight: bold;
    padding-left: 5px;
    padding-right: 5px;
`;

const MovieDescription = styled.Text`
    font-size: 16px;
    color: black;
    padding-top: 10px;
`;

const WriteReviewContainer = styled.View`
    //border-radius: 40px;
    position: absolute;
    width: 100%;
    height: 50px;
    bottom: 0;
    margin-bottom: 30px;
    //box-shadow: 20px 10px 20px rgba(0, 0, 0, 0.40);
`;


const VoteAverage = styled.Text`
    font-size: 30px;
    color: #ffc83a;
    text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.40);
    font-weight: bold;
`;

const ReleaseAndRatingContainer = styled.View`
    display: flex;
    flex-direction: row;
    width: 100%;
    max-width: 100%;
    justify-content: space-between;
    margin-top: 15px;
`

const ReleaseAndRatingContent = styled.View`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const VoteAverageContainer = styled.View`
    display: flex;
    flex-direction: row;
    gap: 5px
`

const OverviewContainer = styled.View`
    margin-top: 30px;
`

const ReleaseDateText = styled.Text`
    font-size: 30px;
    color: black;
    font-weight: bold;
`

const LoadingBackground = styled.View<{ bgColor: string, height: number, width: number }>`
    position: absolute;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    background-color: ${props => props.bgColor};
    border-radius: 20px;
`