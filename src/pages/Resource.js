import React from 'react';
import '../App.css';
import logo from '../logo.PNG';
import xbutton from '../xbutton.png';
import goback from '../goback.png';
import { useState } from 'react';
import {
  popToTop,
  Link,
} from 'react-chrome-extension-router';
import StakingTab from '../components/StakingTab';
import UnStakingTab from '../components/UnstakingTab';
import BuyRamTab from '../components/BuyRamTab';
import SellRamTab from '../components/SellRamTab';

import PercentageCircle from '../components/PercentageCircle';

const Resource = ({accountInfo,hep_integer,ram_amount,accountName,privateKey}) => {

  var CPU_staking_amount=0.0000;
  var NET_staking_amount=0.0000;
  var CPU_unstaking_amount=0;
  var NET_unstaking_amount=0;
  var RAM_buy_amount=0;
  var RAM_sell_amount=0;

  const [tabContents, setTabContents] = useState([[], []]);
  const [CpuOrRam, setCpuOrRam] = useState(0);
  const [StakingOrUns, setStakingOrUns] = useState(0);
  const [BuyOrSell, setBuyOrSell] = useState(0);
  

  const tabName = ['CPU/NET', 'RAM'];
  const tabName2 = ['스테이킹', '언스테이킹'];
  const tabName3 = ['구매', '판매'];
  const handleTabClick = (index) => {
    setCpuOrRam(index);
  };
  const handleTabClick2 = (index) => {
    setStakingOrUns(index);
  
  };
  const handleTabClick3 = (index) => {
    setBuyOrSell(index);
  };

  const RAM_Tab = () => {
    return (
      <div className="tab-layout">
          <div className="tab-menu">
            {tabContents.map((content, index) => (
              <div
                key={index}
                className={`tab-item ${BuyOrSell === index ? 'active' : ''}`}
                onClick={() => handleTabClick3(index)}
              >
                {tabName3[index]}
              </div>
            ))}
          </div>
          <div className="tab-content">
            {tabContents.map((content, index) => (
              <div
                key={index}
                className={`tab-content-item ${BuyOrSell === index ? 'active' : ''}`}
              >
                {index === 0 && <BuyRamTab setRAM_buy={setRAM_buy} accountName={accountName} privateKey={privateKey}/>}
                {index === 1 && <SellRamTab setRAM_sell={setRAM_sell} accountInfo={accountInfo} accountName={accountName} privateKey={privateKey}/>}

                
              </div>
            ))
            }
          </div>
        </div>
    );
  };

  function setCPU_staking(amount)
  {
    CPU_staking_amount=amount;
    console.log("received CPU_staking_amount : "+CPU_staking_amount);
  }
  function setNET_staking(amount)
  {
    NET_staking_amount=amount;
    console.log("received NET_staking_amount : "+NET_staking_amount);
  }
  function setCPU_unstaking(amount)
  {
    CPU_unstaking_amount=amount;
    console.log("received CPU_unstaking_amount : "+CPU_unstaking_amount);
  }
  function setNET_unstaking(amount)
  {
    NET_unstaking_amount=amount;
    console.log("received NET_unstaking_amount : "+NET_unstaking_amount);
  }

  function setRAM_buy(amount)
  {
    RAM_buy_amount=amount;
    console.log("received RAM_buy_amount : "+RAM_buy_amount);
  }

  function setRAM_sell(amount)
  {
    RAM_sell_amount=amount;
    console.log("received RAM_sell_amount : "+RAM_sell_amount);
  }



  const CPUNET_Tab = () => {
    return (
      <div className="tab-layout">
          <div className="tab-menu">
            {tabContents.map((content, index) => (
              <div
                key={index}
                className={`tab-item ${StakingOrUns === index ? 'active' : ''}`}
                onClick={() => handleTabClick2(index)}
              >
                {tabName2[index]}
              </div>
            ))}
          </div>
          <div className="tab-content">
            {tabContents.map((content, index) => (
              <div
                key={index}
                className={`tab-content-item ${StakingOrUns === index ? 'active' : ''}`}
              >
                {index === 0 && <StakingTab setCPU_staking={setCPU_staking} setNET_staking={setNET_staking} hep_integer={hep_integer} accountName={accountName} privateKey={privateKey}/>}
                {index === 1 && <UnStakingTab setCPU_unstaking={setCPU_unstaking} setNET_unstaking={setNET_unstaking} accountName={accountName} privateKey={privateKey}/>}

                
              </div>
            ))
            }
          </div>
        </div>
    );
  };
  
  

  

  
  // (df).toFixed(1)

 
  return (
    <div className='resourceDiv'>
      <div className='resourceHeader'>
        <div className='hep_cancel'>
        <font className='hep_balance'>{accountInfo.account.core_liquid_balance}</font>
        <p className='cancel' onClick={() => popToTop()}>취소</p>
        </div>
      <div className='nowResourcesDiv'>
      <PercentageCircle percent={((accountInfo.account.cpu_limit.used/Number(accountInfo.account.cpu_limit.available))*100).toFixed(1)} text={'CPU 사용량'} /> 
      <PercentageCircle percent={((accountInfo.account.net_limit.used/Number(accountInfo.account.net_limit.available))*100).toFixed(1)} text={'NET 사용량'} /> 
      <PercentageCircle percent={((accountInfo.account.ram_usage/Number(accountInfo.account.ram_quota))*100).toFixed(1)} text={'RAM 사용량'} /> 
      </div>
      </div>
        <div className="tab-layout">
          <div className="tab-menu">
            {tabContents.map((content, index) => (
              <div
                key={index}
                className={`tab-item ${CpuOrRam === index ? 'active' : ''}`}
                onClick={() => handleTabClick(index)}
              >
                {tabName[index]}
              </div>
            ))}
          </div>
          <div className="tab-content">
          

        </div>
            {tabContents.map((content, index) => (
              <div
                key={index}
                className={`tab-content-item ${CpuOrRam === index ? 'active' : ''}`}
              >
                {index === 0 && <CPUNET_Tab />}
                {index === 1 && <RAM_Tab />}
                
              </div>
            ))
            }
          
        </div>
    </div>
  );
};


export default Resource;