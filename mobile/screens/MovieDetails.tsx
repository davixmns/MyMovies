import {useEffect, useMemo, useRef, useState} from 'react';
import {
    Image,
    Platform,
    ScrollView,
    Text,
    View,
    StyleSheet,
    Alert,
    KeyboardAvoidingView, Keyboard
} from 'react-native';
import {AntDesign, FontAwesome6} from '@expo/vector-icons';
import {useNavigation} from "@react-navigation/native";
import {Comment, FavoritedMovie, Genre, Movie} from "../interfaces/interfaces";
import {
    getActorsFromAMovieService,
    getCommentsFromAMovieService,
    getMovieByIdService,
    saveCommentService
} from "../service/service";
import {useMovieContext} from "../contexts/MovieContext";
import * as Haptics from "expo-haptics";
import GenresCapsules from "../components/GenresCapsules";
import styled from "styled-components/native";
import {ActorsList} from "../components/ActorsList";
import {BlurView} from "expo-blur";
import {useAuthContext} from "../contexts/AuthContext";
import BottomSheet, {BottomSheetFlatList} from "@gorhom/bottom-sheet";
import CommentCard from "../components/CommentCard";
import * as Animatable from 'react-native-animatable';
import {CommentInput} from "../components/CommentInput";
import AsyncStorage from "@react-native-async-storage/async-storage";
//@ts-ignore
import defaultPicture from "../assets/default_picture.jpg";

//@ts-ignore
export function MovieDetails({route}) {
    const {saveFavoriteMovie, deleteFavoriteMovie, checkIfMovieIsFavorited,} = useMovieContext()
    const {user} = useAuthContext()
    const navigation = useNavigation();
    const {tmdbMovieId} = route.params
    const [actors, setActors] = useState([])
    const [comments, setComments] = useState<Comment[]>([])
    const [wasFavorited, setWasFavorited] = useState<boolean>(false);
    const [isFavorited, setIsFavorited] = useState<boolean>(false);
    const [canClick, setCanClick] = useState<boolean>(true);
    const [posterIsLoading, setPosterIsLoading] = useState<boolean>(true);
    const [movie, setMovie] = useState<Movie>({} as Movie);
    const movieDuration = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : ''
    const parsedVoteAverage = movie.vote_average?.toFixed(2)
    const parsedReleaseDate = movie.release_date ? formatDate(movie.release_date) : ''
    const [movieGenres, setMovieGenres] = useState<Genre[]>([])
    const bgColor = posterIsLoading ? 'lightgray' : 'transparent'
    const imgWidth = 240
    const imgHeight = 360
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['25%', '50%', '75%', '85%'], []);
    const bottomSheetColor = Platform.OS === 'ios' ? 'transparent' : '#fff'
    const [comment, setComment] = useState<string>('')
    const [commentsIsVisible, setCommentsIsVisible] = useState<boolean>(false)

    useEffect(() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
        saveFavoritedMovieOrNot()
    }, [isFavorited]);

    useEffect(() => {
        async function init() {
            await loadMovie()
            await handleCheckIfMovieIsFavorited()
            await loadActors()
            await loadComments()
        }

        init()
    }, []);

    useEffect(() => {
        if (comment === '\n') {
            setComment('')
            bottomSheetRef.current?.snapToIndex(0)
            Keyboard.dismiss()
        }
    }, [comment]);

    async function loadMovie() {
        const movie = await getMovieByIdService(tmdbMovieId)
        setMovie(movie)
        setMovieGenres(movie.genres || [])
    }

    async function loadComments() {
        const comments = await getCommentsFromAMovieService(tmdbMovieId)
        setComments(comments)
    }

    async function handleCheckIfMovieIsFavorited() {
        const isMovieFavorited = await checkIfMovieIsFavorited(tmdbMovieId)
        setIsFavorited(isMovieFavorited)
    }

    async function loadActors() {
        const actors = await getActorsFromAMovieService(tmdbMovieId)
        setActors(actors)
    }

    async function saveFavoritedMovieOrNot() {
        if (!canClick) return
        if (isFavorited && !wasFavorited) {
            const favoritedMovie: FavoritedMovie = {
                id: movie.id,
                title: movie.title,
                poster_path: movie.poster_path,
                genres: movieGenres,
            }
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

    function voteAverageEmoji(voteAverage: number) {
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

    function openComments() {
        if (comments.length === 0) {
            bottomSheetRef.current?.snapToIndex(0);
        } else {
            bottomSheetRef.current?.snapToIndex(3);
        }
        setCommentsIsVisible(true)
    }

    function closeComments() {
        bottomSheetRef.current?.close();
        setCommentsIsVisible(false)
    }

    async function saveComment() {
        if (comment.trim() === '') return
        const userJwt = await AsyncStorage.getItem('@user-jwt')
        if (!userJwt) return
        await saveCommentService(userJwt, tmdbMovieId, comment)
            .then(() => {
                setComment('')
                loadComments()
            })
            .catch((e) => {
                Alert.alert('Error', 'Error saving the comment')
                console.log(e)
            })
    }

    function formatFirstComment(comment: Comment) {
        const firstComment = comment
        const formatedText = firstComment.comment.length > 45 ? firstComment.comment.slice(0, 45) + '...' : firstComment.comment
        const formatedComment = {
            comment_id: firstComment.comment_id,
            comment: formatedText,
            user: {
                name: firstComment.user.name,
                profile_picture: firstComment ? `uploads/profile_pictures/${firstComment.user.user_id}.jpeg` : null
            }
        }
        return formatedComment as Comment
    }

    return (
        <Container>
            <Image
                style={{width: '100%', height: '100%', position: 'absolute', opacity: 0.7}}
                source={{uri: `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}}
                blurRadius={40}
            />
            <KeyboardAvoidingView style={styles.kav} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
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
                                <SectionTitle>Overview</SectionTitle>
                                {movie.overview ? (
                                    <MovieDescription>{movie.overview}</MovieDescription>
                                ) : (
                                    <MovieDescription>???</MovieDescription>
                                )}
                            </OverviewContainer>

                            <OverviewContainer>
                                <SectionTitle>Actors</SectionTitle>
                                {actors.length > 0 ? (
                                    <View style={{maxHeight: 150}}>
                                        <ActorsList actors={actors}/>
                                    </View>
                                ) : (
                                    <Text>???</Text>
                                )}
                            </OverviewContainer>


                            <CommentsContainerButton onPress={() => openComments()}>
                                <BlurView intensity={50} style={styles.blur}>
                                    <CommentsButtonContent>
                                        <CommentButtonContent>
                                            <SectionTitle color={'black'}>Comments</SectionTitle>
                                            {comments.length > 0 && (
                                                <CommentsLenght>{comments.length}</CommentsLenght>
                                            )}
                                        </CommentButtonContent>
                                        <>
                                            {comments.length === 0 ? (
                                                <FakeInputContainer>
                                                    <View>
                                                        {user?.profile_picture ? (
                                                            <UserImageComment source={{uri: user?.profile_picture}}/>
                                                        ) : (
                                                            <Image source={defaultPicture}
                                                                   style={{width: 35, height: 35, borderRadius: 25}}/>
                                                        )}
                                                    </View>
                                                    <FakeInput>
                                                        <Text style={{color: 'gray'}}>Add a comment...</Text>
                                                    </FakeInput>
                                                </FakeInputContainer>
                                            ) : (
                                                <FirstComment>
                                                    <CommentCard commentData={formatFirstComment(comments[0])}/>
                                                </FirstComment>
                                            )}
                                        </>
                                    </CommentsButtonContent>
                                </BlurView>
                            </CommentsContainerButton>
                        </DescriptionContainer>
                        <View style={{height: 50}}/>
                    </ScrollView>
                </Content>
                <BottomSheet
                    snapPoints={snapPoints}
                    ref={bottomSheetRef}
                    enablePanDownToClose={true}
                    onClose={() => setCommentsIsVisible(false)}
                    index={-1}
                    backgroundComponent={({style}) => (
                        <BlurView intensity={100} style={[style, {
                            flex: 1,
                            backgroundColor: bottomSheetColor,
                            overflow: 'hidden',
                            borderRadius: 25
                        }]}/>
                    )}
                >
                    <Container>
                        <CommentsContent>
                            <CommentsHeader>
                                <CommentsTitle>Comments</CommentsTitle>
                                <CloseCommentsButton onPress={() => closeComments()}>
                                    <FontAwesome6 name={'x'} size={25} color={'black'}/>
                                </CloseCommentsButton>
                            </CommentsHeader>
                            {comments.length === 0 ? (
                                <Text style={styles.noComments}>No comments yet</Text>
                            ) : (
                                <CommentListContainer>
                                    <BottomSheetFlatList
                                        data={comments}
                                        keyExtractor={(item) => item.comment_id.toString()}
                                        renderItem={({item}) => (
                                            <CommentCard commentData={item}/>
                                        )}
                                    />
                                </CommentListContainer>
                            )}
                        </CommentsContent>
                    </Container>
                </BottomSheet>
                {commentsIsVisible && (
                    <Animatable.View animation={'slideInUp'} duration={300} style={styles.commentInput}>
                        <CommentInput
                            comment={comment}
                            setComment={setComment}
                            // @ts-ignore
                            profileImage={user?.profile_picture}
                            onPress={saveComment}
                            onFocus={() => bottomSheetRef.current?.snapToIndex(3)}
                        />
                    </Animatable.View>
                )}
            </KeyboardAvoidingView>
        </Container>
    );

}

const styles = StyleSheet.create({
    blur: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    list: {
        width: '100%',
        height: '100%',
    },
    commentInput: {
        bottom: 0,
        width: '100%',
        alignItems: 'center',
    },
    kav: {
        flex: Platform.OS === 'ios' ? 0.96 : 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    noComments: {
        fontSize: 20,
        color: 'black',
        marginTop: 10
    }
})

const CommentListContainer = styled.View`
  margin-top: 25px;
  width: 100%;
  height: 100%;
`

const CloseCommentsButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  padding: 5px;
`

const CommentsHeader = styled.View`
  width: 100%;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: row;
`

const CommentsTitle = styled.Text`
  font-size: 25px;
  font-weight: bold;
  color: black;
`

const CommentsContent = styled.View`
  align-items: center;
  justify-content: flex-start;
  width: 90%;
  flex: 1;
`;

const CommentButtonContent = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;
`

const CommentsLenght = styled.Text`
  font-size: 15px;
`

const FakeInputContainer = styled.View`
  width: 100%;
  border-radius: 20px;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`

const FirstComment = styled.View`
  align-items: center;
  margin-bottom: 30px;
`

const FakeInput = styled.View`
  width: 85%;
  height: 30px;
  border-radius: 20px;
  justify-content: center;
  padding-left: 15px;
  background-color: #fafafa;
  opacity: 0.7;
`

const UserImageComment = styled.Image`
  width: 35px;
  height: 35px;
  border-radius: 20px;
`

const CommentsContainerButton = styled.TouchableOpacity`
  border-radius: 20px;
  width: 100%;
  height: 110px;
  margin-top: 30px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`

const CommentsButtonContent = styled.View`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 80%;
  gap: 10px
`

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
`;

const Content = styled.View`
  width: 95%;
  flex: 1;
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

const SectionTitle = styled.Text<{
    color?: string
}>`
  font-size: 20px;
  font-weight: bold;
  color: ${props => props.color || 'black'};
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

const LoadingBackground = styled.View<{
    bgColor: string,
    height: number,
    width: number
}>`
  position: absolute;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  background-color: ${props => props.bgColor};
  border-radius: 20px;
`