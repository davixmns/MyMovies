import styled from "styled-components/native";
import {Text} from "react-native";

export default function CommentCard({commentData} : {commentData?: Comment}) {
    return (
        <Container>
            <Text>CommentCard</Text>
        </Container>
    );
}

const Container = styled.View`
    height: 80px;
    width: 100%;
    background-color: green;
`