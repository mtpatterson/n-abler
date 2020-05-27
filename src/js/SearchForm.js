import debounce from 'lodash/debounce';

const ARROW_DOWN = 40;
const ARROW_UP = 38;

class SearchForm {
  constructor(form) {
    this.form = form;
    this.formButton = form.querySelector('.js-search-button');
    this.formInput = form.querySelector('.js-search-input');
    this.formResults = form.querySelector('.js-search-results');

    this.clear();
    this.events();
  }

  clear() {
    this.dropdownElements = [];
    this.responseItems = [];
    this.searchValue = '';
  }

  events() {
    this.formInput.addEventListener('input', this.handleSearch.bind(this));

    // use arrow keys to navigate dropdown
    this.formInput.addEventListener('keydown', e => {
      if (e.keyCode === ARROW_DOWN) {
        e.target.parentElement.querySelector('.js-search-results-item').focus();
      }
    });
  }

  // create these events each time the results are found
  dropdownEvents() {
    this.dropdownElements.forEach(item => {
      item.addEventListener('click', e => {
        this.formResults.classList.add('hidden');

        this.formInput.value = e.target.textContent;
        this.form.action = `/${e.target.dataset.slug}`;

        this.form.submit();
      });

      // use arrow keys to navigate dropdown
      item.addEventListener('keydown', e => {
        if (e.keyCode === ARROW_DOWN) {
          if (e.target.nextElementSibling) {
            e.target.nextElementSibling.focus();
          }
        } else if (e.keyCode === ARROW_UP) {
          if (e.target.previousElementSibling) {
            e.target.previousElementSibling.focus();
          } else {
            this.formInput.focus();
          }
        }
      });
    });
  }

  handleSearch(e) {
    this.searchValue = e.target.value;

    // add loading icon
    if (!this.formResults.firstChild) {
      this.formResults.classList.remove('hidden');

      this.formResults.insertAdjacentHTML(
        'afterbegin',
        '<i class="fas na-search-results-loading fa-ellipsis-h"></i>'
      );
    }

    // fetch posts
    debounce(this.handleFetchPosts, 500).bind(this)(e);
  }

  handleFetchPosts() {
    if (this.searchValue.length === 0) {
      this.clear();

      return this.formResults.classList.add('hidden');
    }

    fetch(`/wp-json/wp/v2/posts?search=${this.searchValue}`).then(res => {
      res.json().then(posts => {
        this.responseItems = posts.map(post => {
          return {
            slug: post.slug,
            title: post.title.rendered,
          };
        });

        this.render();
      });
    });
  }

  render() {
    // remove all items
    while (this.formResults.firstChild) {
      this.formResults.removeChild(this.formResults.firstChild);
    }

    if (this.responseItems.length === 0) {
      // no results from api
      return this.formResults.insertAdjacentHTML(
        'afterbegin',
        `<div class="na-search-results-item btn">No results found</div>`
      );
    }

    this.formResults.classList.remove('hidden');

    this.responseItems.forEach(result => {
      this.formResults.insertAdjacentHTML(
        'afterbegin',
        `<button type="button" class="js-search-results-item na-search-results-item btn" data-slug="${result.slug}">${result.title}</button>`
      );
    });

    this.dropdownElements = Array.prototype.slice.call(
      this.form.querySelectorAll('.js-search-results-item')
    );

    this.dropdownEvents();
  }
}

export default SearchForm;
