import styled from "styled-components/native";
import {MyTextInput} from "../../components/MyTextInput";
import {useState} from "react";
import {ScrollView, StyleSheet} from "react-native";
import {FontAwesome6} from "@expo/vector-icons";
import {LinearGradient} from "expo-linear-gradient";

export function SearchMovies() {
    const [searchText, setSearchText] = useState('')

    return (
        <Container>
            <Content>
                <Header>
                    <Title>Search</Title>
                    <MyTextInput
                        text={searchText}
                        setText={setSearchText}
                        placeholder={'Search Here'}
                        iconName={'magnifying-glass'}
                    />
                </Header>
                <ScrollContainer>
                    <GridContainer>
                        <SubTitle>Maybe Interesting</SubTitle>
                        <GridContent>
                            <LinearGradient colors={['#fceabb', '#f8b500']} style={styles.boxLinearGradient}>
                                <ColorBoxContent>
                                    <FontAwesome6 name="star" size={30} color="white"/>
                                    <BoxTitle>Best Rated Movies</BoxTitle>
                                </ColorBoxContent>
                            </LinearGradient>
                            <LinearGradient colors={[ '#fbc7d4', '#9796f0']} style={styles.boxLinearGradient}>
                                <ColorBoxContent>
                                    <FontAwesome6 name="star" size={30} color="white"/>
                                    <BoxTitle>Best Rated Movies</BoxTitle>
                                </ColorBoxContent>
                            </LinearGradient>
                            <LinearGradient colors={['#ff512f', '#f09819']} style={styles.boxLinearGradient}>
                                <ColorBoxContent>
                                    <FontAwesome6 name="star" size={30} color="white"/>
                                    <BoxTitle>Best Rated Movies</BoxTitle>
                                </ColorBoxContent>
                            </LinearGradient>
                            <LinearGradient colors={['#2ecc71', '#27ae60']} style={styles.boxLinearGradient}>
                                <ColorBoxContent>
                                    <FontAwesome6 name="star" size={30} color="white"/>
                                    <BoxTitle>Best Rated Movies</BoxTitle>
                                </ColorBoxContent>
                            </LinearGradient>
                        </GridContent>
                    </GridContainer>
                </ScrollContainer>

            </Content>
        </Container>
    );
}

const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: white;
`

const ScrollContainer = styled.ScrollView.attrs({
    contentContainerStyle: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '100%',
        width: '100%',
    },
})`
`


const Content = styled.View`
    height: 85%;
    align-items: flex-start;
    justify-content: flex-start;
    width: 95%;
`

const Header = styled.View`
`

const styles = StyleSheet.create({
    boxLinearGradient: {
        width: '48%',
        height: '25%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

const ColorBoxContent = styled.View`
    width: 80%;
    height: 80%;
    gap: 5px
`

const BoxTitle = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: white;
`

const GridContainer = styled.View`
    display: flex;
    flex-direction: column;
    height: 100%;
    margin-top: 40px;
`

const GridContent = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    height: 70%;
    gap: 10px;
`
const SubTitle = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: black;
    padding-left: 4px;
    padding-bottom: 10px;
`

const Title = styled.Text`
    font-size: 30px;
    font-weight: bold;
    color: black;
`