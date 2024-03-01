import {useEffect, useState} from "react";
import {FontAwesome6} from "@expo/vector-icons";
import styled from "styled-components/native";
import {BlurView} from "expo-blur";
import {Keyboard, StyleSheet} from "react-native";


export function CommentInput(
    {
        comment,
        setComment,
        profileImage,
        onPress
    }: {
        comment: string,
        setComment: (comment: string) => void,
        profileImage?: string,
        onPress: () => void
    }
) {
    const [height, setHeight] = useState(40);

    const handleContentSizeChange = (event: any) => {
        setHeight(event.nativeEvent.contentSize.height);
    };

    useEffect(() => {
        if(comment === '\n'){
            setComment('')
            Keyboard.dismiss()
        }
    }, [comment])

    return (
        <Container>
            <BlurView intensity={100} style={styles.blur}>
                <ProfileImage source={{uri: profileImage}}/>
                <Content>
                    <Input
                        multiline
                        placeholder={'Write a comment...'}
                        value={comment}
                        onChangeText={setComment}
                        onContentSizeChange={handleContentSizeChange}
                        style={{height: Math.min(120, Math.max(40, height))}}
                    />
                </Content>
                <IconContainer onPress={onPress}>
                    <FontAwesome6 name={'paper-plane'} size={25} color={'gray'}/>
                </IconContainer>
            </BlurView>
        </Container>
    );
}

const styles = StyleSheet.create({
    blur: {
        paddingTop: 20,
        paddingBottom: 30,
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