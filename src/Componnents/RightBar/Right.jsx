import { useState } from 'react';
import styled from 'styled-components'

const BoxStyle = styled.div`
  padding: 10px 30px;
  border: 1px solid #ccc;
  height: calc(100% - 10px);
  margin-bottom: 10px;
  border-radius: 10px;
  background-color: #fff;
  text-align: center;
`;

const Header = styled.h4`
  font-size: 18px;
  text-align: center;
  margin-bottom: 20px;
`;


export default function Right() {
  const [ total, setTotal ] = useState(0)

  return (
    <div style={{ flex: 1 }}>
        <BoxStyle >
            <Header>总分({total})</Header>
        </BoxStyle>
    </div>
  )
}
