import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ContactService } from "../../../services/ContactService";

const AddContact = () => {
    const navigate = useNavigate();

    const [state, setState] = useState({
        loading: false,
        contact: {
            name: '',
            photo: '',
            mobile: '',
            email: '',
            company: '',
            title: '',
            groupId: ''
        },
        groups: [],
        errorMessage: ''
    });

    const updateInput = (event) => {
        setState({
            ...state,
            contact: {
                ...state.contact,
                [event.target.name]: event.target.value
            }
        });
    };

    useEffect(() => {
        async function fetchGroups() {
            try {
                setState({ ...state, loading: true });
                const response = await ContactService.getGroups();
                setState({
                    ...state,
                    loading: false,
                    groups: response.data
                });
            } catch (error) {
                setState({ ...state, loading: false, errorMessage: error.message });
            }
        }
        fetchGroups();
    }, []);

    const submitForm = async (event) => {
        event.preventDefault();
        try {
            const response = await ContactService.createContact(state.contact);
            if (response) {
                navigate('/contacts/list', { replace: true });
            }
        } catch (error) {
            setState({ ...state, errorMessage: error.message });
            navigate('/contacts/add', { replace: false });
        }
    };

    const { contact, groups } = state;

    return (
        <React.Fragment>
            <section className="add-contact p-4">
                <div className="container">
                    <div className="row">
                        <div className="col text-center">
                            <p className="h4 text-success fw-bold mt-4">Create Contact</p>
                            <p className="fst-italic"></p>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-6 col-12">
                            <form onSubmit={submitForm}>
                                <div className="mb-2">
                                    <input
                                        required
                                        name="name"
                                        value={contact.name}
                                        onChange={updateInput}
                                        type="text"
                                        className="form-control"
                                        placeholder="Name"
                                    />
                                </div>
                                <div className="mb-2">
                                    <input
                                        required
                                        name="photo"
                                        value={contact.photo}
                                        onChange={updateInput}
                                        type="text"
                                        className="form-control"
                                        placeholder="Photo URL"
                                    />
                                </div>
                                <div className="mb-2">
                                    <input
                                        required
                                        name="mobile"
                                        value={contact.mobile}
                                        onChange={updateInput}
                                        type="number"
                                        className="form-control"
                                        placeholder="Mobile"
                                    />
                                </div>
                                <div className="mb-2">
                                    <input
                                        required
                                        name="email"
                                        value={contact.email}
                                        onChange={updateInput}
                                        type="email"
                                        className="form-control"
                                        placeholder="Email"
                                    />
                                </div>
                                <div className="mb-2">
                                    <input
                                        required
                                        name="company"
                                        value={contact.company}
                                        onChange={updateInput}
                                        type="text"
                                        className="form-control"
                                        placeholder="Company"
                                    />
                                </div>
                                <div className="mb-2">
                                    <input
                                        required
                                        name="title"
                                        value={contact.title}
                                        onChange={updateInput}
                                        type="text"
                                        className="form-control"
                                        placeholder="Title"
                                    />
                                </div>
                                <div className="mb-2">
                                    <select
                                        required
                                        name="groupId"
                                        value={contact.groupId}
                                        onChange={updateInput}
                                        className="form-control">
                                        <option value="">Select a Group</option>
                                        {
                                            groups.length > 0 &&
                                            groups.map(group => {
                                                return (
                                                    <option key={group.id} value={group.id}>{group.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="mb-2">
                                    <input type="submit" className="btn btn-success" value="Create" />
                                    <Link to={'/contacts/list'} className="btn btn-dark ms-2">Cancel</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
};

export default AddContact;
