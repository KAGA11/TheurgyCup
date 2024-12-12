import React, { useState } from 'react'
import { Col, InputNumber, Row, Slider, Space } from 'antd';
import styled from'styled-components'

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



const IntegerStep = ({ name, value, onChange }) => {
    return (
      <Row align="middle" style={{ marginBottom: '20px' }}>
        <Col span={6}  style={{ fontSize:'18px', display: 'inline-block' }} >
          <span>{name}</span>
        </Col>
        <Col span={12}>
          <Slider
            min={0}
            max={20}
            onChange={onChange}
            value={typeof value === 'number' ? value : 0}
          />
        </Col>
        <Col span={2}>
          <InputNumber
            min={0}
            max={20}
            style={{
              margin: '0 16px',
            }}
            value={typeof value === 'number' ? value : 0}
            onChange={onChange}
            defaultValue={0}
          />
        </Col>
     </Row>
    );
  };

export default function Linshi() {
  const [ values, setValues ] = useState({
    sixStar: 0,
    fiveStar: 0,
    fourStar: 0,
  });

  const totalScore = () => values.sixStar * 50 + values.fiveStar * 20 + values.fourStar * 10;

  return (
    <BoxStyle>
        <Header>临时招募({ totalScore() })</Header>
        <Space
            style={{
                width: '100%',
            }}
            direction="vertical"
        >
            <IntegerStep 
                name={'六星(50):'} 
                value={values.sixStar} 
                onChange={ value => setValues({ ...values, sixStar: value })}
            />
            <IntegerStep 
                name={'五星(20):'}
                value={values.fiveStar}
                onChange={ value => setValues({...values, fiveStar: value })}
            />
            <IntegerStep 
                name={'四星(10):'}
                value={values.fourStar}
                onChange={ value => setValues({...values, fourStar: value})}
            />
        </Space>
    </BoxStyle>
  )
}
