import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { postCreateUser } from '../services/UserService';
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';

function Home(props) {

    return (
        <>
            <header class="masthead">
                <div class="container">
                    <div class="masthead-subheading">Welcome To Thai Binh!</div>
                    <div class="masthead-heading text-uppercase">It's Nice To Meet You</div>
                    <NavLink className="btn btn-primary" to="/users">List Users</NavLink>
                </div>
            </header>
        </>
    );
}

export default Home;