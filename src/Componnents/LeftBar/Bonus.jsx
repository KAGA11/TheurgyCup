import { useState } from 'react'
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
      <Row align="middle" style={{ marginBottom: '3px' }}>
        <Col span={6}  style={{ fontSize:'16px', display: 'inline-block' }} >
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

export default function Bouns() {
  const [ values, setValues ] = useState({
    dog: 0,
    duck: 0,
    bear: 0,
    mouse:0,
  });

  const totalScore = () => values.dog * 20 + values.duck * 20 + values.bear * 20 + values.mouse * 20

  return (
    <BoxStyle>
        <Header>隐藏({ totalScore() })</Header>
        <Space
            style={{
                width: '100%',
            }}
            direction="vertical"
        >
            <IntegerStep 
                name={'狗(20):'} 
                value={values.dog} 
                onChange={ value => setValues({ ...values, dog: value })}
            />
            <IntegerStep 
                name={'鸭(20):'}
                value={values.duck}
                onChange={ value => setValues({...values, duck: value })}
            />
            <IntegerStep 
                name={'熊(20):'}
                value={values.bear}
                onChange={ value => setValues({...values, bear: value })}
            />
            <IntegerStep 
                name={'鼠(20):'}
                value={values.mouse}
                onChange={ value => setValues({...values, mouse: value})}
            />
        </Space>
    </BoxStyle>
  )
}

