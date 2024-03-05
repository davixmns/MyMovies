import styled from "styled-components/native";
//@ts-ignore
import defaultPicture from '../assets/default_picture.jpg'
import {MY_IP} from "../config";

export default function CircularImage({profilePicture, width}: { profilePicture: string, width: number }) {

    const formattedUri = profilePicture ? `http://${MY_IP}/${profilePicture}?${Date.now()}` : null;

    return (
        <>
            {profilePicture ? (
                //@ts-ignore
                <Circular source={{uri: formattedUri}} width={width}/>
            ) : (
                <Circular source={defaultPicture} width={width}/>
            )}
        </>
    );
}

const Circular = styled.Image`
  width: ${(props: { width?: number }) => props.width}px;
  height: ${(props: { width?: number }) => props.width}px;
  border-radius: 100px;
`