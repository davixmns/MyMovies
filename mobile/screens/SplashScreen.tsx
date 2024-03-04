import styled from "styled-components/native";
import {RotativeIcon} from "../components/RotativeIcon";

export function SplashScreen() {
    return (
        <Container>
            <RotativeIcon iconRotating={true}/>
        </Container>
    );
}


const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    background-color: #fff;
`;
