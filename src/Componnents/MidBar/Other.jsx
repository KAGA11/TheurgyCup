import styled from "styled-components";
import { Input } from "antd";

import { useSelector, useDispatch } from "react-redux";
import { updateMidScore } from "../../scoreSlice";

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
  const score = useSelector((state) => state.scores.mid.other );
  const dispatch = useDispatch()

  const handleTotalScore = () => {
    let input1 = document.getElementById('inputCangPin').value
    let input2 = document.getElementById('inputXiuZheng').value

    const totalScore = parseInt(input1 * 5) + parseInt(input2)

    dispatch(updateMidScore({ 
      category: 'other', 
      score: isNaN(totalScore) ? 0 : totalScore 
    }));    
  }

  return (
    <BoxStyle>
      <Header>其他({score})</Header>
        <Input id="inputCangPin" size="large" addonBefore={'藏品(5)'} placeholder="藏品数量" onChange={handleTotalScore}
            defaultValue={0}
        />
        <br />
        <br />
        <Input id="inputXiuZheng"size="large" addonBefore={'修正分'} onChange={handleTotalScore}
               defaultValue={0}
        />
    </BoxStyle>
  );
}
