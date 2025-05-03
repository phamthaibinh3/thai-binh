import Container from 'react-bootstrap/esm/Container';
import './App.scss';
import Header from './Component/Hearder';
import TableUser from './Component/TableUser';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import {Routes, Route} from 'react-router-dom'
import Home from './Component/Home';


function App() {

  return (
    <>
      <div className='app-container'>
        <Header />
        <Container>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/users' element={<TableUser />}/>
          </Routes>
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

// export default App;

// import Container from 'react-bootstrap/esm/Container';
// import './App.scss';
// import Header from './Component/Hearder';
// import TableUser from './Component/TableUser';
// import { useState } from 'react';
// import { ToastContainer, toast } from 'react-toastify';


// function App() {

//   const [todo, setTodo] = useState('');
//   const [listTodo, setListTodo] = useState([
//     { id: 1, name: 'Thai Binh' },
//     { id: 2, name: 'Minh Huy' },
//     { id: 3, name: 'Van Duc' }
//   ])
//   const [todoEdit, setTodoEdit] = useState({});

//   const handleAddNew = () => {
//     // console.log('check todo: ',todo);
//     let user = {
//       id: Math.floor(Math.random() * 10000),
//       name: todo
//     }
//     setListTodo([...listTodo, user])
//   }

//   const handleDelete = (user) => {
//     console.log('check user: ', user);
//     let listTodoCopy = [...listTodo]
//     listTodoCopy = listTodoCopy.filter(item => item.id !== user.id);
//     setListTodo(listTodoCopy)
//   }

//   const handleEdit = (user) => {
//     setTodoEdit(user)
//   }

//   const handleSave = (user) => {
//     console.log('check todoEdit: ', todoEdit);

//     let update = listTodo.map(item => item.id === todoEdit.id ? { ...item, name: todoEdit.name } : item)


//     setListTodo(update)
//     setTodoEdit({})
//   }

//   const onChangeEdit = (event) => {
//     let value = { ...todoEdit };
//     value.name = event.target.value;
//     setTodoEdit(value)
//   }

//   return (
//     <>
//       <div>
//         <label>To do list</label>
//       </div>
//       <div>
//         <input type='text' value={todo} onChange={(event) => setTodo(event.target.value)} />
//         <button onClick={() => handleAddNew()} className='btn btn-primary mx-3'>Submit</button>
//       </div>
//       <div>
//         {listTodo && listTodo.map((item, index) => {
//           return (
//             <>
//               <div>
//                 {todoEdit.id === item.id ? (
//                   <input
//                     type='text'
//                     value={todoEdit.name}
//                     onChange={(event) => onChangeEdit(event)}
//                   />
//                 ) : (
//                   <label>{index + 1} - {item.name}</label>
//                 )}
//                 {todoEdit.id === item.id ?
//                   <button onClick={() => handleSave(item)} className='btn btn-warning mx-3'>Save</button>
//                   :
//                   <button onClick={() => handleEdit(item)} className='btn btn-warning mx-3'>Edit</button>
//                 }

//                 <button onClick={() => handleDelete(item)} className='btn btn-danger mx-3'>Delete</button>
//               </div>
//             </>
//           )
//         })}

//       </div>
//     </>
//   );
// }


