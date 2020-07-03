import './navbar';
import React from 'react';
import ReactDOM from 'react-dom';
import NavbarSearch from './NavbarSearch';

const form = document.querySelector('.js-search-form-navbar');

ReactDOM.render(<NavbarSearch postReq={form.dataset.value} />, form);
