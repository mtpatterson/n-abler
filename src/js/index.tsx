import './navbar';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import NavbarSearch from './NavbarSearch';

const form: HTMLElement = document.querySelector('.js-search-form-navbar');

ReactDOM.render(<NavbarSearch postReq={form.dataset.value} />, form);
