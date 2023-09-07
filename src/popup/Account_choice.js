/*global chrome*/
import React, { useEffect, useState } from 'react';
import {
    goBack,
    goTo,
    popToTop,
    Link,
    Router,
    getCurrent,
    getComponentStack,
  } from 'react-chrome-extension-router';
  

import '../css/card.css'
import { Card, Button, Form} from 'react-bootstrap';
import Sign_request from './Sign_request';
  

function ShortenKey({ keyString }) {
    const maxLength = 10; // 원하는 최대 길이
  
    if (keyString.length <= maxLength) {
      return <span>{keyString}</span>;
    }
  
    const shortenedKey = `${keyString.substring(0, maxLength / 2)}...${keyString.substring(keyString.length - maxLength / 2)}`;
  
    return <span>({shortenedKey})</span>;
  }


  export default function Account_choice() {

    const [choiceAccount, setChoiceAccount] = useState('');
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {

        // 크롬 스토리지로부터 public key와 계정 이름의 목록을 가져온다.

        chrome.storage.local.get(['accounts'], (result) => {
            const storedData = result.accounts; 
            let updateData = [];
            updateData = storedData;
            
            setAccounts(updateData);
            console.log(updateData);           
          });


    }, [])

    const handleChoiceAccount = (account) => {
        setChoiceAccount(account);
    };

    const handleCloseLogin = () => {
        
        chrome.runtime.sendMessage(
            { action: "login_close"}
        );
    };
  
    return (
        <div className='card-container'>
            <Card className="text-center" style={{ width: '100%', height: '100%'}}>
                <Card.Body>
                <div className="d-flex flex-column justify-content-between h-100" style={{ minHeight: '500px' }}>
                    <div>
                        <h3 className="mb-4">Albatros로 연결</h3>
                        <Card.Text className="mb-4">계정 선택</Card.Text>
                        <div>
                        {accounts.map((account, index) => (
                            <Card key={index} className="mb-2">
                                <Card.Body className="d-flex align-items-center">
                                    <Form.Check name='radio_account' type="radio" onChange={()=>handleChoiceAccount(account)} checked={choiceAccount === account}/>
                                    <div className='mx-4 d-flex flex-column' style={{ fontSize: '14px', textAlign: 'left' }}>
                                        <div>
                                            {account.account_name} <ShortenKey keyString={account.publicKey} />
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        ))}
                        </div>
                    </div>
                    <div>
                        <div className='mb-3' style={{ fontSize: '12px' }}>
                            신뢰할 수 있는 사이트만 연결하세요.
                        </div>
                        <div className="d-flex justify-content-between">
                            <Button onClick={handleCloseLogin} className="mx-2 btn_primary_outline card-content">취소</Button>
                            <Button onClick={()=>{goTo(Sign_request, {choiceAccount})}} disabled={!choiceAccount} className="mx-2 btn_primary card-content">다음</Button>
                        </div>
                    </div>
                    
                </div>
                </Card.Body>
            </Card>
        </div>
    )
  }
  