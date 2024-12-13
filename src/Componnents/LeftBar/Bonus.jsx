import { useState } from 'react';
import { Col, InputNumber, Row, Slider, Space } from 'antd';
import styled from'styled-components';
import { useSelector, useDispatch } from'react-redux';
import { updateLeftScore } from '../../scoreSlice';

const BoxStyle = styled.div`
    padding:10px 30px;
    border: 1px solid #ccc;
    height: calc(30% - 10px);
    margin-bottom: 10px;
    border-radius: 10px;
    background-color: #fff;
`;

const Header = styled.h4`
    font-size: 18px;
    text-align: center;
    margin-bottom: 10px;
`;

const IntegerStep = ({ name, value, onChange }) => {
    return (
      <Row align="middle" style={{ marginBottom: '2px' }}>
        <Col span={6}  style={{ fontSize:'16px', display: 'inline-block' }} >
          <span>{name}</span>
        </Col>
        <Col span={10}>
          <Slider
            min={0}
            max={20}
            onChange={onChange}
            value={typeof value === 'number'? value : 0}
          />
        </Col>
        <Col span={2}>
          <InputNumber
            min={0}
            max={20}
            style={{
              margin: '0 16px',
            }}
            value={typeof value === 'number'? value : 0}
            onChange={onChange}
            defaultValue={0}
          />
        </Col>
     </Row>
    );
  };

export default function Bonus() {
    const [values, setValues] = useState({
        dog: 0,
        duck: 0,
        bear: 0,
        mouse: 0,
    });

    const dispatch = useDispatch();

    // 抽象出更新分数的函数
    const updateScore = (animal, newValue) => {
        setValues(prevValues => {
            const updatedValues = {
              ...prevValues,
                [animal]: newValue
            };
            const total = parseInt(Object.values(updatedValues).reduce((a, b) => a + b, 0) * 20);
            dispatch(updateLeftScore({
                category: 'bonus',
                score: total
            }));
            return updatedValues;
        });
    };

    return (
        <BoxStyle>
            <Header>隐藏({ useSelector((state) => state.scores.left.bonus) })</Header>
            <Space
                style={{
                    width: '100%',
                }}
                direction="vertical"
            >
                <IntegerStep
                    name={'狗(20):'}
                    value={values.dog}
                    onChange={value => updateScore('dog', value)}
                />
                <IntegerStep
                    name={'鸭(20):'}
                    value={values.duck}
                    onChange={value => updateScore('duck', value)}
                />
                <IntegerStep
                    name={'熊(20):'}
                    value={values.bear}
                    onChange={value => updateScore('bear', value)}
                />
                <IntegerStep
                    name={'鼠(20):'}
                    value={values.mouse}
                    onChange={value => updateScore('mouse', value)}
                />
            </Space>
        </BoxStyle>
    );
}