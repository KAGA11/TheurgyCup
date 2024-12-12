import styled from "styled-components";
import Left from "./Componnents/LeftBar/Left";
import Right from "./Componnents/RightBar/Right";
import Mid from "./Componnents/MidBar/Mid";

const Container = styled.div`
  display: flex;
  height: 100vh;
  padding: 20px 50px;
  gap: 10px;
`;

export default function Profile() {
  return (
    <Container>
      <Left />
      <Mid />
      <Right />
    </Container>
  );
}
