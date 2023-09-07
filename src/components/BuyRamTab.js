import React, { useState } from 'react';
import '../App.css';
import {
    popToTop,
  } from 'react-chrome-extension-router';



const BuyRamTab=({setRAM_buy})=>{

    const [RAM_amount, setRAM_amount] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [header,setHeader]=useState();
    const [result,setResult]=useState();
    const [trx,setTrx]=useState();
    const openModal = () => {
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
        popToTop();
      };


      
    

      const buyRam = () => {
        const apiUrl = 'http://221.148.25.234:8989/buyRam';
        
        // POST 요청에 사용할 데이터
        // nodejs서버에서 datas안에 accountName으로 받음
        
        const data = {
          datas: {
            privateKey: '5JwpGuCc1y63xDe6TPxZzf9NJLqGj5eYNTwttVifcqTPxmbyR1Z',
            accountName: 'producer1', // 실제 데이터 값
            quantity: RAM_amount
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
            setResult("트랜잭션 성공 ID : "+data.result.transaction_id);
            setHeader("램구매 완료");
          }else
          {
            setResult("램구매를 실패하였습니다.");
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
    return(
      <div className='StakingTabDiv'>
        {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>{header}</h2>
  
            <p className='result'>{result}</p>
            <button onClick={closeModal}>닫기</button>
          </div>
        </div>
      )}
        <div className='AmountDiv'>
          <input type='number' className='AmountInput' value={RAM_amount} onChange={(e) => setRAM_amount(e.target.value)} 
                onBlur={(e) => setRAM_buy(e.target.value)} placeholder="Amount of RAM to Buy(HEP)"></input>
          <p className='symbol'>
            HEP
          </p>
        </div>
        <div className='blank'></div> 
        <div className='bottomDiv'>
          <button className='sendButton' onClick={() => buyRam()}>
            구매
            {/* 전송하는 함수 만들어서 넣어야 됨. 그리고 결과 보여주고 메인화면으로*/}
          </button>
      </div>
      </div>
    );
  };

  
  export default BuyRamTab;