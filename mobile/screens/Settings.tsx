import styled from "styled-components/native";
import {Alert, Platform} from "react-native";
import {TextButton} from "../components/TextButton";
import {useAuthContext} from "../contexts/AuthContext";
import {AntDesign, FontAwesome6} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";

export function Settings() {
    const {deleteMyAccount} = useAuthContext()
    const navigation = useNavigation()

    function handleDeleteMyAccount() {
        if (!deleteMyAccount) return
        Alert.alert(
            "Delete account",
            "Are you sure you want to delete your account?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {text: "Delete account", onPress: () => deleteMyAccount()}
            ]
        );
    }

    return (
        <Container>
            <Content>
                <HeaderContainer>
                    <BackButton onPress={() => navigation.goBack()}>
                        <AntDesign name="arrowleft" size={35} color="black" style={{padding: 5}}/>
                    </BackButton>
                    <HeaderTitle>Settings</HeaderTitle>
                    <FontAwesome6 name="gear" size={30} color="transparent"/>
                </HeaderContainer>
                <OptionsContainer>
                    <SettingItemContainer>
                        <TextButton
                            onPress={() => {}}
                            placeholder={'Change password'}
                            iconName={'key'}
                            iconColor={'gold'}
                        />
                    </SettingItemContainer>
                    <SettingItemContainer>
                        <TextButton
                            onPress={handleDeleteMyAccount}
                            placeholder={'Delete account'}
                            iconName={'trash'}
                            iconColor={'red'}
                        />
                    </SettingItemContainer>
                </OptionsContainer>
            </Content>
        </Container>
    );
}

const Container = styled.View`
  display: flex;
  background-color: white;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`

const Content = styled.View`
  display: flex;
  width: 90%;
  flex: ${Platform.OS === 'ios' ? 0.93 : 0.98};
`

const SettingItemContainer = styled.View`
  display: flex;
  align-items: flex-start;
  width: 100%;
`

const OptionsContainer = styled.View`
  display: flex;
  gap: 20px;
  width: 100%;
  margin-top: 30px;
`

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

const BackButton = styled.TouchableOpacity`
  border-radius: 16px;
`;
