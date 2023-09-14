import React, { useEffect, useState,useRef} from 'react';
import '../App.css';
import { Link } from "react-router-dom";
import logo from '../logo.PNG';
import {
  popToTop,
} from 'react-chrome-extension-router';

const Vote = ({accountName,privateKey}) => {
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    popToTop();
  };

  const [ModalState, setModalState] = useState(false); 
    const [producers, setProducers] = useState([]);
    const [blockProducer, setBlockProducer] = useState('');
    const [selectProducer,setselectProducer] = useState([]);
    const [VoteResult, setVoteResult] = useState('Success'); 
    const [UserKey,setUserKey] = useState('');
    const [UserName,setUserName] = useState('');
    const [isLogin,setIsLogin] = useState(false);
    const [VoteID, setVoteID] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [header,setHeader]=useState();
    const [result,setResult]=useState();

  const voteProducer = () => {
    const apiUrl = 'http://221.148.25.234:8989/voteProducer';

    


    const data = {
      datas: {
        voterPrivateKey: privateKey,
        voterName: accountName, // 실제 데이터 값
        producerName: selectProducer,
      }
    };

    // POST 요청 보내기
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        
        console.log(data);
        if(data.status ==='SUCCESS')
          {
            setResult("트랜잭션 완료 ID : "+data.result.transaction_id);
            setHeader("투표 성공");
          }else
          {
            setResult("투표 실패하였습니다.");
            setHeader("투표 실패");
          }
          openModal();
  
      })
      .catch(error => {
        console.error('Error posting data:', error);
      });
  };

  const GetProducers = () => {
    const apiUrl = 'http://221.148.25.234:8989/getProducerList';

    // POST 요청 보내기
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(data => {

        console.log(data);
        setProducers(data.producers);
  
      })
      .catch(error => {
        console.error('Error posting data:', error);
      });
  };

  useEffect(() => {
    GetProducers();

  }, []);

  useEffect(() => {
    console.log(producers); // 여기서 업데이트된 producers를 로그로 확인할 수 있습니다.
  }, [producers]);


  const formatVotes = (votes) => {
    const num = parseInt(votes);
    return num.toLocaleString();
  };

  const calculateVoteRate = (votes) => {
    const totalVotes = calculateTotalVotes();
    const producerVotes = parseFloat(votes);
    const voteRate = (producerVotes / totalVotes) * 100;
    return voteRate.toFixed(2);
  };

  const calculateTotalVotes = () => {
    return producers.reduce((total, producer) => total + parseFloat(producer.total_votes), 0);
  };
  const auth_name_Ref = useRef();
  const action_account_Ref = useRef();
  const action_name_Ref = useRef();
  const data_Ref = useRef();
  const result_Ref = useRef();
  const status_Ref = useRef();
  const voteFetch = async() => {
    setVoteResult(status_Ref.current.value)
    setModalState(true);
    
    let result = JSON.parse(result_Ref.current.value);
    console.log(result);
    console.log(result.transaction_id)
    setVoteID(result.transaction_id)
  }
  
  const isProducing = (producer) => {
    return blockProducer === producer;
  };
  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    if (selectProducer.includes(value)) {
      setselectProducer(selectProducer.filter(item => item !== value));
      action_account_Ref.current.value = "eosio";
      action_name_Ref.current.value = "voteproducer";
      auth_name_Ref.current.value = UserName;
      
      // 철희 추가. json으로 변환해서 input의 value에 추가해야됨
      const dataObject = {
        voter: auth_name_Ref.current.value,
        proxy: '',
        producers: selectProducer
      };
      data_Ref.current.value = JSON.stringify(dataObject);
      console.log(action_account_Ref.current.value)
    } else {
      setselectProducer([...selectProducer, value]);
      action_account_Ref.current.value = "eosio";
      action_name_Ref.current.value = "voteproducer";
      auth_name_Ref.current.value = UserName;
      
      // 철희 추가. json으로 변환해서 input의 value에 추가해야됨
      const dataObject = {
        voter: auth_name_Ref.current.value,
        proxy: '',
        producers: selectProducer
      };
      data_Ref.current.value = JSON.stringify(dataObject);
      console.log(auth_name_Ref.current.value)
    }
  };


  return (
    <div className="container">
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>{header}</h2>
  
            <p className='result'>{result}</p>
            <button onClick={closeModal}>닫기</button>
          </div>
        </div>
      )}
          <div className="selected_View">
            <div className='selected_container_all'>
            
            <div className='resourceHeader'>
              <div className=' selectedAndCancel'>
              <font className='vote-actionTitle'>Selected ({selectProducer.length}/30)</font>
        <p className='vote-cancel' onClick={() => popToTop()}>취소</p>
              </div>
        
      </div>
            
              <div className='selected_container'>
                
                <button type='button'id='transaction' className='vote_btn' onClick={voteProducer}>투표하기</button>
                
                <ul className='selected_ul'>
                  {selectProducer.map(item =>(
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>  
              <div className='vote_container'>
                
                <button id="transaction_complete" style={{display: "none"}} onClick={voteFetch}></button>
                <input ref={action_account_Ref} id="action_account" type="hidden" />
                <input ref={action_name_Ref} id="action_name" type="hidden" />
                <input ref={auth_name_Ref} id="auth_name" type="hidden" />
                <input ref={data_Ref} id="data" type="hidden" />
                <input ref={result_Ref} id="result" type="hidden" />
                <input ref={status_Ref} id="status" type="hidden" />
              </div>
            </div>
            
          </div>
          <div className="producers_table">
          <div className="producer_table_header">
            <div className='select_header'><p className='align'>선택</p></div>
            
            <div className="rank_header"><p className='align'>순위</p></div>
            <div className="producer_name_header"> <p className="align">계정이름</p></div>
            <div className="producer_status_header"><p className="align">상태</p></div>
            <div className="producer_vote_rate_header"><p className="align">득표율</p></div>
            

          </div>
          {producers.map((producer, index) => (
            <div className="producer_item" key={index}>
              <div className='select_container'><input type="checkbox" value={producer.owner} checked={selectProducer.includes(producer.owner)} 
              onChange={handleCheckboxChange} disabled={selectProducer.length >= 30 && !selectProducer.includes(producer.owner)}/></div>
              <div className="rank"><p className="align">{index + 1}</p></div>
              <div className='producer_name'><p className="align">{producer.owner}</p></div>
              <div className="producer_status">
                <p
                  className={`producer_status_box ${
                    index > 20 ? 'standby' : isProducing(producer.owner) ? 'producing' : 'Top21'
                  }`}
                >
                  {index > 20 ? 'stand by' : isProducing(producer.owner) ? 'producing' : 'Top 21'}
                </p>
              </div>
              <div className="producer_vote_rate"><p className="align">{calculateVoteRate(producer.total_votes)}%</p></div>
              
     
            </div>
        ))}
      </div>
      </div>
  )

  
};

  export default Vote;