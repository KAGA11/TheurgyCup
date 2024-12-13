import styled from 'styled-components'
import { useSelector } from 'react-redux';

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
  const scores = useSelector(state => state.scores);
  const totalScore = Object.values(scores.left).reduce((a,b) => a + b, 0)
   + Object.values(scores.mid).reduce((a,b) => a + b, 0)

  return (
    <div style={{ flex: 1 }}>
        <BoxStyle >
            <Header>总分({totalScore})</Header>
        </BoxStyle>
    </div>
  )
}
