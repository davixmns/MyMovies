import {ActivityIndicator, View, Image, StyleSheet} from "react-native";

// @ts-ignore
import icon from "../assets/icon.png"

export function SplashScreen() {
    return (
        <View style={styles.container}>
            <Image source={icon} style={styles.image}/>
            <ActivityIndicator size={'large'} color='black' />
        </View>
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
        marginTop: '15%',
        width: 150,
        height: 150,
        borderRadius: 18,
        marginBottom: 20,
    }
});
