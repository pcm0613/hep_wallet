import {
    goBack,
    goTo,
    popToTop,
    Link,
    Router,
    getCurrent,
    getComponentStack,
  } from 'react-chrome-extension-router';

import '../../css/card.css'
import {Button, Card, Form, InputGroup} from 'react-bootstrap';
import Confirm_recovery_phrase from './confirm-recovery-phrase';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

function CircleText(props) {
    return (
      <div className="circle-text-container">
             {props.words?.map((word, index) => (
              
              <div key={index} className="circle-text-item">
                <span className="circle-text-index">{index + 1}.</span>
                <input
                  className="circle-text-input"
                  type="text"
                  value={word}
                  readOnly/>
              </div>        
              
            ))}
      </div>
    );
  }


export default function Review_recovery_phrase2() {

  const [recoveryWords, setRecoveryWords] = useState([]);

  useEffect(() => {
    // 컴포넌트가 처음 렌더링될 때 데이터 가져오기
    fetchData();
  }, []);


  const fetchData = async () => {
    try {
      const response = await axios.post('http://221.148.25.234:3100/mnemonic_create');
      const mnemonicArray = response.data.mnemonic.split(' ');
      console.log(mnemonicArray);
      setRecoveryWords(mnemonicArray);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  console.log("이 부분은 postData랑 독립적으로 실행된다.");


  return (
  <div className='card-container'>
    <Card className="text-center" style={{ width: '30rem' }}>
      <Card.Body>
        <h3 className='mb-2'>비밀 복구 구문 기록</h3>
        
        <Card.Text className='mb-4'>
        12단어의 비밀 복구 구문을 기록하고 본인만 접근 가능한 믿을만한 장소에 저장하세요.
        </Card.Text>

        <div className='li_div'>
          <span style= {{marginLeft:'0.6rem'}}>팁:</span>            
          <ul>
            <li>비밀번호 관리자에 저장</li>
            <li>대여 금고에 보관</li>
            <li>적어서 여러 비밀 장소에 보관하세요.</li>
          </ul>
        </div>

        <div className="mb-5 d-flex justify-content-center align-items-center">
          <CircleText words={recoveryWords} />
        </div>

        
          
      
        <Button onClick={() => goTo(Confirm_recovery_phrase, recoveryWords)} className="mb-2 btn_primary card-content">다음</Button>     
      </Card.Body>
    </Card>
  </div>
  )
}