import galleryItems from './gallery-items.js';

// Main consts

const galleryList = document.querySelector('.gallery');

const lightBox = document.querySelector('.lightbox');
const lightBoxOverlay = document.querySelector('.lightbox__overlay');
// const lightBoxContent = document.querySelector('.lightbox__content');
const lightBoxImage = document.querySelector('.lightbox__image');
const lightBoxButton = document.querySelector('[data-action="close-lightbox"]');

// GalleryCreate

const createGallery = galleryItems.map(({ preview, original, description }) => {
    return `<li class="gallery__item">
    <a class="gallery__link" href="${original}">
    <img class="gallery__image" src="${preview}" 
    data-source="${original}" alt="${description}" />
  </a>
</li>`;
}).join('');
  
galleryList.insertAdjacentHTML('beforeend', createGallery);

// Open modal

galleryList.addEventListener('click', onClick);
function onClick(event) {
    event.preventDefault();
    if (event.target.nodeName !== 'IMG') {
        return;
    }
    openModal(event);
    const main = event.target.closest('.gallery__link');
    // lightBoxImage.src = main.getAttribute('href');
    lightBoxImage.src = event.target.dataset.source;
} 

function openModal() {
    lightBox.classList.add('is-open');
    window.addEventListener('keydown', onKey);
}

// Close modal

lightBoxButton.addEventListener('click', closeModal);

lightBoxOverlay.addEventListener('click', closeModal);

function closeModal() {
    lightBox.classList.remove('is-open');
    lightBoxImage.src = '';
    window.removeEventListener('keydown', onKey);
}

function onKey(event) {
    if (event.code === 'Escape') {
        closeModal(event);
    }
}