import styled from 'styled-components';
import { Image, Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import avatarFulai from '../../assets/avatar_FuLai.jpg'; 
import avatarKuiLong from '../../assets/avatar_KuiLong.jpg'; 
import avatarTeLei from '../../assets/avatar_TeLei.jpg'; 
import { useEffect, useState } from 'react';
import { RootState } from '../../store';
import { useSelector,useDispatch } from 'react-redux';
import { updateLeftScore } from '../../scoreSlice';
import { updateEnd } from '../../eventSlice';

const BoxStyle = styled.div`
  padding: 10px 30px;
  border: 1px solid #ccc;
  height: calc(30% - 10px);
  margin-bottom: 10px;
  border-radius: 10px;
  background-color: #fff;
`;

const Header = styled.h4`
  font-size: 18px;
  text-align: center;
  margin-bottom: 2px;
`;

// 选中<思维矫正>checkbox获得170分，同时选中混乱checkbox获得180分
// 选中<紧急授课>checkbox获得40分，同时选中混乱checkbox获得50分;

// 选中<魂灵朝谒>checkbox获得200分，同时选中混乱checkbox获得220分;
// 选中<朝谒>checkbox获得100分，同时选中混乱checkbox获得110分;

// 通关<授法>checkbox获得100分，同时选中混乱checkbox获得130分，同时击杀奎隆时获得700分;
// 若将五名于员运送至3阶段奎降时获得100储备分，击杀奎隆失败则获得此积分，击杀奎隆成功则储备分失效;

// 如果选中「滚动先祖」checkbox并通关<授法>获得140分，思维混乱时通关获得160分:击杀奎隆时获得800分，
// 若将五名干员运送至3阶段奎隆时获得120储备分，击杀奎隆失败则获得此积分，击杀奎隆成功则储备分失效。

const situation: Record<string,number> = {
    // 有滚动先祖
    "Ancestors:Chaos_Killed": 960, // 混乱160 + 击杀800
    "Ancestors:Chaos_Eat_Five": 280, //混乱160 + 储备120
    "Ancestors:Chaos_Eat_NotFive": 160, //混乱160
    "Ancestors:NotChaos_Killed": 940, //不混乱140 + 击杀800
    "Ancestors:NotChaos_Eat_Five": 260, //不混乱140 + 储备120
    "Ancestors:NotChaos_Eat_NotFive": 140, //不混乱140
    // 无滚动先祖
    "Base:Chaos_Killed": 830,  //混乱130 + 击杀700
    "Base:Chaos_Eat_Five": 230, //混乱130 + 储备100
    "Base:Chaos_Eat_NotFive":130, //混乱130
    "Base:NotChaos_Killed": 800, //100 + 击杀700 
    "Base:NotChaos_Eat_Five": 200, //不混乱100 + 储备100
    "Base:NotChaos_Eat_NotFive": 100, //不混乱100
}
  

export default function Jiejv() {
  const [ FuLaiScore, setFuLaiScore ] = useState(0);
  const [ FuLaiDis, setFuLaiDis ] = useState([false,false,false]);

  const [ TeLeiScore, setTeLeiScore ] = useState(0);
  const [ TeLeiDis, setTeLeiDis ] = useState([false,false,false]);

  const [ KuiLongScore, setKuiLongScore ] = useState(0);
  const [ KuiLongDis, setKuiLongDis ] = useState([false,false,false,false])

  const dispatch = useDispatch();
  const score = useSelector((state:RootState) => state.scores.left.jiejv);

  const getCheckboxChecked = (checkboxName: string): boolean => {
    const element = document.getElementsByName(checkboxName)[0] as HTMLInputElement | undefined;
    return element?.checked || false;
  };

  const handleFuLaiCheckboxChange = (event: CheckboxChangeEvent) => {
    const { name, checked } = event.target;
    let newScore = FuLaiScore;
    const newDis = [...FuLaiDis]; 

    switch (name) {
        case '混乱1':
          if (getCheckboxChecked('思维矫正')) {
            newScore = checked ? 180 : 170;
          }
          if (getCheckboxChecked('紧急授课')) {
            newScore = checked ? 50 : 40;
          }
          break;

          case '紧急授课':
            newScore = checked ? 40 : 0;
            if (getCheckboxChecked('混乱1')) {
              newScore = checked ? 50 : 0;
            }
            newDis[2] = checked;
            break;
      
          case '思维矫正':
            newScore = checked ? 170 : 0;
            if (getCheckboxChecked('混乱1')) {
              newScore = checked ? 180 : 0;
            }
            newDis[1] = checked;
            break;
        default:
          break;
    }

    setFuLaiScore(newScore);
    setFuLaiDis(newDis)
  };

  const handleTeLeiCheckboxChange = (event:CheckboxChangeEvent) => {
    const { name, checked } = event.target;
    let newScore = TeLeiScore;
    const newDis = [...TeLeiDis];

    switch (name) {
        case '混乱2':
          if (getCheckboxChecked('朝谒')) {
                newScore = checked ? 110 : 100;
          }

          if (getCheckboxChecked('魂灵朝谒')) {
            newScore = checked ? 220 : 200;
          }
          break;

        case '朝谒':
          newScore = checked ? 100 : 0;
          if (getCheckboxChecked('混乱2')) {
            newScore = checked ? 110 : 0;
          }
          checked ? newDis[2] = true : newDis[2] = false
          break;

        case '魂灵朝谒':
          newScore = checked ? 200 : 0;
          if (getCheckboxChecked('混乱2')) {
            newScore = checked ? 220 : 0;
          }
          checked ? newDis[1] = true : newDis[1] = false
          break;
    
        default:
          break;
    }

    setTeLeiScore(newScore);
    setTeLeiDis(newDis)
  };

  const handleKuiLongCheckboxChange = (event:CheckboxChangeEvent) => {
        // 状态变量
        const { name, checked } = event.target;
        let newScore = 0;
        const newDis = [...KuiLongDis];

        // 授法控制是否过关
        let isSuccess = getCheckboxChecked('授法')

        // 更新禁用状态
        if (name === '击杀奎隆') {
            checked ? newDis[3] = true : newDis[3] = false
            if (checked && !isSuccess) {
              newDis[1] = true
              isSuccess = true
            }
        }

        if (name === '授法') {
          checked ? newDis[1] = true : newDis[1] = false
        }
    
        if (name === '运送五名干员') {
            checked ? newDis[2] = true : newDis[2] = false
        }

        // Ancestors:Chaos_Killed
        const isAncestor = getCheckboxChecked('滚动先祖');
        const mode = isAncestor ? "Ancestors" : "Base";

        const isChaos = getCheckboxChecked('混乱3');
        const chaos = isChaos? "Chaos" : "NotChaos";

        const isKilled = getCheckboxChecked('击杀奎隆');
        const killed = isKilled ? "Killed" : "NotKilled";

        const isFive = getCheckboxChecked('运送五名干员');
        const fiveStatus = isFive ? "Eat_Five" : "Eat_NotFive";

        const scenarioKey = `${mode}:${chaos}_${isKilled ? killed : fiveStatus}`;

        console.log(scenarioKey);
        console.log(situation[scenarioKey] );
        
        // 根据情境获取分数
        if (isSuccess) {
            newScore = situation[scenarioKey] || 0;   
        }else{
            newScore = 0
        }
    
        setKuiLongScore(newScore);
        setKuiLongDis(newDis);
  };


  useEffect(()=>{
    const totalScore = FuLaiScore + TeLeiScore + KuiLongScore
    dispatch(updateLeftScore({
        category: 'jiejv',
        score: totalScore
    }));
    dispatch(updateEnd(`结局: ${totalScore}分`))
  },[FuLaiScore, TeLeiScore, KuiLongScore,dispatch])
    
  return (
    <BoxStyle style={{ height: 'calc(40% - 10px)' }}>
      <Header>结局({ score })</Header>
      <div style={{ display: 'flex', justifyContent:'center', gap:'10px' }}>
        {/* 老登 */}
        <div style={{ flex: 1 }} >
            <Image preview={false} src={avatarFulai} width={100}/> 
            <br />
            <Checkbox 
                style={{ margin:'15px 0 5px 0' }}
                name="混乱1"
                onChange={handleFuLaiCheckboxChange}
            >
                <strong>混乱(黄条)</strong>
            </Checkbox>
            <br />
            <Checkbox 
                style={{ margin:'15px 0 5px 0' }}
                name="紧急授课"
                onChange={handleFuLaiCheckboxChange}
                disabled={FuLaiDis[1]}
            >
                紧急授课
            </Checkbox>
            <br />
            <Checkbox 
                style={{ margin:'15px 0 5px 0' }}
                name="思维矫正"
                onChange={handleFuLaiCheckboxChange}    
                disabled={FuLaiDis[2]}
            >
                思维矫正(异格)
            </Checkbox>
        </div>

        {/* 大特 */}
        <div style={{ flex: 1 }} >
            <Image preview={false} src={avatarTeLei} width={100}/>
            <br />
            <Checkbox 
                style={{ margin:'15px 0 5px 0' }}
                name="混乱2"
                onChange={handleTeLeiCheckboxChange}
            >
                <strong>混乱(黄条)</strong>
            </Checkbox>
            <br />
            <Checkbox 
                style={{ margin:'15px 0 5px 0' }}
                name="朝谒"
                onChange={handleTeLeiCheckboxChange}
                disabled={TeLeiDis[1]}
            >
                朝谒
            </Checkbox>
            <br />
            <Checkbox 
                style={{ margin:'15px 0 5px 0' }}
                name="魂灵朝谒"
                onChange={handleTeLeiCheckboxChange}
                disabled={TeLeiDis[2]}    
            >
                魂灵朝谒(异格)
            </Checkbox>
        </div>

        {/* 奎隆 */}
        <div style={{ flex: 1 }} >
            <Image preview={false} src={avatarKuiLong} width={100}/>
            <br />
            <Checkbox 
                name="混乱3"
                onChange={handleKuiLongCheckboxChange}
                style={{ margin:'5px 0 5px 0' }}
            >
                <strong>混乱(黄条)</strong>
            </Checkbox>
            <br />
            <Checkbox 
                style={{ margin:'5px 0 5px 0' }}
                name="授法" 
                onChange={handleKuiLongCheckboxChange}
                checked={KuiLongDis[1]}
            >
                授法
            </Checkbox>
            <br />
            <Checkbox 
                style={{ margin:'5px 0 5px 0' }}
                name="击杀奎隆"
                onChange={handleKuiLongCheckboxChange}    
                disabled={KuiLongDis[2]}
            >
                击杀奎隆
            </Checkbox>
            <br />
            <Checkbox 
                style={{ margin:'5px 0 5px 0' }}
                name="运送五名干员"
                onChange={handleKuiLongCheckboxChange}
                disabled={KuiLongDis[3]}
            >
                运送五名干员
            </Checkbox>
            <br />
            <Checkbox 
                style={{ margin:'5px 0 5px 0' }}
                name="滚动先祖"
                onChange={handleKuiLongCheckboxChange}
            >
                滚动先祖
            </Checkbox>
            <br />
        </div>
      </div>
    </BoxStyle>
  );
}
