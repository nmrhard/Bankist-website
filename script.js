'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

///////////////////////////////////////
// Modal window

const openModal = function (evt) {
  evt.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => {
  btn.addEventListener('click', openModal);
})

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//Pagination

document.querySelector('.nav__links').addEventListener('click', function(evt) {
  evt.preventDefault();

  if (evt.target.classList.contains('nav__link')) {
    const id = evt.target.getAttribute('href');
    const section = document.querySelector(id);

    window.scrollTo({
      left: section.offsetLeft + window.pageXOffset, 
      top: section.offsetTop + window.pageYOffset,
      behavior: 'smooth'
    })
  }
})

//Tabs component

const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function(evt) {
  const clicked = evt.target.closest('.operations__tab');
  
  if(!clicked) return;

  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  tabsContent.forEach(content => content.classList.remove('operations__content--active'));

  clicked.classList.add('operations__tab--active');
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
});