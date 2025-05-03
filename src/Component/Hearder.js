import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logoApp from '../assets/images/logo192.png'
import { NavLink } from 'react-router-dom';

const Header = (props) => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary" bg='light'>
            <Container>
                <Navbar.Brand href="/">
                    <img
                        src={logoApp}
                        width='30'
                        height='30'
                        className='d-inline-block align-top'
                        alt='React Bootstrap logo'
                    />
                    <span>Thai Binh App</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to='/' className='nav-link'>Home</NavLink>
                        <NavLink to='/users' className='nav-link'>Manage Users</NavLink>
                    </Nav>
                    <Nav>
                        <NavDropdown title='Setting'>
                            <NavDropdown.Item href='/login'>Login</NavDropdown.Item>
                            <NavDropdown.Item href='/login'>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    )
}

export default Header