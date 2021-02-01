'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

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

tabsContainer.addEventListener('click', function(evt) {
  const clicked = evt.target.closest('.operations__tab');
  
  if(!clicked) return;

  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  tabsContent.forEach(content => content.classList.remove('operations__content--active'));

  clicked.classList.add('operations__tab--active');
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
});

//Menu fade animation

const handleHover = function(evt) {
  if (evt.target.classList.contains('nav__link')) {
    const link = evt.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = this;
      }
    })

    logo.style.opacity = this;
  }
}

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

//Sticky navigation

const header = document.querySelector('.header');

const stickyNav = function(entries) {
  const [entry] = entries;

  if (!entry.isIntersecting ) {
    nav.classList.add('sticky')
  } else {
    nav.classList.remove('sticky');
  }
};

const headerObserver = new IntersectionObserver(
  stickyNav, {
    root: null,
    threshold: 0
  }
);

headerObserver.observe(header);

//Reveal sections 

const allSections = document.querySelectorAll('.section');

const revalSection = function(entries, observer) {
  const [entry] = entries;

  console.log(entry);

  if(!entry.isIntersecting) {
    return;
  }
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(revalSection, {
  root: null,
  threshold: 0.15,
})

allSections.forEach(section => {
  section.classList.add('section--hidden');
  sectionObserver.observe(section);
})