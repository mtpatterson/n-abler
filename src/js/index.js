import './navbar';
import React from 'react';
import ReactDOM from 'react-dom';
import SearchForm from './SearchForm';

const form = document.querySelector('.js-search-form-navbar');

ReactDOM.render(<SearchForm postReq={form.dataset.value} />, form);
