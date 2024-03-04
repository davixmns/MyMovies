import * as Animatable from "react-native-animatable";
// @ts-ignore
import appLogo from "../assets/circleIcon.png";
import styled from "styled-components/native";

export function RotativeIcon({iconRotating}: { iconRotating: boolean }) {
    return (
        <LogoContainer>
            <Animatable.View
                animation={iconRotating ? 'rotate' : ''}
                iterationCount={'infinite'}
            >
                <ImageLogo
                    source={appLogo}
                />
            </Animatable.View>
        </LogoContainer>
    );
}

const LogoContainer = styled.View`
  padding: 10px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.20);
`
const ImageLogo = styled.Image`
  height: 100px;
  width: 100px;
`