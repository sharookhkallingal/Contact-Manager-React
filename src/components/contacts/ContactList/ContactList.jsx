import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ContactService } from "../../../services/ContactService";
import Spinner from "../../Spinner/Spinner";
import "./ContactList.css";
import { Button } from "bootstrap";

let ContactList = () => {
  let [query, setQuery] = useState({
    text: "",
  });

  let [state, setState] = useState({
    loading: false,
    contacts: [],
    filteredContacts: [],
    errorMessage: "",
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
          filteredContacts: response.data,
        });
      } catch (error) {
        setState({
          ...state,
          loading: false,
          errorMessage: error.message,
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
          filteredContacts: response.data,
        });
      }
    } catch (error) {
      setState({
        ...state,
        loading: false,
        errorMessage: error.message,
      });
    }
  };

  //search contacts
  let searchContacts = (event) => {
    setQuery({ ...query, text: event.target.value });
    let theContacts = state.contacts.filter((contact) => {
      return contact.name
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    setState({
      ...state,
      filteredContacts: theContacts,
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
              <div className="d-flex flex-row justify-content-center mt-5">
                <h1>Contact Manager</h1>
                

                <Link to={"/contacts/add"} style={{ textDecoration: "none" }}>
                  
                    
<button class="newcontact ms-3 mt-2" type="button">
  <span class="nbutton__text">Add Item</span>
  <span class="nbutton__icon"><svg class="svg" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><line x1="12" x2="12" y1="5" y2="19"></line><line x1="5" x2="19" y1="12" y2="12"></line></svg></span>
</button>
                  
                </Link>
              </div>
              <div>
                <h3 className="fst-italic mt-3">
                  Effortlessly Manage Your Contacts{" "}
                </h3>
                <p className="fst-italic mt-3">
                  Keep all your important connections at your fingertips.
                  Organize, edit, and view your contacts with ease.
                </p>
                <p className="fst-italic">
                  Our Contact Manager app allows you to store and manage all
                  your contacts in one secure and user-friendly platform.
                  Whether you need to find a phone number quickly, or update any
                  contact information, our app makes it simple and efficient.
                </p>
              </div>
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <div className="col-md-6">
              <form className="">
                <div className="col">
                  <div className="mb-2 input-wrapper row d-flex justify-content-center">
                    <input
                      name="text"
                      value={query.text}
                      onChange={searchContacts}
                      type="text"
                      className="form-control shadow input"
                      placeholder="Search Names"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {loading ? (
        <Spinner />
      ) : (
        <section className="contact-list">
          <div className="container">
            <div className="row">
              {filteredContacts.length > 0 &&
                filteredContacts.map((contact) => {
                  return (
                    <div className="col-md-6" key={contact.id}>
                      <div className="card my-3 shadow">
                        <div className="card-body">
                          <div className="row align-items-center d-flex justify-content-around">
                            <div className="col-md-4 col-6">
                              <img
                                src={contact.photo}
                                alt=""
                                className="contact-img"
                              />
                            </div>
                            <div className="col-md-7 col-12">
                              <ul className="list-group">
                                <li className="list-group-item list-group-item-action">
                                  Name :{" "}
                                  <span className="fw-bold">
                                    {contact.name}
                                  </span>
                                </li>
                                <li className="list-group-item list-group-item-action">
                                  Mobile :{" "}
                                  <span className="fw-bold">
                                    {contact.mobile}
                                  </span>
                                </li>
                                <li className="list-group-item list-group-item-action">
                                  Email :{" "}
                                  <span className="fw-bold">
                                    {contact.email}
                                  </span>
                                </li>
                              </ul>
                            </div>
                            <div className="col-md-1 col-6 d-flex flex-column align-items-center">
                              <Link
                                to={`/contacts/view/${contact.id}`}
                                className="btn btn-warning my-1"
                              >
                                <i className="fa fa-eye"></i>
                              </Link>
                              {/* <Link to={`/contacts/edit/${contact.id}`} className="btn btn-primary my-1">
                                  <i className="fa fa-pen"></i>
                                </Link> */}
                              <Link to={`/contacts/edit/${contact.id}`}>
                                <button class="Btn my-1">
                                  <svg class="svg" viewBox="0 0 512 512">
                                    <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                                  </svg>
                                </button>
                              </Link>

                              {/* <button className="btn btn-danger my-1" onClick={() => clickDelete(contact.id)}>
                                  <i className="fa fa-trash"></i>
                                </button> */}
                              <button
                                class="bin-button my-1"
                                onClick={() => clickDelete(contact.id)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 39 7"
                                  class="bin-top"
                                >
                                  <line
                                    stroke-width="4"
                                    stroke="white"
                                    y2="5"
                                    x2="39"
                                    y1="5"
                                  ></line>
                                  <line
                                    stroke-width="3"
                                    stroke="white"
                                    y2="1.5"
                                    x2="26.0357"
                                    y1="1.5"
                                    x1="12"
                                  ></line>
                                </svg>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 33 39"
                                  class="bin-bottom"
                                >
                                  <mask fill="white" id="path-1-inside-1_8_19">
                                    <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"></path>
                                  </mask>
                                  <path
                                    mask="url(#path-1-inside-1_8_19)"
                                    fill="white"
                                    d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                                  ></path>
                                  <path
                                    stroke-width="4"
                                    stroke="white"
                                    d="M12 6L12 29"
                                  ></path>
                                  <path
                                    stroke-width="4"
                                    stroke="white"
                                    d="M21 6V29"
                                  ></path>
                                </svg>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 89 80"
                                  class="garbage"
                                >
                                  <path
                                    fill="white"
                                    d="M20.5 10.5L37.5 15.5L42.5 11.5L51.5 12.5L68.75 0L72 11.5L79.5 12.5H88.5L87 22L68.75 31.5L75.5066 25L86 26L87 35.5L77.5 48L70.5 49.5L80 50L77.5 71.5L63.5 58.5L53.5 68.5L65.5 70.5L45.5 73L35.5 79.5L28 67L16 63L12 51.5L0 48L16 25L22.5 17L20.5 10.5Z"
                                  ></path>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </section>
      )}
    </React.Fragment>
  );
};

export default ContactList;
