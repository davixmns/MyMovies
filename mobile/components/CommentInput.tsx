import {useEffect, useState} from "react";
import {FontAwesome6} from "@expo/vector-icons";
import styled from "styled-components/native";
import {BlurView} from "expo-blur";
import {Image, Keyboard, StyleSheet} from "react-native";
//@ts-ignore
import defaultPicture from "../assets/default_picture.jpg";

export function CommentInput(
    {
        comment,
        setComment,
        profileImage,
        onPress,
        ...props
    }: {
        comment: string,
        setComment: (comment: string) => void,
        profileImage?: string,
        onPress: () => void,
    }
) {
    const [height, setHeight] = useState(40);

    const handleContentSizeChange = (event: any) => {
        setHeight(event.nativeEvent.contentSize.height);
    };

    return (
        <Container>
            <BlurView intensity={100} style={styles.blur}>
                {profileImage ? (
                    <ProfileImage source={{uri: profileImage}}/>
                ) : (
                    <Image
                        source={defaultPicture}
                        style={{width: 40, height: 40, borderRadius: 20, marginRight: 10}}
                    />
                )}

                <Content>
                    <Input
                        multiline
                        placeholder={'Write a comment...'}
                        value={comment}
                        onChangeText={setComment}
                        onContentSizeChange={handleContentSizeChange}
                        style={{height: Math.min(120, Math.max(40, height))}}
                        {...props}
                    />
                </Content>
                <IconContainer onPress={onPress}>
                    <FontAwesome6 name={'paper-plane'} size={23} color={'#3797EF'}/>
                </IconContainer>
            </BlurView>
        </Container>
    );
}

const styles = StyleSheet.create({
    blur: {
        paddingTop: 20,
        paddingBottom: 25,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    }
})

const Container = styled.View`
  align-items: center;
`;

const Content = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const ProfileImage = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 10px;
`;

const Input = styled.TextInput`
  flex: 1;
  background-color: #e8e8e8;
  min-height: 40px;
  max-height: 100px;
  border-radius: 5px;
  padding: 10px;
  font-size: 16px;
`;

const IconContainer = styled.TouchableOpacity`
  height: 40px;
  width: 40px;
  align-items: center;
  justify-content: center;
`;