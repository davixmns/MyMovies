import {ActivityIndicator, View, StyleSheet, ImageBackground} from "react-native";
import * as Animatable from "react-native-animatable";

// @ts-ignore
import icon from "../assets/circleIcon.png"
// @ts-ignore
import blurBg from "../assets/blurbg.jpg"

export function SplashScreen() {
    return (
        <ImageBackground source={blurBg} style={styles.container}>
            {/*girar icone*/}
            <Animatable.Image
                animation="rotate"
                iterationCount="infinite"
                easing="linear"
                duration={2500}
                source={icon}
                style={styles.image}
            />
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
    },
    image: {
        width: 100,
        height: 100,
    }
});
