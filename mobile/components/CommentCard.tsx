import styled from "styled-components/native";
import {Comment} from "../interfaces/interfaces";
import {View, Text, Image} from "react-native";
import {MY_IP} from "../config";
//@ts-ignore
import defaultPicture from "../assets/default_picture.jpg";


export default function CommentCard({commentData}: { commentData?: Comment }) {
    const profileImage = `http://${MY_IP}/${commentData?.user?.profile_picture}`
    return (
        <Container>
            <Content>
                <View>
                    {commentData?.user.profile_picture ? (
                        <ProfileImage source={{uri: profileImage}}/>
                    ) : (
                        <Image source={defaultPicture} style={{width: 35, height: 35, borderRadius: 25}}/>
                    )}
                </View>
                <CommentData>
                    <Name>{commentData?.user.name}</Name>
                    <Text>{commentData?.comment}</Text>
                </CommentData>
            </Content>
        </Container>
    );
}

const ProfileImage = styled.Image`
  width: 35px;
  height: 35px;
  border-radius: 25px;
`

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
  min-height: 50px;
`

const Content = styled.View`
  flex: 1;
  gap: 10px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`