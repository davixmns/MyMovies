import {
    Alert,
    Keyboard,
    Platform,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from "react-native";
import styled from "styled-components/native";
import {useAuthContext} from "../contexts/AuthContext";
//@ts-ignore
import defaultPicture from '../assets/default_picture.jpg'
import {AntDesign, FontAwesome6} from "@expo/vector-icons";
import {useEffect, useState} from "react";
import {MyTextInput} from "../components/MyTextInput";
import {MyButton} from "../components/MyButton";
import {useNavigation} from "@react-navigation/native";
import {emailRegex} from "../utils/utils";
import {User} from "../interfaces/interfaces";
import {useUserContext} from "../contexts/UserContext";

export function EditProfile() {
    const {user} = useAuthContext()
    const {updateProfilePicture} = useUserContext()
    const navigation = useNavigation()
    const [name, setName] = useState(user?.name)
    const [email, setEmail] = useState(user?.email)
    const [btnDisabled, setBtnDisabled] = useState(true)
    const {updateUserAccount} = useUserContext()

    useEffect(() => {
        // @ts-ignore
        if (emailRegex.test(email as string) && name.length > 3) {
            setBtnDisabled(false)
        } else {
            setBtnDisabled(true)
        }

    }, [email, name]);

    function renderProfilePicture() {
        if (user?.profile_picture) {
            return <ProfileImage source={{uri: user?.profile_picture}}/>
        } else {
            return <ProfileImage source={defaultPicture}/>
        }
    }


    async function handleUpdateUserAccount() {
        const updatedUser: User = {
            name: name as string,
            email: email as string
        }
        await updateUserAccount(updatedUser)
        navigation.goBack()
    }

    async function confirmChanges() {
        Alert.alert(
            "Confirm changes",
            "Are you sure you want to save these changes?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Save", onPress: () => {
                        handleUpdateUserAccount()
                    }
                }
            ]
        );
    }

    return (
        <Container>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Content>
                    <HeaderContainer>
                        <BackButton onPress={() => navigation.goBack()}>
                            <AntDesign name="arrowleft" size={35} color="black" style={{padding: 5}}/>
                        </BackButton>
                        <HeaderTitle>Edit Profile</HeaderTitle>
                        {/*@ts-ignore*/}
                        <FontAwesome6 name="gear" size={30} color="transparent"/>
                    </HeaderContainer>
                    <FormContainer>
                        <TouchableOpacity onPress={updateProfilePicture}>
                            <PictureContainer>
                                <IconContainer>
                                    <FontAwesome6 name="image" size={20} color="white"/>
                                </IconContainer>
                                {renderProfilePicture()}
                            </PictureContainer>
                        </TouchableOpacity>
                        <InputsContainer>
                            {/* @ts-ignore */}
                            <MyTextInput text={name} setText={setName} iconName={'user'}/>
                            {/* @ts-ignore */}
                            <MyTextInput text={email} setText={setEmail} iconName={'envelope'}/>
                        </InputsContainer>
                    </FormContainer>
                    <ButtonContainer>
                        <MyButton onPress={confirmChanges} disabled={btnDisabled} title={'Save Changes'}/>
                    </ButtonContainer>
                </Content>
            </TouchableWithoutFeedback>
        </Container>
    );
}

const Container = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: white;
`

const Content = styled.KeyboardAvoidingView.attrs({
    behavior: Platform.OS === 'ios' ? 'padding' : 'height',
})`
  flex: ${Platform.OS === 'ios' ? 0.87 : 0.98};
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 90%;
`;

const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const HeaderTitle = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: black;
  padding-right: 15px;
`;

const PictureContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.20);
  width: 180px;
`

const IconContainer = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  background-color: lightgray;
  border-radius: 100px;
  z-index: 1;
  padding: 10px;
`

const ProfileImage = styled.Image`
  width: 180px;
  height: 180px;
  border-radius: 100px;
  background-color: black;
`;

const FormContainer = styled.View`
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 45%;
  margin-bottom: 20%;
  align-items: center;
`

const InputsContainer = styled.View`
  gap: 20px
`

const BackButton = styled.TouchableOpacity`
  border-radius: 16px;
`;

const ButtonContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const SettingsButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`