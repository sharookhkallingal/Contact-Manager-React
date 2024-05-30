import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ContactService } from "../../../services/ContactService";
import Spinner from "../../Spinner/Spinner";

const EditContact = () => {
    const navigate = useNavigate();
    const { contactId } = useParams();

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

    useEffect(() => {
        async function fetchData() {
            try {
                setState({ ...state, loading: true });
                const response = await ContactService.getContact(contactId);
                const groupResponse = await ContactService.getGroups();
                setState({
                    ...state,
                    loading: false,
                    contact: response.data,
                    groups: groupResponse.data
                });
            } catch (error) {
                setState({
                    ...state,
                    loading: false,
                    errorMessage: error.message
                });
            }
        }
        fetchData();
    }, [contactId]);

    const updateInput = (event) => {
        setState({
            ...state,
            contact: {
                ...state.contact,
                [event.target.name]: event.target.value
            }
        });
    };

    const submitForm = async (event) => {
        event.preventDefault();
        try {
            const response = await ContactService.updateContact(state.contact, contactId);
            if (response) {
                navigate('/contacts/list', { replace: true });
            }
        } catch (error) {
            setState({ ...state, errorMessage: error.message });
            navigate(`/contacts/edit/${contactId}`, { replace: false });
        }
    };

    const { loading, contact, groups } = state;

    return (
        <React.Fragment>
            {loading ? (
                <Spinner />
            ) : (
                <section className="edit-contact p-4">
                    <div className="container">
                        <div className="row">
                            <div className="col text-center">
                                <p className="h4 text-primary fw-bold mt-4">Edit Contact</p>
                                <p className="fst-italic my-4">
                                    Update the information for your contact. Fill out the fields below and click 'Update' when you're done.
                                </p>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-12 col-md-6 mb-4">
                                <img src={contact.photo} alt="" className="img-fluid contact-img" />
                            </div>
                            <div className="col-12 col-md-6">
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
                                            className="form-control"
                                        >
                                            <option value="">Select a Group</option>
                                            {groups.length > 0 &&
                                                groups.map(group => (
                                                    <option key={group.id} value={group.id}>
                                                        {group.name}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
                                    <div className="mb-2">
                                        <input type="submit" className="btn btn-primary" value="Update" />
                                        <Link to={'/contacts/list'} className="btn btn-dark ms-2">
                                            Cancel
                                        </Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </React.Fragment>
    );
};

export default EditContact;
