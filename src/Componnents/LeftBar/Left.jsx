import React from 'react';
import styled from 'styled-components'

import Linshi from './Linshi';
import Jiejv from './Jiejv';

const BoxStyle = styled.div`
    padding:10px 30px;
    border: 1px solid #ccc;
    height: calc(30% - 10px);
    margin-bottom: 10px;
    border-radius: 10px;
    background-color: #fff;
`

const Header = styled.h4`
    font-size: 18px;
    text-align: center;
    margin-bottom: 10px;
`




export default function Left() {
  return (
    <div style={{ flex: 1 }}>
        <Linshi />
        <Jiejv />


        <BoxStyle>
        3
        </BoxStyle>

    </div>
  )
}
