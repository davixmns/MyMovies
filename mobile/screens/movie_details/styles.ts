import styled from "styled-components/native";

export const MovieDetailsContainer = styled.View`
  flex: 1;
  align-items: center;
  padding: 20px;
  background-color: #fff;
`;

export const MovieDetailsContent = styled.View`
  flex: 0.95;
  width: 100%;
  align-items: center;
  justify-content: flex-end;
`

export const MovieImage = styled.Image`
  width: 120%;
  height: 400px;
  border-radius: 20px;
  margin-bottom: 20px;
`;

export const MovieTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 5px;
`;

export const MovieDescription = styled.Text`
  font-size: 16px;
  color: #333;
  padding: 20px;
`;

export const FavoriteButton = styled.TouchableOpacity`
  margin-top: 30px;
`;

export const RatingContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const RatingText = styled.Text`
  font-size: 25px;
  font-weight: bold;
  margin-left: 5px;
`;

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: #fff;
  border-radius: 40px;
`;
