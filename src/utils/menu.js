export function toggleHeaderBurger() {
  const burgerLines = document.querySelectorAll('.burger__line');
  const navigation = document.querySelector('.main-nav');
  const navigationMenu = navigation.querySelector('.main-nav__menu');

  burgerLines.forEach(line => {
    line.classList.toggle('burger__line_active');
  });
  navigation.classList.toggle('main-nav_visible');
  navigationMenu.classList.toggle('main-nav__menu_active');
}

export function switchClass() {
  const TABLET_WIDTH = 1024;
  const burgerLines = document.querySelectorAll('.burger__line');
  const burgerLineActive = document.querySelector('.burger__line_active');
  const navigation = document.querySelector('.main-nav');
  const navigationMenu = document.querySelector('.main-nav__menu');

  if (window.innerWidth <= TABLET_WIDTH && navigation) {
    navigation.classList.remove('main-nav_visible');
    navigationMenu.classList.remove('main-nav__menu_active');
  }

  if (burgerLineActive) {
    burgerLines.forEach(line => {
      line.classList.remove('burger__line_active');
    });
  }
}