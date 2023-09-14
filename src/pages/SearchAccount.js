import React, { useState } from 'react';
import App from '../Main';
import Send from './Send'
import '../App.css';
import {
  popToTop,
  Link,
} from 'react-chrome-extension-router';



const SearchAccount = ({accountInfo,accountName,privateKey}) => {

  
  const [AccountName,setinpuData] = useState('');

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };
  
  const handleSearch = async() => {
    //노드서버에서 계정리스트들 불러와야됨
  };


  
  return (
    <div className='searchAccount'>
        <div className='actionDiv'>
          <p className='actionTitle'>보낼 계정</p>
          <p className='cancel' onClick={() => popToTop()}>취소</p>
        </div>
        <div className='inputDiv'>
          <input className='general_input' onKeyDown={handleKeyPress} type='text' placeholder="계정 입력" value={AccountName} onChange={(e) => setinpuData(e.target.value)}/>
        </div>
        <div className='recently'>
          최근송금한 계정
        </div>
        <div className='bottomDiv'>
          <Link className="link" component={Send} props={{AccountName,accountInfo,accountName,privateKey}}>
          <button className='confirm_button'>
            확인
          </button>
          </Link>
        </div>

      

      </div>

  );
};

export default SearchAccount;