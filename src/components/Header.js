import React, { useState } from 'react';
import '../App.css';
import '../TabLayout.css';
import downarrow from '../downarrow.png';
import ReactDOM from 'react-dom';
// 
function Header({ accountName }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

    return (
      <div className='setting-bar'>
        <p className='accountHeader' onClick={openModal}>{accountName}</p><img onClick={openModal} src={downarrow} className="selectAccount" />
      {isModalOpen && (
        <div className="account_modal">
          <div className="account_modal-content">
            <h2 className='choose-account'>계정 선택</h2>
            <div className='account-list'>
              <div className='account_item'>
                <div>Account1</div>
                <div>0xxdfdfxdfxdfxdfxdfxdf</div>
              </div>
              Account1
            </div>

            
            <div className='add-account'>
            + Add account
            </div>
            <button onClick={closeModal}>닫기</button>
          </div>
          
        </div>
        
      )}

      </div>
    );
  }





export default Header;