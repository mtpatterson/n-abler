// navbar
const navbarToggler = <HTMLButtonElement>(
  document.querySelector('.navbar-toggler')
);
const navbarCollapse = <HTMLButtonElement>(
  document.querySelector('.navbar-collapse')
);
const dropdowns = <NodeList>document.querySelectorAll('.nav-item.dropdown');

// toggle navbar
navbarToggler.addEventListener('click', () => {
  navbarCollapse.classList.toggle('show');
});

function showDropdown(dropdown: HTMLElement) {
  const menu = dropdown.querySelector('.dropdown-menu');

  if (!menu.classList.contains('show')) {
    menu.classList.add('show');
  }

  if (!dropdown.classList.contains('show')) {
    dropdown.classList.add('show');
  }
}

function hideDropdown(dropdown: HTMLElement) {
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
  dropdown.addEventListener('mouseenter', (event: MouseEvent) => {
    const currentTarget = event.currentTarget as HTMLElement;

    showDropdown(currentTarget);
  });
  dropdown.addEventListener('mouseleave', (event: MouseEvent) => {
    const currentTarget = event.currentTarget as HTMLElement;

    hideDropdown(currentTarget);
  });
  dropdown.addEventListener('keydown', (event: KeyboardEvent) => {
    const currentTarget = event.currentTarget as HTMLElement;

    if (event.keyCode === 13 || event.keyCode === 40) {
      event.preventDefault();

      showDropdown(currentTarget);
    }
  });
});

document.addEventListener('click', (e: MouseEvent) => {
  const target = e.target as HTMLElement;

  if (target.classList.contains('dropdown')) {
    dropdowns.forEach(() => hideDropdown(target));
  }
});
