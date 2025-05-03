import { use, useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../services/UserService';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAddNew';
import ModalEditUser from './ModalEditUser';
import _, { debounce, findIndex } from 'lodash'
import ModalConfirm from './ModalConfirm';
import './TableUser.scss'
import { CSVLink } from "react-csv";
import Papa from "papaparse";
import { toast } from 'react-toastify'

const TableUser = (props) => {

    const [listUser, setListUser] = useState([])
    const [totalUsers, setTotalUsers] = useState(0)
    const [totalPages, setTotalPages] = useState(0);

    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
    const [isShowModalEdit, setIsShowModalEdit] = useState(false);
    const [dataUserEdit, setDataEdit] = useState({});

    const [isShowModalDelete, setIsShowModalDelete] = useState(false)
    const [dataUserDelete, setDataUserDelete] = useState({});

    const [sortBy, setSortBy] = useState('asc');
    const [sortField, setSortField] = useState('id');

    const [keyword, setKeyword] = useState('');
    const [dataExport, setDataExport] = useState([])

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
        setListUser([user, ...listUser])
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

    const handleSort = (sortBy, sortField) => {
        setSortBy(sortBy);
        setSortField(sortField);

        let cloneListUser = _.cloneDeep(listUser);
        cloneListUser = _.orderBy(cloneListUser, [sortField], [sortBy]);
        setListUser(cloneListUser);
    }

    const handleSearch = debounce((event) => {
        console.log(event.target.value);
        let term = event.target.value
        if (term) {
            let cloneListUser = _.cloneDeep(listUser);
            cloneListUser = cloneListUser.filter(item => item.email.includes(term));
            setListUser(cloneListUser)
        } else {
            getUser(1);
        }
    }, 500)

    const getUserExport = (event, done) => {
        let result = [];
        if (listUser && listUser.length > 0) {
            result.push(["Id", "Email", "First name", "Last name"]);
            listUser.map((item, index) => {
                let arr = [];
                arr[0] = item.id;
                arr[1] = item.email;
                arr[2] = item.first_name;
                arr[3] = item.last_name;
                result.push(arr);
            })
            setDataExport(result);
            done();
        }
    }

    const handleImportCSV = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            let file = event.target.files[0];
            
            if (file.type !== 'text/csv') {
                toast.error("Only accept csv files...");
                return;
            }
    
            Papa.parse(file, {
                //  header: true;
                complete: function (results) {
                    let rawCSV = results.data;
                    if (rawCSV.length > 0) {
                        if (rawCSV[0] && rawCSV[0].length === 3) {
                            if (rawCSV[0][0] !== "email"
                                || rawCSV[0][1] !== "first_name"
                                || rawCSV[0][2] !== "last_name"
                            ) {
                                toast.error("Wrong format Header CSV file");
                            } else {
                                let result = [];
                                rawCSV.map((item, index) => {
                                    if (index > 0 && item.length === 3) {
                                        let obj = {};
                                        obj.email = item[0];
                                        obj.first_name = item[1];
                                        obj.last_name = item[2];
                                        result.push(obj);
                                    }
                                });
                                setListUser(result);
                            }
                        } else {
                            toast.error("Wrong format CSV file");
                        }
                    } else {
                        toast.error("Not found data on CSV file");
                    }
                }
            });
        }
    }
    

    return (
        <>
            <div className='my-3 add-new'>
                <span><b>List User</b></span>
                <div className='group-btns'>
                    <label htmlFor='test' className='btn btn-warning'>Import</label>
                    <input
                        id='test' type='file' hidden
                        onChange={(event) => handleImportCSV(event)}
                    />
                    <CSVLink
                        filename={"user.csv"}
                        className="btn btn-primary"
                        data={dataExport}  
                        asyncOnClick={true}
                        onClick={getUserExport}  
                        separator=";"
                    >
                        Export
                    </CSVLink>

                    <button onClick={ShowModal} className='bnt btn-primary'>Add new user</button>
                </div>
            </div>

            <div className='my-3 col-4'>
                <input className='form-control'
                    placeholder='Search user by email ....'
                    onChange={(event) => handleSearch(event)}
                />
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>
                            <div className='sort-header'>
                                <span>ID</span>
                                <span>
                                    <i
                                        className='fa-solid fa-arrow-down-long'
                                        onClick={() => handleSort("desc", "id")}
                                    ></i>
                                    <i
                                        className='fa-solid fa-arrow-up-long'
                                        onClick={() => handleSort("asc", "id")}
                                    ></i>
                                </span>
                            </div>
                        </th>
                        <th>Email</th>
                        <th>
                            <div className='sort-header'>
                                <span>First name</span>
                                <span>
                                    <i
                                        className='fa-solid fa-arrow-down-long'
                                        onClick={() => handleSort("desc", "first_name")}
                                    ></i>
                                    <i
                                        className='fa-solid fa-arrow-up-long'
                                        onClick={() => handleSort("asc", "first_name")}
                                    ></i>
                                </span>
                            </div>
                        </th>
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
                handleUpdateTable={handleUpdateTable}
            />
            <ModalEditUser
                show={isShowModalEdit}
                handleClose={ShowModalEdit}
                dataUserEdit={dataUserEdit}
                handleEditUserFromModal={handleEditUserFromModal}
            />
            <ModalConfirm
                show={isShowModalDelete}
                handleClose={handleClose}
                dataUserDelete={dataUserDelete}
                handleDeleteUserFromModal={handleDeleteUserFromModal}
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