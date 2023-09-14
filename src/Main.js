/*global chrome*/
import logo from './logo.svg';
import send from './send.png';
import vote from './vote.png';
import stake from './stake.png';
import './App.css';
import './TabLayout.css';
import { useState } from 'react';
import { useEffect } from 'react';


import Home from './pages/Home';
import SearchAccount from './pages/SearchAccount';
import Send from './pages/Send';
import Resource from './pages/Resource'
import Vote from './pages/Vote'
import Header from './components/Header';
import * as ReactDOM from 'react-dom';
import {
  goBack,
  goTo,
  popToTop,
  Link,
  Router,
  getCurrent,
  getComponentStack,
} from 'react-chrome-extension-router';


function Main() {
  const [isExtension, setIsExtension] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [accountInfo, setAccountInfo] = useState({});
  const [tabContents, setTabContents] = useState([[], []]);
  const [Actions, setActions] = useState([]);
  const [accountName, setAccountName] = useState('producer2');
  const [publicKey,setActivePublicKey]=useState('EOS7yd54hpzRjNB72KenfG1p17nxoW4Na6HoCJupbiQv1HK6K6q7Y');
  const [privateKey,setActivePrivateKey]=useState('5JXhdxy1bgNZ9qFfRERduNGsYf8LspfhHnjVjZC16xM2W7sAs5x');
  const [accountList, setaccountList] = useState([]);
  
  let filteredAction;
  let actions = null;
  let trx_id;
  const [hep_integer, setHep_integer] = useState(0);
  // 0 투표 , 1 NFT, 2 트랜잭션기록
  const tabName = ['NFT', '활동'];


  
  const [isValidAccount, setIsValidAccount] = useState(true);
  const [tid, setTid] = useState('');
  const getAccountInfo = () => {
    const apiUrl = 'http://221.148.25.234:8989/getAccountInfo';

    // POST 요청에 사용할 데이터
    const data = {
      accountName: accountName,
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
        setAccountInfo(data);
        HepToInteger(data.account.core_liquid_balance);
        console.log(data);

      })
      .catch(error => {
        console.error('Error posting data:', error);
      });
  };
  const getAccountTransaction = () => {
    const apiUrl = 'http://221.148.25.234:8989/getAccountTransaction';

    // POST 요청에 사용할 데이터
    // nodejs서버에서 datas안에 accountName으로 받음
    const data = {
      datas: {
        accountName: accountName // 실제 데이터 값
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
        actions = data.result;
        console.log(actions);
        filltering(actions);
        setActions(filteredAction);
      })
      .catch(error => {
        console.error('Error posting data:', error);
      });

  };
  //같은 트랜잭션아이디인경우 필터링
  function filltering(actions)
  {
    var updatedItems = [];
    for(var i=0;i<actions.length;i++)
    {
      if(trx_id!==actions[i].action_trace.trx_id)
      {
        trx_id=actions[i].action_trace.trx_id;
        updatedItems.push(actions[i]);
      }
      
    }
    filteredAction=updatedItems;
  } 

  function HepToInteger(balance)
  {
    var HepString=balance.slice(0,-4);
    var dot=".";   //문자열에서 소수를 없애고 정수로 바꾸는 과정
    HepString = HepString.replace(dot, "");
    console.log("헵스트링 : " + HepString);
    setHep_integer(parseInt(HepString))
    console.log("헵인티저 : " + hep_integer);
    
  }


  useEffect(() => {
    getAccountInfo();
    getAccountTransaction();
    setIsExtension(window.innerWidth < 600);
    getAccountList();

  }, []);

  const handleTabClick = (index) => {
    setActiveTab(index);
    getAccountTransaction();
    getAccountInfo();
  };

  const Transactions = () => {
    
    return (

      <div className='out_line'>
        {Actions.slice().reverse().map((action, index) => (
          <div key={index} className='out_line2'>
            {<div className='transaction_tab_item'>
              <div className='transactin_colunm_1'>
                <div>
                {action.action_trace.act.name}
                </div>
                <div>
                  {action.action_trace.act.data.from} {action.action_trace.act.name === 'transfer' ? '→' : ''} {action.action_trace.act.data.to}
                </div>
                <div className='quantity'>
                  {action.action_trace.act.data.quantity}
                </div>
              </div>
              <div className='transactin_colunm_2'>
                <div>
                  {action.block_time}
                </div>

                <div>
                  {action.action_trace.act.data.memo}
                </div>
                <div className='trx_id'>
                  {action.action_trace.trx_id}
                </div>
              </div>
            </div>
            }
            
          </div>
        ))}
      </div>


    );
  };
  function Body() {
    return (
      <div>
        <div className='pk-div'>
          <p className="public-key">{publicKey}</p>{/* accountInfo에 공개키는 없음 */}
        </div>

        <div className='balance'>
          {accountInfo.account && (<p>{accountInfo.account.core_liquid_balance}</p>)}

        </div>
        <div className='functionDiv'>
          <div>
            <Link component={SearchAccount} props={{ accountInfo,accountName,privateKey }}>
              <img src={send} className="function" /><h4 className="function-name">전송</h4>
            </Link>
          </div>
          <div>
            <Link component={Resource} props={{ accountInfo,hep_integer,accountName,privateKey}}>
              <img src={stake} className="function" /><h4 className="function-name">리소스</h4>
            </Link>
          </div>
          <Link component={Vote} props={{accountName,privateKey}}>
            <img src={vote} className="function" /><h4 className="function-name">투표</h4>
          </Link>
        </div>

        <div className="tab-layout">
          <div className="tab-menu">
            {tabContents.map((content, index) => (
              <div
                key={index}
                className={`tab-item ${activeTab === index ? 'active' : ''}`}
                onClick={() => handleTabClick(index)}
              >
                {tabName[index]}
              </div>
            ))}
          </div>
          <div className="tab-content">
            {tabContents.map((content, index) => (
              <div
                key={index}
                className={`tab-content-item ${activeTab === index ? 'active' : ''}`}
              >
                {/* {content} */}

                {index === 1 && <Transactions />}
              </div>
            ))
            }
          </div>
        </div>


      </div>
    );
  }

  const getAccountList= async()=>{


          
    try {
      console.log("getAccountList 시작");
      console.log(chrome);
      console.log(chrome.storage);
      console.log(chrome.storage.local);
      const result_user_mnemonic = await chrome.storage.local.get(["user_mnemonic"]); // 니모닉 가져오기
      const result_accounts = await chrome.storage.local.get(["accounts"]);
      setaccountList(result_accounts);
      
    } catch (error) {
      console.log(error);
    }
  }


  const createAccount = async (newAccountName) => {
    
    try {
      
      // 1. 저장된 니모닉과 계정 개수를 바탕으로 키를 생성한다.
      console.log("createAccount 시작");
      const result_user_mnemonic = await chrome.storage.local.get(["user_mnemonic"]); // 니모닉 가져오기
      const result_accounts = await chrome.storage.local.get(["accounts"]); // 계정 가져오기

      console.log("createAccount : result_user_mnemonic : ");
      console.log(result_user_mnemonic)
      console.log("createAccount : result_accounts : ");
      console.log(result_accounts)
      let account_num = 0; // 계정의 수 가져오기
      if(Object.keys(result_accounts).length !== 0) {
        account_num = result_accounts.accounts.length;
      }
      console.log("createAccount : 계정의 수 : "+account_num);

      
      // 2. 니모닉을 기반으로 키 생성을 요청한다. (니모닉 기반 키 요청)
      const url_for_key = "http://221.148.25.234:3100/key_create_from_mnemonic";
      const data_for_key = {
          mnemonic: result_user_mnemonic.user_mnemonic,
          num_child: account_num,
        };
      
      const keyData = await postJSON(url_for_key, data_for_key);

      const publicKey = keyData.keyPairs[0].publicKey;
      const privateKey = keyData.keyPairs[0].privateKey;


      // 2.5 해당 public 키로 설정된 계정이 있는지 조회한다. (공개키의 계정 여부 조회)
      const url_for_publicKeyAccount = "http://221.148.25.234:8989/getAccountList";
      const data_for_publicKeyAccount = {
          publicKey: publicKey
        };
      
      const result_publicKeyAccount = await postJSON(url_for_publicKeyAccount, {datas : data_for_publicKeyAccount});
      const publicKeyAccount = result_publicKeyAccount.accounts;
      console.log("createAccount : 계정조회 결과")
      console.log(publicKeyAccount)
      if(Array.isArray(publicKeyAccount) && publicKeyAccount.length !== 0) {
        console.log("이미 계정이 존재하는 public key입니다.")
        return;
      }    


      // 3. 해당 public key로 설정된 계정이 없다면 public과 private키를 기반으로 계정 생성을 요청한다..
      
      const createName = newAccountName // 계정이름

      const url_for_account = "http://221.148.25.234:8989/createAccount";
      const data_for_account = {
          createName: createName,
          publicKey: publicKey,
        };

      const response_account = await postJSON(url_for_account, {datas : data_for_account});
      if(response_account.status == "SUCCESS") {
          
        console.log("계정생성 성공")
        console.log("트랜잭션 아이디 : "+response_account.result.transaction_id);
        setTid(response_account.result.transaction_id)
        
        const new_account = {account_name : createName, publicKey :publicKey, privateKey : privateKey }
        account_store(new_account); // 계정 생성에 성공하면 해당 계정을 storage에 저장한다.

      } else {
        console.log("계정생성 실패")
      }

    
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  async function postJSON(url = "", data = {}) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      console.log("postJSON Success:", result);
      return result;
      
    } catch (error) {
      console.error("postJSON Error:", error);
    }
  }

  async function account_store(new_account) {

    // 1. 현재 chrome.storage에 저장된 키 값들의 배열을 가져오고
    const result = await chrome.storage.local.get(["accounts"]);
    console.log("현재 저장된 accounts 값들",result);
  
    let updateData = [];
    if(result.accounts) {
        //accounts라는 key의 데이터가 존재하지 않거나 해당 값의 값들이 배열이 아닐때.. 즉, 초기값일 때를 의미함.
        try {
            const accountsArray = result.accounts;
            if (Array.isArray(accountsArray)) {
              updateData = accountsArray;
              console.log("updateData에 과거 데이터 추가.")
            }
          } catch (error) {
            console.error("Error parsing keys:", error);
          }
    }
    console.log("updateData 확인 : ",updateData)
  
    
    // 2. 해당 배열에 새로 추가된 계정을 넣어준다
    updateData.push(new_account); // 기존 데이터를 추가해준다.
  
    
    // 3. 해당 배열을 chrome.storage에 다시 넣어준다. (갱신한다)
    await chrome.storage.local.set({accounts : updateData}); // 테스트를 위해 await 함
    const result2 = await chrome.storage.local.get(["accounts"]);
    console.log("갱신된 account 값들",result2);
  
    chrome.storage.local.set({request_state : "main"});
    
  }
  return (


    <div className={isExtension === false ? 'App' : 'App-Extension'}>

      <header className={isExtension === false ? 'App-header' : 'App-header-Extension'}>
        <Header accountName={accountName} createAccount={createAccount} 
        setAccountName={setAccountName} setActivePrivateKey={setActivePrivateKey} setActivePublicKey={setActivePublicKey} accountList={accountList}/>                  {/* 상단 계정이름 설정창  */}
        {/* <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/pages/SearchAccount" element={<SearchAccount />} />
          <Route path="/pages/Resource" element={<Resource />} />
          <Route path="/pages/Vote" element={<Vote />} />
          <Route path="/pages/Send/:AccountName" element={<Send />} />
        </Routes> */}
        <Router>
          <Body />
        </Router>
      </header>

    </div>

  );
}





export default Main;




