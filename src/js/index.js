import './navbar';
import SearchForm from './SearchForm';

// for each form element, create an instance of the search form class
const forms = Array.prototype.slice.call(
  document.querySelectorAll('.js-search-form')
);

forms.forEach(form => {
  new SearchForm(form);
});
