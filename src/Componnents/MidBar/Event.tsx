import { useState } from "react"
import styled from "styled-components"
import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { RootState } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { updateMidScore } from "../../scoreSlice";
import { updateEvent } from "../../eventSlice";

const BoxStyle = styled.div`
    padding:10px 30px;
    border: 1px solid #ccc;
    height: calc(70% - 10px);
    margin-bottom: 10px;
    border-radius: 10px;
    background-color: #fff;
    text-align: center;
`

const Header = styled.h4`
    font-size: 18px;
    text-align: center;
    margin-bottom: 10px;
`

interface EventCompProps {
    name: string;
    value: number;
    onChange: (value: number, checked: boolean, name: string) => void;
    disabled: boolean;
}

const EventComp: React.FC<EventCompProps> = ({ 
    name, 
    value, 
    onChange, 
    disabled 
}) => {
    const handleChange = (e: CheckboxChangeEvent) => {
        onChange(value, e.target.checked, name);
    };

    return (
        <div style={{ position: 'relative', marginBottom: '12px' }}>
            <span>{name} ({value})</span>
            <Checkbox
                style={{
                    position: 'absolute',
                    right: '0',
                }}
                name={name}
                onChange={handleChange}
                disabled={disabled}
            />
        </div>
    );
};

export default function Event() {
    const score = useSelector((state: RootState) => state.scores.mid.event);
    const dispatch = useDispatch();

    const [disabledStates, setDisabledStates] = useState<{ [key: string]: boolean }>({});

    const handleScoreChange = (value: number, checked: boolean, name: string) => {
        dispatch(updateMidScore({
            category: 'event',
            score: score + (checked? value : -value)
        }));
        dispatch(updateEvent(`紧急:${score + (checked? value : -value)}分`))

        // 更新禁用状态逻辑

        switch(name){
            case '[通关]神出鬼没':
                setDisabledStates((prev) => ({
                    ...prev,
                    '[无漏]神出鬼没': checked,
                }));
                break;

            case '[无漏]神出鬼没':
                setDisabledStates((prev) => ({
                    ...prev,
                    '[通关]神出鬼没': checked,
                }));
                break;
            case '[通关]建制':
                setDisabledStates((prev) => ({
                    ...prev,
                    '[无漏]建制': checked,
                }));
                break;

            case '[无漏]建制':
                setDisabledStates((prev) => ({
                    ...prev,
                    '[通关]建制': checked,
                }));
                break;

            default:
                break;
        }


    };

    return (
        <BoxStyle>
            <Header>事件({score})</Header>
            <EventComp
                name={'离歌的庭院'}
                value={40}
                onChange={handleScoreChange}
                disabled={disabledStates['离歌的庭院']}
            />
            <EventComp
                name={'赴敌者'}
                value={40}
                onChange={handleScoreChange}
                disabled={disabledStates['赴敌者']}
            />
            <EventComp
                name={'王冠之下'}
                value={40}
                onChange={handleScoreChange}
                disabled={disabledStates['王冠之下']}
            />
            <EventComp
                name={'混沌'}
                value={30}
                onChange={handleScoreChange}
                disabled={disabledStates['混沌']}
            />
            <EventComp
                name={'[通关]神出鬼没'}
                value={30}
                onChange={handleScoreChange}
                disabled={disabledStates['[通关]神出鬼没']}
            />
            <EventComp
                name={'[无漏]神出鬼没'}
                value={50}
                onChange={handleScoreChange}
                disabled={disabledStates['[无漏]神出鬼没']}
            />
            <EventComp
                name={'[通关]建制'}
                value={50}
                onChange={handleScoreChange}
                disabled={disabledStates['[通关]建制']}
            />
            <EventComp
                name={'[无漏]建制'}
                value={70}
                onChange={handleScoreChange}
                disabled={disabledStates['[无漏]建制']}
            />
            <EventComp
                name={'神圣的渴求'}
                value={40}
                onChange={handleScoreChange}
                disabled={disabledStates['神圣的渴求']}
            />
            <EventComp
                name={'谋求共识'}
                value={50}
                onChange={handleScoreChange}
                disabled={disabledStates['谋求共识']}
            />
            <EventComp
                name={'外道'}
                value={70}
                onChange={handleScoreChange}
                disabled={disabledStates['外道']}
            />
            <EventComp
                name={'洞天福地'}
                value={90}
                onChange={handleScoreChange}
                disabled={disabledStates['洞天福地']}
            />
            <EventComp
                name={'未进入任何树洞'}
                value={150}
                onChange={handleScoreChange}
                disabled={disabledStates['未进入任何树洞']}
            />
        </BoxStyle>
    );
}
