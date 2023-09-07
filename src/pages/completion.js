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
import Welcome from './welcome';
import Make_account from './wallet_create/make-account';

export default function Completion() {

    return (
        <div className='card-container'>
            <Card className="text-center" style={{ width: '30rem'}}>
                <Card.Body>
                    <h3 className='mb-2'>지갑 생성 성공</h3>
                    <Card.Text className='mb-4'>
                    지갑을 성공적으로 보호했습니다. 비밀 복구 구문을 안전하게 비밀로 유지하세요. 이는 귀하의 책임입니다.
                    </Card.Text>
                                     
                    <div className='li_div'>
                        <span style= {{marginLeft:'0.6rem'}}>참고:</span>            
                        <ul>
                        <li>알바트로스는 비밀 복구 구문을 복구할 수 없습니다.</li>
                        <li>알바트로스는 비밀 복구 구문을 절대 묻지 않습니다.</li>
                        <li>누군가와 비밀 복구 구문을 절대 공유하지 마세요. 또는 귀하의 자금을 도난당할 위험이 있습니다.</li>
                        </ul>
                    </div>
                   

                    <Button onClick={() => goTo(Make_account)} className="mb-2 btn_primary card-content">확인했습니다</Button>
                </Card.Body>
            </Card>
        </div>
    )
}