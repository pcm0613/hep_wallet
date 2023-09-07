/*global chrome*/
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
import Import_create_password from './import-create-password';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


function CircleText2(props) {

  return (
    <div className="circle-text-container">
           {props.words?.map((word, index) => (
            <div key={index} className="circle-text-item">
                <span className="circle-text-index">{index + 1}.</span>
                <input
                    className="circle-text-input"
                    type="text"
                    value={word}
                    onChange={event => props.handleWordChange(index, event.target.value)}
                />
            </div>
            
                           
          ))}
    </div>
  );
}


export default function Import_with_recovery_phrase() {

  const [recoveryWords, setRecoveryWords] = useState(Array(12).fill('')); // 12개의 빈배열로 설정
  
  const [isSomeInput, setIsSomeInput] = useState(false); // 사용자가 12개 중 일부를 입력했는지 판단하는 변수
  const [isAllInput, setIsAllInput] = useState(false); // 사용자가 12개를 모두 입력했는지 판단하는 변수
  const [isCorrect, setIsCorrect] = useState(false); // 사용자가 니모닉 검증을 완료했는지 알아내는 변수

  // input 데이터의 변화를 감지해서 니모닉을 새로 설정해주는 메서드
  const handleWordChange = (index, value) => {
    const newWords = [...recoveryWords];
    newWords[index] = value;

    console.log("기존 니모닉 : ",recoveryWords)
    console.log("입력 한 단어와 인덱스: ",value, index)

    setRecoveryWords(newWords);
  };


  // service-worker와 통신해 니모닉을 전달하는 메서드
  const handleInitMnemonic = () => {
    console.log("니모닉을 크롬 스토리지에 저장")
    chrome.runtime.sendMessage(
        { action: "mnemonic_init", mnemonic: recoveryWords}
    );
    goTo(Import_create_password);    
  };

  
  // 사용자가 니모닉 단어를 입력할 때마다 검증해주는 메서드.
  // api와의 통신을 통해 해당 니모닉이 적절한 니모닉인지 판단해준다.
  useEffect(() => {
    

    // 12개 모두 입력되지 않았다면
    const isAllEmpty = recoveryWords.every(word => word === "");
    if(isAllEmpty) {
        console.log("12개 모두 입력되지 않았다면")
        setIsSomeInput(false)
        setIsAllInput(false)
        return;
    }

    // 12개가 아직 모두 채워지지 않았다면
    const isSomeEmpty = recoveryWords.some(word => word === "");
    if(isSomeEmpty) {
        console.log("12개가 아직 모두 채워지지 않았다면")
        setIsSomeInput(true)
        setIsAllInput(false)
        return;
    }


    // 12개 모두 입력되었다면
    const isNotEmpty = recoveryWords.every(word => word !== "");
    if(isNotEmpty) {
        console.log("12개 모두 입력되었다면")
        confirmMnemonic();
        setIsSomeInput(false)
        setIsAllInput(true)
    }



    // 12개의 니모닉에 대해 검증을 해준 뒤, setIsCorrect 메서드를 통해 값을 true로 바꿔줘서 버튼을 활성화 시켜준다.
  }, [recoveryWords]);


  const confirmMnemonic = async () => {
    try {
      const response = await axios.post('http://221.148.25.234:3100/mnemonic_confirm', {mnemonic:recoveryWords.join(" ")});
      const isMnemonic = response.data.isMnemonic;
      console.log(isMnemonic);

      if (isMnemonic) {
        console.log("니모닉으로 타당함")
        setIsCorrect(true)
      } else {
        console.log("니모닉으로 타당하지 않음")
        setIsCorrect(false)
      }

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  
    return (
      <div className='card-container'>
        <Card className="text-center" style={{ width: '30rem' }}>
          <Card.Body>
            <h3 className='mb-4'>비밀 복구 구문 확인</h3>
            
            <Card.Text className='mb-5'>
            알바트로스는 사용자의 비밀번호를 복구할 수 없습니다. 사용자의 비밀 복구 구문을 이용하여 사용자의 소유권을 확인한 후, 지갑을 복구하고 새 비밀번호를 설정해드립니다.
            먼저 지갑을 생성할 때 받는 비밀 복구 구문을 입력하세요.
            </Card.Text>

            <div className="mb-3 d-flex justify-content-center align-items-center">
              <CircleText2 words={recoveryWords} handleWordChange={handleWordChange} />
            </div>

            {isSomeInput ? (
                <Card.Text className='mb-3'>
                12개의 비밀 복구 구문을 모두 입력해주세요.
                </Card.Text>
            ) : null}

            {isAllInput && !isCorrect ? (
                <Card.Text className='mb-3'>
                유효하지 않은 니모닉입니다.
                </Card.Text>
            ) : null}
                  
            <Button onClick={handleInitMnemonic} disabled={!isCorrect} className="mb-2 btn_primary card-content">비밀 복구 구문 확인</Button>     
          </Card.Body>
        </Card>
      </div>
    )
}