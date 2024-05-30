import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import React from 'react';
import ContactList from './components/contacts/ContactList/ContactList';
import AddContact from './components/contacts/AddContact/AddContact';
import ViewContact from './components/contacts/ViewContact/ViewContact';
import EditContact from './components/contacts/EditContact/EditContact';
import NavBar from './components/NavBar/NavBar';
import Spinner from './components/Spinner/Spinner';

import 'bootstrap/dist/css/bootstrap.min.css';



let App=()=> {
  return (
    <React.Fragment>

      <NavBar></NavBar>
      <Routes>
        <Route path={'/'} element={<Navigate to={'/contacts/list'}/>}/>
        <Route path={'/contacts/list'} element={<ContactList/>}/>
        <Route path={'/contacts/add'} element={<AddContact/>}/>
        <Route path={'/contacts/view/:contactId'} element={<ViewContact/>}/>
        <Route path={'/contacts/edit/:contactId'} element={<EditContact/>}/>

      </Routes>
    </React.Fragment>
  );
}

export default App;
