import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../services/UserService';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAddNew';
import ModalEditUser from './ModalEditUser';
import _, { findIndex } from 'lodash'
import ModalConfirm from './ModalConfirm';

const TableUser = (props) => {

    const [listUser, setListUser] = useState([])
    const [totalUsers, setTotalUsers] = useState(0)
    const [totalPages, setTotalPages] = useState(0);

    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
    const [isShowModalEdit,setIsShowModalEdit] = useState(false);
    const [dataUserEdit,setDataEdit] = useState({});

    const [isShowModalDelete,setIsShowModalDelete] = useState(false)
    const [dataUserDelete,setDataUserDelete] = useState({});

    useEffect(() => {
        getUser(totalPages)
    }, [])

    const handleClose = () => {
        setIsShowModalAddNew(false);
        setIsShowModalDelete(false);
    }

    const ShowModal = () => {
        setIsShowModalAddNew(true)
    }

    const ShowModalEdit = () => {
        setIsShowModalEdit(false)
    }

    const handleUpdateTable = (user) => {
        setListUser([user,...listUser])
    }

    const getUser = async (page) => {
        let res = await fetchAllUser(page);
        if (res && res.data) {
            setTotalUsers(res.total)
            setListUser(res.data)
            setTotalPages(res.total_pages)
        }
    }

    const handlePageClick = (event) => {
        getUser(+event.selected + 1)
    }

    const handleEditUser = (user) => {
        setDataEdit(user);
        setIsShowModalEdit(true);
    }

    const handleEditUserFromModal = (user) => {
        let cloneListUser = _.cloneDeep(listUser);
        let index = listUser.findIndex(item => item.id === user.id);
        cloneListUser[index].first_name = user.first_name;
        setListUser(cloneListUser);
    }

    const handleDeleteUser = (user) => {
        setIsShowModalDelete(true);
        setDataUserDelete(user)
    }

    const handleDeleteUserFromModal = (user) => {
        let cloneListUser = _.cloneDeep(listUser);
        cloneListUser = listUser.filter(item => item.id !== user.id)
        setListUser(cloneListUser)
    }

    return (
        <>
            <div className='my-3 add-new'>
                <span><b>List User</b></span>
                <button onClick={ShowModal} className='bnt btn-primary'>Add new user</button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listUser && listUser.length > 0 &&
                        listUser.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.email}</td>
                                    <td>{item.first_name}</td>
                                    <td>{item.last_name}</td>
                                    <td>
                                        <button onClick={() => handleEditUser(item)} className='btn btn-warning mx-3'>Edit</button>
                                        <button onClick={() => handleDeleteUser(item)} className='btn btn-danger'>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </Table>
            <ModalAddNew
                show={isShowModalAddNew}
                handleClose={handleClose}
                handleUpdateTable = {handleUpdateTable}
            />
            <ModalEditUser
                show = {isShowModalEdit}
                handleClose = {ShowModalEdit}
                dataUserEdit = {dataUserEdit}
                handleEditUserFromModal = {handleEditUserFromModal}
            />
            <ModalConfirm
                show = {isShowModalDelete}
                handleClose = {handleClose}
                dataUserDelete = {dataUserDelete}
                handleDeleteUserFromModal = {handleDeleteUserFromModal}
            />
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={totalPages}
                previousLabel="< previous"

                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                marginPagesDisplayed={2}
                containerClassName="pagination"
                activeClassName="active"
            />

        </>
    )
}

export default TableUser