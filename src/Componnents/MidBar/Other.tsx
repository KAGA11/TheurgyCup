import styled from "styled-components";
import { Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { updateMidScore } from "../../scoreSlice";
import { updateCollections, updateSettlement } from "../../eventSlice";
import { useEffect, useState } from "react";

const BoxStyle = styled.div`
  padding: 10px 30px;
  border: 1px solid #ccc;
  height: calc(30% - 10px);
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

export default function Other() {
  const score = useSelector((state: RootState) => state.scores.mid.other);
  const dispatch = useDispatch();

  // 使用状态管理输入值
  const [inputCangPin, setInputCangPin] = useState<string>('0');
  const [inputXiuZheng, setInputXiuZheng] = useState<string>('0');

  useEffect(()=>{
    const cangPinValue = parseInt(inputCangPin || '0');
    const xiuZhengValue = parseInt(inputXiuZheng || '0');
    const totalScore = cangPinValue * 5 + xiuZhengValue;

    dispatch(updateMidScore({
      category: 'other',
      score: isNaN(totalScore) ? 0 : totalScore,
    }));

    if (cangPinValue >= 0) {
      dispatch(updateCollections(`藏品: ${cangPinValue * 5}分`));
    }

    if (xiuZhengValue >= 0) {
      dispatch(updateSettlement(`结算分: ${xiuZhengValue}分`));
    }
  },[inputCangPin,inputXiuZheng,dispatch])

  return (
    <BoxStyle>
      <Header>其他({score})</Header>
      <Input
        id="inputCangPin"
        size="large"
        addonBefore={'藏品(5)'}
        placeholder="藏品数量"
        value={inputCangPin}
        onChange={(e) => {
          setInputCangPin(e.target.value);
        }}
      />
      <br />
      <br />
      <Input
        id="inputXiuZheng"
        size="large"
        addonBefore={'结算分'}
        placeholder="游戏结算分"
        value={inputXiuZheng}
        onChange={(e) => {
          setInputXiuZheng(e.target.value);
        }}
      />
    </BoxStyle>
  );
}
