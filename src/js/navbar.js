// navbar
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');
const dropdowns = document.querySelectorAll('.nav-item.dropdown');

// toggle navbar
navbarToggler.addEventListener('click', () => {
  navbarCollapse.classList.toggle('show');
});

function showDropdown(dropdown) {
  const menu = dropdown.querySelector('.dropdown-menu');

  if (!menu.classList.contains('show')) {
    menu.classList.add('show');
  }

  if (!dropdown.classList.contains('show')) {
    dropdown.classList.add('show');
  }
}

function hideDropdown(dropdown) {
  const menu = dropdown.querySelector('.dropdown-menu');

  if (menu.classList.contains('show')) {
    menu.classList.remove('show');
  }

  if (dropdown.classList.contains('show')) {
    dropdown.classList.remove('show');
  }
}

// toggle dropdowns
dropdowns.forEach(dropdown => {
  dropdown.addEventListener('mouseenter', e => showDropdown(e.target));
  dropdown.addEventListener('mouseleave', e => hideDropdown(e.target));
});

document.addEventListener('click', e => {
  if (e.target.classList.contains('dropdown')) {
    dropdowns.forEach(dropdown => hideDropdown(e.target));
  }
});
