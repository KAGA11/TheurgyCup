import styled from "styled-components";
import Left from "./Componnents/LeftBar/Left";
import Right from "./Componnents/RightBar/Right";
import Mid from "./Componnents/MidBar/Mid";

import { Provider } from 'react-redux';
import store from './store';

const Container = styled.div`
  display: flex;
  padding: 20px 50px;
  gap: 10px;
`;

export default function Profile() {
  return (
    <Provider store={store}>
      <Container>
        <Left />
        <Mid />
        <Right />
      </Container>
    </Provider>
  );
}
