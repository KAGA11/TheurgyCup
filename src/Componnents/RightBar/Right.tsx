import styled from'styled-components';
import { useSelector } from'react-redux';
import { RootState } from '../../store';

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

const EventItem = styled.p`
  margin: 10px 0;
  padding: 5px;
  border-radius: 5px;
`;


// 扁平化处理对象的函数
const flattenObject = (
        // Record 代表对象类型，string 代表键的类型，string 代表值的类型 
        obj: Record<string, any>, 
        result: Record<string, any> = {}
    ) => {
        Object.entries(obj).forEach(([key, value]) => {
            if (typeof value === 'object' && value!== null) {
                flattenObject(value, result);
            } else {
                result[key] = value;
            }
        });
        return result;
};

export default function Right() {
    const scores = useSelector((state: RootState) => state.scores);
    const totalScore = scores? Object.values(scores.left).reduce((a, b) => a + b, 0) +
        Object.values(scores.mid).reduce((a, b) => a + b, 0) : 0;

    const events = useSelector((state: RootState) => state.events);
    const flattenedEvents = flattenObject(events);
    
    return (
        <div style={{ flex: 1 }}>
            <BoxStyle>
                <Header>总分({totalScore})</Header>
                {Object.entries(flattenedEvents).map(([key, value]) => (
                    <EventItem key={key}>{`${value}`}</EventItem>
                ))}
            </BoxStyle>
        </div>
    );
}