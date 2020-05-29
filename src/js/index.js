import './navbar';
import React from 'react';
import ReactDOM from 'react-dom';
import SearchForm from './SearchForm';

// for each form container element, create an instance of the search form
const forms = Array.prototype.slice.call(
  document.querySelectorAll('.js-search-form-container')
);

forms.forEach(form => {
  ReactDOM.render(<SearchForm postReq={form.dataset.value} />, form);
});
