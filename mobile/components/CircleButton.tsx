import {FontAwesome6} from "@expo/vector-icons";
import {TouchableOpacity} from "react-native";

export default function CircleButton({onPress, iconName, color}: any) {
    return (
        <TouchableOpacity onPress={onPress}>
            <FontAwesome6
                name={iconName}
                size={40}
                color={color}
                style={{padding: 10}}
            />
        </TouchableOpacity>
    )
}