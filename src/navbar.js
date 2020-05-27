// navbar
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');
const dropdowns = Array.prototype.slice.call(
  document.querySelectorAll('.nav-item.dropdown')
);

// toggle navbar
navbarToggler.addEventListener('click', () => {
  navbarCollapse.classList.toggle('show');
});
// toggle dropdowns
dropdowns.forEach(dropdown => {
  dropdown.addEventListener('mouseenter', function () {
    this.searchValueSelector('.dropdown-menu').classList.add('show');
    this.classList.add('show');
  });
  dropdown.addEventListener('mouseleave', function () {
    this.searchValueSelector('.dropdown-menu').classList.remove('show');
    this.classList.remove('show');
  });
});
