// navbar
const navbarToggler = document.querySelector(
  '.navbar-toggler'
) as HTMLButtonElement;
const navbarCollapse = document.querySelector(
  '.navbar-collapse'
) as HTMLButtonElement;
const dropdowns = document.querySelectorAll('.nav-item.dropdown') as NodeList;

// toggle navbar
navbarToggler.addEventListener('click', () => {
  navbarCollapse.classList.toggle('show');
});

function showDropdown(dropdown: HTMLElement) {
  const menu = dropdown.querySelector('.dropdown-menu') as HTMLElement;

  if (!menu.classList.contains('show')) {
    menu.classList.add('show');
  }

  if (!dropdown.classList.contains('show')) {
    dropdown.classList.add('show');
  }
}

function hideDropdown(dropdown: HTMLElement) {
  const menu = dropdown.querySelector('.dropdown-menu') as HTMLElement;

  if (menu.classList.contains('show')) {
    menu.classList.remove('show');
  }

  if (dropdown.classList.contains('show')) {
    dropdown.classList.remove('show');
  }
}

// toggle dropdowns
dropdowns.forEach(dropdown => {
  dropdown.addEventListener('mouseenter', (e: MouseEvent) => {
    const currentTarget = e.currentTarget as HTMLElement;

    showDropdown(currentTarget);
  });
  dropdown.addEventListener('mouseleave', (e: MouseEvent) => {
    const currentTarget = e.currentTarget as HTMLElement;

    hideDropdown(currentTarget);
  });
  dropdown.addEventListener('keydown', (e: KeyboardEvent) => {
    const currentTarget = e.currentTarget as HTMLElement;

    if (e.keyCode === 13 || e.keyCode === 40) {
      e.preventDefault();

      showDropdown(currentTarget);
    }
  });
});

document.addEventListener('click', (e: MouseEvent) => {
  const currentTarget = e.currentTarget as HTMLElement;

  if (currentTarget.classList.contains('dropdown')) {
    dropdowns.forEach(() => hideDropdown(currentTarget));
  }
});
