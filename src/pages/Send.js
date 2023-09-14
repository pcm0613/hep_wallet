import React, { useState } from 'react';
import '../App.css';
import xbutton from '../xbutton.png';
import logo from '../logo.PNG';
import {
  popToTop,
  Link,
} from 'react-chrome-extension-router';
import SearchAccount from './SearchAccount';
import App from '../Main'

const Send = ({AccountName,accountInfo,accountName,privateKey}) => {
  const [memo,setMemo] = useState('');
  const [send_amount,setSend_amount] = useState();
  const [result,setResult]=useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trx,setTrx]=useState();
  const [header,setHeader]=useState();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    popToTop();
  };
  const sendTokens = () => {
      const apiUrl = 'http://221.148.25.234:8989/sendTokens';
      
      // POST 요청에 사용할 데이터
      // nodejs서버에서 datas안에 accountName으로 받음
      const data = {
        datas: {
          senderPrivateKey: privateKey,
          senderName: accountInfo.account.account_name, // 실제 데이터 값
          receiverName: AccountName,
          quantity: send_amount+".0000",
          memo: memo,
        }
      };
      // POST 요청 보내기
      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setTrx(data.result)
        if(data.status ==='SUCCESS')
        {
          setResult("전송 완료 ID : "+data.result.transaction_id);
          setHeader("트랜잭션 성공");
        }else
        {
          setResult("전송 실패하였습니다.");
          setHeader("트랜잭션 실패");
        }
        openModal();
      })
        .catch(error => {
          console.error('Error posting data:', error);
          setResult("실패");
          openModal();
        });
    };

 
  return (
    <div className='sendDiv'>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>{header}</h2>
  
            <p className='result'>{result}</p>
            <button onClick={closeModal}>닫기</button>
          </div>
        </div>
      )}
      <div className='actionDiv'>
        <p className='sendTitle'>보내기</p>
      </div>
      <div className='accountDiv'>
        <p className='accountName'>{AccountName}</p>

        <Link component={SearchAccount}>
          <img src={xbutton} className='Xbutton' />
        </Link>
      </div>
      <div className='asset'>
        <p className='assetText'>
          잔고:
        </p>
        <div className='money'>
          <img src={logo} className='logo' />
          <p className='assetText_HEP'>
            {accountInfo.account.core_liquid_balance}
          </p>
        </div>
      </div>
      
      <div className='asset'>
        <p className='assetText'>
          금액:
        </p>
        <div className='money'>
          <input type='number' className='send_quantaty' placeholder="전송할 양 입력" value={send_amount} onChange={(e) => setSend_amount(e.target.value)}></input>
          <p className='assetText_HEP'>
            HEP
          </p>
        </div>
      </div>

      <div className='asset'>
        <p className='assetText'>
          메모:
        </p>
        <div className='money'>
          <input type='text' className='send_memo' placeholder="메모 입력" value={memo} onChange={(e) => setMemo(e.target.value)}></input>
          
        </div>
      </div>

      <div className='bottomDiv'>
          <button className='cancelButton' onClick={() => popToTop()} >
            취소
          </button>
          <button className='sendButton' onClick={() => sendTokens()}>
            전송   
          </button>
        
      </div>
      {/* 전송하는 함수 만들어서 넣어야 됨. 그리고 결과 보여주고 메인화면으로*/}
    </div>
    
  );
};

export default Send;