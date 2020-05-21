// hover events
const dropdowns = Array.prototype.slice.call(
  document.querySelectorAll('.nav-item.dropdown')
);

dropdowns.forEach(dropdown => {
  dropdown.addEventListener('mouseenter', function () {
    this.classList.add('show');
    this.querySelector('.dropdown-menu').classList.add('show');
  });

  dropdown.addEventListener('mouseleave', function () {
    this.classList.remove('show');
    this.querySelector('.dropdown-menu').classList.remove('show');
  });
});

// search form submit event
const searchForm = document.querySelector('.js-search-form');

searchForm.addEventListener('submit', e => {
  e.preventDefault();

  console.log('form submitted');
});

// mobile nav click event
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

navbarToggler.addEventListener('click', () => {
  navbarCollapse.classList.toggle('show');
});
