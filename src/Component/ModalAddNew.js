import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { postCreateUser } from '../services/UserService';
import { toast } from 'react-toastify';

function ModalAddNew(props) {
  const { show, handleClose } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handleSaveUser = async () => {
    let res = await postCreateUser(name, job)
    console.log('check res: ', res);
    if (res && res.id) {
      toast.success('Them user thanh cong');
      handleClose()
      setName('')
      setJob('')
      props.handleUpdateTable({first_name: name,id: res.id})
    } else {
      toast.error('loi')
    }
  }


  return (
    <>
      <Modal show={show} onHide={handleClose} 
      animation={false}
      backdrop="static"
      keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='body-add-new'>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input type="text" className="form-control" value={name} onChange={(event) => setName(event.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Job</label>
              <input type="text" className="form-control" value={job} onChange={(event) => setJob(event.target.value)} />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalAddNew;