import {FlatList} from 'react-native';
import {useMovieContext} from "../../contexts/MovieContext";
import {MovieCard} from "../../components/movie_card/MovieCard";
import {
    CardPadding,
    ContainerHome,
    ContentHome,
    MainScroll,
    SearchContainer,
    TitleContainer,
    TitleHome
} from "./styles";
import {useAuthContext} from "../../contexts/AuthContext";
import {MyTextInput} from "../../components/MyTextInput";
import {useState} from "react";

export function Home() {
    const [searchText, setSearchText] = useState('')
    const {user} = useAuthContext()
    const {upcomingMovies} = useMovieContext();

    // @ts-ignore
    function renderMovies({item: movie}) {
        return (
            <CardPadding>
                <MovieCard movie={movie}/>
            </CardPadding>
        )
    }

    return (
        <ContainerHome>
            <ContentHome>
                <MainScroll>
                    <TitleContainer>
                        <TitleHome>{`Hello ${user?.name.split(' ')[0]} ❤️`}</TitleHome>
                    </TitleContainer>
                    <SearchContainer>
                        <MyTextInput
                            text={searchText}
                            setText={setSearchText}
                            placeholder={'Search Here'}
                            iconName={'magnifying-glass'}
                        />
                    </SearchContainer>
                    <TitleContainer>
                        <TitleHome>Upcoming Movies 🏃‍</TitleHome>
                    </TitleContainer>
                    <FlatList
                        data={upcomingMovies}
                        renderItem={renderMovies}
                        keyExtractor={item => item.id.toString()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        numColumns={1}
                    />
                </MainScroll>
            </ContentHome>
        </ContainerHome>
    );
}
