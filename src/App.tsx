import styled from "styled-components";
import Left from "./Componnents/LeftBar/Left.tsx";
import Right from "./Componnents/RightBar/Right.tsx";
import Mid from "./Componnents/MidBar/Mid.tsx";

import { Provider } from 'react-redux';
import store from './store';

const Container = styled.div`
  display: flex;
  padding: 20px 50px;
  gap: 10px;

  @media (max-width: 1124px) { 
    flex-direction: column;
  }

  @media (max-width: 600px) { 
    padding: 10px 10px;
  }

  @media (max-width: 400px) { 
    padding: 10px 3px;
  }
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
