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
import Completion from '../completion';
import React, { useState, useEffect } from 'react';
import Make_account from './make-account';


function getRandomIndices(array, count) {
  const length = array.length;
  const indices = [];
  
  while (indices.length < count) {
    const index = Math.floor(Math.random() * length);
    if (!indices.includes(index)) {
      indices.push(index);
    }
  }
  
  return indices;
}


function CircleText2(props) {

  const selectedIndices = props.selectedWords.map(item => item.index);


  return (
    <div className="circle-text-container">
           {props.words?.map((word, index) => (
            
            selectedIndices.includes(index) ? (
              <div key={index} className="circle-text-confirm-item">
                <span className="circle-text-index">{index + 1}.</span>
    
                  <input
                    className="circle-text-input"
                    type="text"
                    value={word}
                    onChange={event => props.handleWordChange(index, event.target.value)}
                  />
              </div>
            ) : (
              <div key={index} className="circle-text-item">
                <span className="circle-text-index">{index + 1}.</span>
    
                  <input
                    className="circle-text-input"
                    type="text"
                    value={word}
                    readOnly
                  />
              </div>
              )
                           
          ))}
    </div>
  );
}


export default function Confirm_recovery_phrase(message) {

  const [recoveryWords, setRecoveryWords] = useState([]);
  const [confirmWords, setConfirmWords] = useState([]);
  const [selectedWords, setSelectedWords] = useState([]);
  
  const [isCorrect, setIsCorrect] = useState(false); // 사용자가 니모닉 검증을 완료했는지 알아내는 변수

  
  const handleInitMnemonic = async () => {
    console.log("니모닉을 크롬 스토리지에 저장")
    console.log(recoveryWords)
   
    // 1. 니모닉 저장 요청
    chrome.storage.local.set({user_mnemonic : recoveryWords}).then(async () => {
      const mnemonic_result = await chrome.storage.local.get(["user_mnemonic"]);
      console.log("mnemonic 저장..")
      console.log(mnemonic_result)
      goTo(Completion);
    });
            
  };

  const handleWordChange = (index, value) => {
    const newWords = [...confirmWords];
    newWords[index] = value;

    setConfirmWords(newWords);
  };



  // 전달받은 니모닉을 저장하고, 검증할 단어들을 추리는 작업
  useEffect(() => {
    const words = Object.values(message).slice(0, 12); // 전달받은 니모닉
    
    console.log("전달 받은 값 파싱 : ",words)
    setRecoveryWords(words); // 저장, 비동기적..

    const randomIndices = getRandomIndices(words, 3);
    const selected = randomIndices.map(index => {
      return {
        index: index,
        word: words[index]
      };
    });

    console.log("선택된 값들 : ",selected)
    setSelectedWords(selected); // 저장, 비동기적..


    const modifiedWords = [...words]; // words 배열을 복사하여 수정할 배열 생성
    selected.forEach(item => {
      if (item.index !== null) {
        modifiedWords[item.index] = ''; // 해당 인덱스의 값을 null로 변경
      }
    });

    console.log("유저가 맞추어야 될 값들 : ",modifiedWords)
    setConfirmWords(modifiedWords);

    

  }, [message]); // 이 부분에서 message가 변경될 때만 실행

  
  // 사용자가 니모닉 단어를 입력할 때마다 검증해주는 메서드
  useEffect(() => {
    
    if (recoveryWords.length === 0 || confirmWords.length === 0) {
      setIsCorrect(false);
      return;
    }

    const isEqual = recoveryWords.every((value, index) => value === confirmWords[index]);
    if(isEqual) {
      
      console.log("검증 통과!")
      console.log("오리지널 : ", recoveryWords)
      console.log("입력값 : ", confirmWords)
      setIsCorrect(true);
    }

  }, [confirmWords, recoveryWords]);

  
    

    return (
      <div className='card-container'>
        <Card className="text-center" style={{ width: '30rem' }}>
          <Card.Body>
            <h3 className='mb-2'>비밀 복구 구문 확인</h3>
            
            <Card.Text className='mb-5'>
            비밀 복구 구문 확인 
            </Card.Text>

            <div className="mb-5 d-flex justify-content-center align-items-center">
              <CircleText2 words={confirmWords} selectedWords={selectedWords} handleWordChange={handleWordChange} />
            </div>
                  
            <Button onClick={handleInitMnemonic} disabled={!isCorrect} className="mb-2 btn_primary card-content">확인</Button>     
            {/* <Button onClick={()=>goTo(Completion)} className="mb-2 btn_primary card-content">테스트</Button>      */}
          </Card.Body>
        </Card>
      </div>
    )
}