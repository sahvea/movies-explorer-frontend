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