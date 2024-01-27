import {ContainerProfile, ContentProfile, TitleProfile} from "./styles";
import {MyButton} from "../../components/MyButton";
import {ButtonContainer} from "../login/styles";
import {useAuthContext} from "../../contexts/AuthContext";

export const Profile = () => {
    const {user, logout} = useAuthContext()

    function handleLogout() {
        if (logout) logout()
    }

    return (
        <ContainerProfile>
         <ContentProfile>
             <TitleProfile>{`Bem Vindo, ${user?.name.split(' ')[0]}.`}</TitleProfile>
             <ButtonContainer>
                 <MyButton onPress={handleLogout}>Log Out</MyButton>
             </ButtonContainer>
         </ContentProfile>
        </ContainerProfile>
    );
};