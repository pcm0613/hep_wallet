import {
    goBack,
    goTo,
    popToTop,
    Link,
    Router,
    getCurrent,
    getComponentStack,
  } from 'react-chrome-extension-router';
import React, { useState } from 'react';

import Create_password from './wallet_create/create-password';
import Import_recovery_phrase from './wallet_import/import-with-recovery-phrase';


import '../css/card.css'
import {Button, Card, Form} from 'react-bootstrap';
import Logo from '../assets/eagle.jpg';
import Review_recovery_phrase1 from './wallet_create/review-recovery-phrase1';

export default function Welcome() {

    const [agreementChecked, setAgreementChecked] = useState(false); // State to track the agreement checkbox

    const handleAgreementChange = () => {
        setAgreementChecked(!agreementChecked); // Toggle the checkbox state
    };

    return (
        <div className='card-container'>
            <Card className="text-center" style={{ width: '30rem'}}>
                <Card.Body>
                    <h3 className='mb-2'>시작하기</h3>
                    <Card.Text className='mb-4'>
                        알바트로스는 EOSIO 기반 블록체인이 Web3의 세계에 접근할 수 있도록 하는 안전한 지갑입니다.
                    </Card.Text>

                    <Card.Img className='mb-5 card-content' variant="top" src={Logo} />
                                     
                    <div className='form_check_div'>
                        <Form className='mx-5 mb-2'>
                            <Form.Check className='mx-2 my-input' aria-label="option 1" label="알바트로스의 이용약관에 동의합니다."
                            checked={agreementChecked}
                            onChange={handleAgreementChange}
                             />
                        </Form>
                    </div>
                   
                    <Button onClick={() => goTo(Create_password)} className="mb-2 btn_primary card-content" disabled={!agreementChecked}>새 지갑 생성</Button>
                    <Button onClick={() => goTo(Import_recovery_phrase)} className="mb-2 btn_primary_outline card-content" disabled={!agreementChecked}>기존 지갑 가져오기</Button>
                </Card.Body>
            </Card>
        </div>
    )
}