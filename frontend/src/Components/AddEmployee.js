import React, { useEffect, useState, useCallback } from 'react';
import { notify } from '../utils';
import { CreateEmployee, UpdateEmployeeById } from '../api';

function AddEmployee({ showModal, setShowModal, fetchEmployees, employeeObj }) {
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        phone: '',
        department: '',
        salary: '',
        profileImage: null,
    });
    const [updateMode, setUpdateMode] = useState(false);

    useEffect(() => {
        if (employeeObj) {
            setEmployee(employeeObj);
            setUpdateMode(true);
        }
    }, [employeeObj]);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setEmployee((prev) => ({ ...prev, [name]: value }));
    }, []);

    const handleFileChange = useCallback((e) => {
        setEmployee((prev) => ({ ...prev, profileImage: e.target.files[0] }));
    }, []);

    const resetEmployeeStates = useCallback(() => {
        setEmployee({
            name: '',
            email: '',
            phone: '',
            department: '',
            salary: '',
            profileImage: null,
        });
    }, []);

    const handleAddEmployee = async (e) => {
        e.preventDefault();

        try {
            let payload = { ...employee };

            // If profileImage exists, handle it with FormData
            if (employee.profileImage) {
                const formData = new FormData();
                Object.keys(payload).forEach((key) => {
                    if (key === 'profileImage') {
                        formData.append(key, employee.profileImage);
                    } else {
                        formData.append(key, payload[key]);
                    }
                });
                payload = formData;
            }

            const { success, message } = updateMode
                ? await UpdateEmployeeById(payload, employee._id)
                : await CreateEmployee(payload);

            if (success) {
                notify(message, 'success');
                fetchEmployees();
                handleModalClose();
            } else {
                notify(message, 'error');
            }
        } catch (err) {
            console.error(err);
            notify(updateMode ? 'Failed to update Employee' : 'Failed to create Employee', 'error');
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
        setUpdateMode(false);
        resetEmployeeStates();
    };

    return (
        <div
            className={`modal fade ${showModal ? 'show' : ''}`}
            tabIndex="-1"
            role="dialog"
            aria-hidden={!showModal}
            style={{ display: showModal ? 'block' : 'none' }}
        >
            <div className="modal-dialog" role="document" aria-labelledby="employeeModalTitle">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="employeeModalTitle">
                            {updateMode ? 'Update Employee' : 'Add Employee'}
                        </h5>
                        <button type="button" className="btn-close" onClick={handleModalClose}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleAddEmployee}>
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={employee.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={employee.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Phone</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="phone"
                                    value={employee.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Department</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="department"
                                    value={employee.department}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Salary</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="salary"
                                    value={employee.salary}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Profile Image</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    name="profileImage"
                                    onChange={handleFileChange}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                {updateMode ? 'Update' : 'Save'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddEmployee;
