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
import Review_recovery_phrase2 from './review-recovery-phrase2';


function CircleText(props) {
    return (
      <div className="circle-text-container">
        
            {props.words.map((word, index) => (
            <div key={index} className="circle-text-item blurred">
                {word}
            </div>
            ))}
            <div className='warning-text'>다른 사람이 이 화면을 보고 있지 않은지 확인하세요.</div>
      </div>
    );
  }


export default function Review_recovery_phrase1() {

    const recoveryWords = [
        'word1', 'word2', 'word3', 'word4',
        'word5', 'word6', 'word7', 'word8',
        'word9', 'word10', 'word11', 'word12',
      ];


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

          
           
                
          <Button onClick={() => goTo(Review_recovery_phrase2)} className="mb-2 btn_primary card-content">비밀 복구 구문 공개</Button>     
        </Card.Body>
      </Card>
    </div>
    )
}