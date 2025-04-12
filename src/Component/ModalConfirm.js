import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser, postCreateUser } from '../services/UserService';
import { toast } from 'react-toastify';

function ModalConfirm(props) {
    const { show, handleClose, dataUserDelete, handleDeleteUserFromModal } = props;

    const handleDelete = async () => {
        let res = await deleteUser(dataUserDelete.id)
        console.log('check res: ', res);
        if (res && +res.statusCode === 204) {
            toast.success('Delete user succedd!')
            handleClose();
            handleDeleteUserFromModal(dataUserDelete)
        } else {
            toast.error('Errorr')
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
                    <Modal.Title>Delete a user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='body-add-new'>
                        This action can't be undone!

                        Do want to delte this user? <br></br> <b>email = {dataUserDelete.email}</b>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleDelete}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalConfirm;