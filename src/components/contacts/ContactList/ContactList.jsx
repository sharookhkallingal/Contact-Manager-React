import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ContactService } from "../../../services/ContactService";
import Spinner from "../../Spinner/Spinner";

let ContactList = () => {

  let [query, setQuery] = useState({
    text: ''
  });

  let [state, setState] = useState({
    loading: false,
    contacts: [],
    filteredContacts: [],
    errorMessage: ''
  });

  useEffect(() => {
    const handleResp = async () => {
      try {
        setState({ ...state, loading: true });
        let response = await ContactService.getAllContacts();
        setState({
          ...state,
          loading: false,
          contacts: response.data,
          filteredContacts: response.data
        });
      } catch (error) {
        setState({
          ...state,
          loading: false,
          errorMessage: error.message
        });
      }
    };
    handleResp();
  }, []);

  //delete contact
  let clickDelete = async (contactId) => {
    try {
      let response = await ContactService.deleteContact(contactId);
      if (response) {
        setState({ ...state, loading: true });
        let response = await ContactService.getAllContacts();
        setState({
          ...state,
          loading: false,
          contacts: response.data,
          filteredContacts: response.data
        });
      }
    } catch (error) {
      setState({
        ...state,
        loading: false,
        errorMessage: error.message
      });
    }
  };

  //search contacts
  let searchContacts = (event) => {
    setQuery({ ...query, text: event.target.value });
    let theContacts = state.contacts.filter(contact => {
      return contact.name.toLowerCase().includes(event.target.value.toLowerCase())
    });
    setState({
      ...state,
      filteredContacts: theContacts
    });
  };

  let { loading, filteredContacts, errorMessage } = state;

  return (
    <React.Fragment>
      {/* <pre>{JSON.stringify(contacts)}</pre> */}
      <section className="contact-search p-4 text-center">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h1 mb-5">Contact Manager
                <Link to={'/contacts/add'} className="btn btn-primary ms-5 shadow">
                  <i className="fa fa-plus-circle me-2 "></i>
                  New</Link>
              </p>
              <div>
                <h3 className="fst-italic">Effortlessly Manage Your Contacts </h3>
                <p className="fst-italic mt-3">Keep all your important connections at your fingertips. Organize, edit, and view your contacts with ease.</p>
                <p className="fst-italic">Our Contact Manager app allows you to store and manage all your contacts in one secure and user-friendly platform. Whether you need to find a phone number quickly, or update any contact information, our app makes it simple and efficient.</p>
              </div>
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <div className="col-md-6">
              <form className="row">
                <div className="col">
                  <div className="mb-2">
                    <input
                      name="text"
                      value={query.text}
                      onChange={searchContacts}
                      type="text" className="form-control shadow" placeholder="Search Names" />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {
        loading ? <Spinner /> : (
          <section className="contact-list">
            <div className="container">
              <div className="row">
                {
                  filteredContacts.length > 0 &&
                  filteredContacts.map(contact => {
                    return (
                      <div className="col-md-6" key={contact.id}>
                        <div className="card my-3 shadow">
                          <div className="card-body">
                            <div className="row align-items-center d-flex justify-content-around">
                              <div className="col-md-4 col-6">
                                <img src={contact.photo} alt="" className="contact-img" />
                              </div>
                              <div className="col-md-7 col-12">
                                <ul className="list-group">
                                  <li className="list-group-item list-group-item-action">
                                    Name : <span className="fw-bold">{contact.name}</span>
                                  </li>
                                  <li className="list-group-item list-group-item-action">
                                    Mobile : <span className="fw-bold">{contact.mobile}</span>
                                  </li>
                                  <li className="list-group-item list-group-item-action">
                                    Email : <span className="fw-bold">{contact.email}</span>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-md-1 col-6 d-flex flex-column align-items-center">
                                <Link to={`/contacts/view/${contact.id}`} className="btn btn-warning my-1">
                                  <i className="fa fa-eye"></i>
                                </Link>
                                <Link to={`/contacts/edit/${contact.id}`} className="btn btn-primary my-1">
                                  <i className="fa fa-pen"></i>
                                </Link>
                                <button className="btn btn-danger my-1" onClick={() => clickDelete(contact.id)}>
                                  <i className="fa fa-trash"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </section>
        )
      }
    </React.Fragment>
  )
};

export default ContactList;
