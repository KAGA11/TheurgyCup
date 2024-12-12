import React from 'react'
import styled from 'styled-components'
import { Image } from "antd";


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




export default function Jiejv() {
  return (
    <BoxStyle style={{ height: 'calc(40% - 10px)'}}>
        <Header>结局</Header>
        <div style={{ display:'flex'}}>
            <Image 
                preview={false} 
                
            />

        </div>

        
    </BoxStyle>
  )
}
