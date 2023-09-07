import React from 'react';
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
import Account_choice from './Account_choice';
import Sign_request from './Sign_request';

export default function PopupComponent() {

  return (
    <>
        <Router>
            <Account_choice />
        </Router>
    </>
    
  )
}
