import Logo from '../assets/eagle.jpg';
import {Container, Navbar} from 'react-bootstrap';
import {
    goTo
  } from 'react-chrome-extension-router';
import Welcome from './welcome';


export default function Header() {
    return (
      <>
       <Navbar className="bg-body-tertiary mb-5">
          <Container>
            <Navbar.Brand href='/welcome'>
              <img
                alt=""
                src={Logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{' '}
              Albatros
            </Navbar.Brand>
          </Container>
        </Navbar>
      </>
    );
  }