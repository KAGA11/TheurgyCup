import { useState } from 'react'
import { Col, InputNumber, Row, Slider, Space } from 'antd';
import styled from'styled-components'
import { RootState } from '../../store';
import { useSelector, useDispatch } from 'react-redux';
import { updateLeftScore } from '../../scoreSlice';
import { updateRecruitment } from '../../eventSlice';

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

interface IntegerStepProps {
    name: string;
    value: number;
    onChange: (value: number) => void;
  }

const IntegerStep:React.FC<IntegerStepProps> = ({ name, value, onChange }) => {
    return (
      <Row align="middle" style={{ marginBottom: '15px' }}>
        <Col span={6}  style={{ fontSize:'18px', display: 'inline-block' }} >
          <span>{name}</span>
        </Col>
        <Col span={10}>
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
            onChange={(val) => onChange(val || 0)}
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
  const score = useSelector((state:RootState) => state.scores.left.linshi);
  const dispatch = useDispatch();

  const updateScore = (Star:string, newValue:number) => {
    setValues(prevValues => {
        const updatedValues = {
          ...prevValues,
            [Star]: newValue
        };
        const total = updatedValues.sixStar * 50 + updatedValues.fiveStar * 20 + updatedValues.fourStar * 10;
        dispatch(updateLeftScore({
            category: 'linshi',
            score: total
        }));
        dispatch(updateRecruitment(`临招: ${total}分`))
        return updatedValues;
    });
  };

  return (
    <BoxStyle>
        <Header>临时招募({ score })</Header>
        <Space
            style={{
                width: '100%',
            }}
            direction="vertical"
        >
            <IntegerStep 
                name={'六星(50):'} 
                value={values.sixStar} 
                onChange={ value => updateScore('sixStar', value)}
            />
            <IntegerStep 
                name={'五星(20):'}
                value={values.fiveStar}
                onChange={ value => updateScore('fiveStar', value)}
            />
            <IntegerStep 
                name={'四星(10):'}
                value={values.fourStar}
                onChange={ value => updateScore('fourStar', value)}
            />
        </Space>
    </BoxStyle>
  )
}
