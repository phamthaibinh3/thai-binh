import Container from 'react-bootstrap/esm/Container';
import './App.scss';
import Header from './Component/Hearder';
import TableUser from './Component/TableUser';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';


function App() {





  return (
    <>
      <div className='app-container'>
        <Header />
        <Container>

          <TableUser />
        </Container>

      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
