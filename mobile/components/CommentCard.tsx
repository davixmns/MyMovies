import styled from "styled-components/native";
import {Comment} from "../interfaces/interfaces";
import {Text} from "react-native";
import CircularImage from "./CircularImage";


export default function CommentCard({commentData}: { commentData?: Comment }) {
    const formattedEmail = commentData?.user?.email?.split('@')[0]

    return (
        <Container>
            <Content>
                {/*@ts-ignore*/}
                <CircularImage profilePicture={commentData?.user?.profile_picture} width={40}/>
                <CommentData>
                    <Name>{formattedEmail}</Name>
                    <Text>{commentData?.comment}</Text>
                </CommentData>
            </Content>
        </Container>
    );
}

const Name = styled.Text`
  font-weight: bold;
  font-size: 16px;
`

const CommentData = styled.View`
  flex: 1;
  flex-direction: column;
`

const Container = styled.View`
  width: 100%;
  margin-bottom: 20px;
  min-height: 45px;
`

const Content = styled.View`
  flex: 1;
  gap: 10px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`