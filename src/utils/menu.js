export function toggleHeaderBurger() {
  const headerBurgerLines = document.querySelectorAll('.header__burger-line');
  const navigation = document.querySelector('.navigation');
  const navigationMenu = navigation.querySelector('.navigation__menu');

  headerBurgerLines.forEach(line => {
    line.classList.toggle('header__burger-line_active');
  });
  navigation.classList.toggle('navigation_visible');
  navigationMenu.classList.toggle('navigation__menu_active');
}

export function switchClass() {
  const TABLET_WIDTH = 1024;
  const headerBurgerLines = document.querySelectorAll('.header__burger-line');
  const headerBurgerLineActive = document.querySelector('.header__burger-line_active');
  const navigation = document.querySelector('.navigation');
  const navigationMenu = document.querySelector('.navigation__menu');

  if (window.innerWidth <= TABLET_WIDTH && navigation) {
    navigation.classList.remove('navigation_visible');
    navigationMenu.classList.remove('navigation__menu_active');
  }

  if (headerBurgerLineActive) {
    headerBurgerLines.forEach(line => {
      line.classList.remove('header__burger-line_active');
    });
  }
}