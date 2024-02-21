import styled from "styled-components/native";
import {Image, ImageBackground, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
// @ts-ignore
import default_picture from "../assets/default_picture.jpg";
import {useState} from "react";

export function ActorsList({actors}: { actors: any[] }) {
    const navigation = useNavigation<StackNavigationProp<any>>();
    const [imgLoaded, setImgLoaded] = useState<boolean>(false);

    function goToActorMovies(actor: any) {
        // @ts-ignore
        navigation.push('ActorMovies', {
            actorId: actor.id,
            actorName: actor.name,
            actorProfilePath: actor.profile_path,
        })
    }

    function renderActor(actor: any, index: number) {
        return (
            <TouchableOpacity onPress={() => goToActorMovies(actor)} key={index} style={{flexDirection: 'column', alignItems: 'center'}}>
                {!imgLoaded && (
                    <ActorContainer>
                        <Image source={default_picture} style={{width: 100, height: 100, borderRadius: 50}}/>
                        <Text style={{fontWeight: 'bold', maxWidth: 110}} numberOfLines={2}>{actor.name}</Text>
                    </ActorContainer>
                )}
                <ActorContainer>
                    <Image
                        source={{uri: `https://image.tmdb.org/t/p/w200${actor.profile_path}`}}
                        style={{width: 100, height: 100, borderRadius: 50}}
                        onLoad={() => setImgLoaded(true)}
                    />
                    <Text style={{fontWeight: 'bold', maxWidth: 110}} numberOfLines={2}>{actor.name}</Text>
                </ActorContainer>
            </TouchableOpacity>
        )
    }

    return (
        <ActorsScroll>
            {actors.map((actor, index) => renderActor(actor, index))}
        </ActorsScroll>
    );
}

const ActorsScroll = styled.ScrollView.attrs({
    contentContainerStyle: {
        marginTop: 15,
        gap:
            20,
        height:
            140,
    }
    ,
    horizontal: true,
    showsHorizontalScrollIndicator:
        false,
})``

const ActorContainer = styled.View`
    flex-direction: column;
    align-items: center;
    gap: 5px;
`