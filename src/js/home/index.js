import Swiper from 'swiper';

export function initSwiper() {
  new Swiper('.js-swiper-container', {
    loop: true,

    autoplay: {
      delay: 3000
    },

    // If we need pagination
    pagination: {
      el: '.swiper-pagination'
    },

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  });
}
