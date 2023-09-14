/*global chrome*/
import React, { useState } from 'react';
import '../App.css';
import '../TabLayout.css';
import downarrow from '../downarrow.png';
import ReactDOM from 'react-dom';
import {
  popToTop,
  Link,
} from 'react-chrome-extension-router';

function Header({ accountName ,setAccountName,setActivePublicKey,setActivePrivateKey,accountList,createAccount}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accounts, setAccounts] = useState([]);

  const [SelectOrCreate, setSelectOrCreate]=useState(0);
  const [AccountName,setinpuData] = useState  ('');
  const [newAccountName,setNewAccountName] = useState();
  const [header,setHeader]=useState();
  const [result,setResult]=useState();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  function setActiveAccountInfoes(name,publicKey,privateKey)
  {
    setAccountName(name);
    setActivePublicKey(publicKey);
    setActivePrivateKey(privateKey);
    closeModal();
    //window.location.reload();
  }

  function SelectAccount() {
    return (
      <div className="account_modal">
        
          <div className="account_modal-content">
            <div className='modal-header'>
            <h2 className='choose-account'>계정 선택</h2>
           
   
            <p className='account-cancel' onClick={() => closeModal()}>취소</p>
              </div>
            
            <div className='account-list'>
              <div onClick={() => setActiveAccountInfoes('producer3','EOS7SNLf2hqDae6jjUsPLDLxsqyyHbFq2TDKMZfNaf8WhgrPeuLE7','5HqSG47N4bvCEdQH6Cj3dEmEtXg6L2TJ7k1eFkcrLvME7LqLZ9E')}
               className='active-account_item'>
                
                <div className='account-left'>
                <div className='acc'>producer2</div>
                <div className='key'>0xxdfdfxdfxdfxdfxdfxdf</div>      
                </div>
                <div className='account-right'>
                  <div className='account-balance'>
                  100.0000HEP
                  </div>
                </div>
              </div>
              <div className='account_item' onClick={() => console.log(accountList)}>        
                <div className='account-left'>
                <div className='acc'>Account3</div>
                <div className='key'>0xxdfdfxdfxdfxdfxdfxdf</div>
                </div>
                <div className='account-right'>
                  <div className='account-balance'>
                  100.0000HEP
                  </div>
                </div>
              </div>
            </div>         
            <div className='add-account' onClick={(e) => setSelectOrCreate(1)}>
            + Add account
            </div>
          </div>
        </div>
    );
  }
  
  function makeNewAccount(newAccountName)
  {
    setSelectOrCreate(2);
    createAccount(newAccountName);
  }
  
    return (
      <div className='setting-bar'>
        <p className='accountHeader' onClick={openModal}>{accountName}</p><img onClick={openModal} src={downarrow} className="selectAccount" />
      {isModalOpen && SelectOrCreate===0 && <SelectAccount/>}
      
      {isModalOpen && SelectOrCreate===1 && (<div className="account_modal">
          <div className="account_modal-content-create">
            <div className='modal-header'>
            <h2 className='choose-account'>계정 생성</h2>
            <p className='account-cancel' onClick={() => setSelectOrCreate(0)}>취소</p>
            
              </div>
              <div className='inputDiv'>   
             
              <input className='general_input'  type='text' placeholder="계정 이름 입력" value={newAccountName} onChange={(e) => setNewAccountName(e.target.value)}/>
              </div>
              <button className='create_button' onClick={() => makeNewAccount(newAccountName)}>
            생성하기
          </button>
          </div>
          
          


        </div>)}
      {isModalOpen && SelectOrCreate===2 && (<div className="account_modal">
          <div className="account_modal-content-create">
            
          </div>
          
          


        </div>)}
      </div>
    );

     
  }





export default Header;