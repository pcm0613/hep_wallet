/*global chrome*/
import React from 'react';
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
import {Button, Card, Form} from 'react-bootstrap';
  
export default function Sign_request({choiceAccount}) {


    const handleRequestLogin = () => {
        
        chrome.runtime.sendMessage(
            { action: "login_request", account_name : choiceAccount.account_name, public_key : choiceAccount.publicKey}
        );
    };

    return (
        <div className='card-container'>
            <Card className="text-center" style={{ width: '100%', height: '100%'}}>
                <Card.Body>
                <div className="d-flex flex-column justify-content-between h-100" style={{ minHeight: '500px' }}>
                    <div>
                        <h3 className="mb-4">서명 요청</h3>
                        <Card.Text className="mb-5" style={{ fontSize: '14px'}}>요청하는 사이트를 신뢰하고 그 내용을 완전히 이해하는 경우에만 이 메시지에 서명하세요.</Card.Text>
                        <Card.Text className="mb-4" style={{ fontSize: '14px', textAlign: 'left'}}>
                            메시지 :
                            <br></br>
                            Crypto Explorer에 오신걸 환영합니다!
                            <br></br><br></br>
                            계정 정보에 대한 데이터를 요청합니다.
                            <br></br><br></br>
                            해당 요청은 아무런 비용도 청구하지 않습니다.
                        </Card.Text>
                    </div>
                    <div>
                        <div className='mb-3' style={{ fontSize: '12px' }}>
                            신뢰할 수 있는 사이트만 연결하세요.
                        </div>
                        <div className="d-flex justify-content-between">
                            <Button onClick={()=>{goBack()}} className="mx-2 btn_primary_outline card-content">이전</Button>
                            <Button onClick={handleRequestLogin} className="mx-2 btn_primary card-content">서명</Button>
                        </div>
                    </div>
                    
                </div>
                </Card.Body>
            </Card>
        </div>
    )
}
  