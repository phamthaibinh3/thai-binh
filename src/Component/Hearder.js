import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logoApp from '../assets/images/logo192.png'
import { NavLink } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { UserContext } from '../context/UserContext'
import { useContext, useState } from 'react';

const Header = (props) => {
    const { logout, user } = useContext(UserContext);

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
        toast.success("Log out success!")
    }

    console.log('>>>check user: ', user);

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
                    {(user && user.auth || window.location.pathname === '/') &&
                        <>
                            <Nav className="me-auto">
                                <NavLink to='/' className='nav-link'>Home</NavLink>
                                <NavLink to='/users' className='nav-link'>Manage Users</NavLink>
                            </Nav>
                            <Nav>
                            {user && user.auth === true && <span className='nav-link'>Wecome {user.email}</span>}
                                <NavDropdown title='Setting'>
                                    {user && user.auth === true
                                        ?
                                        <NavDropdown.Item onClick={() => handleLogout()}>Logout</NavDropdown.Item>
                                        :
                                        <NavLink to='/login' className='dropdown-item'>Login</NavLink>
                                    }


                                </NavDropdown>
                            </Nav>
                        </>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar >
    )
}

export default Header