import galleryItems from './gallery-items.js';

const galleryRef = document.querySelector('.js-gallery');

// 1.Render Gallery
const createGallery = galleryItems.map(
  item =>
    `<li class="gallery__item"> <a class="gallery__link" href="${item.original}">
    <img class="gallery__image" src="${item.preview}" data-source="${item.original}" alt="${item.description}">
    </a>
    </li>
    `,
);
galleryRef.insertAdjacentHTML('beforeend', [...createGallery].join(''));

//2. делегирования на галерее ul.js-gallery и получение url большого изображения
galleryRef.addEventListener('click', onImageClick);

function onImageClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') return;

  const activeURL = event.target.dataset.source;
  const imgDescr = event.target.alt;

  replaceImageSRC(activeURL, imgDescr);
}

//3. Модальное окно
const lightBox = document.querySelector('.js-lightbox');
const lightBoxImage = document.querySelector('.lightbox__image');
galleryRef.addEventListener('click', openModal);

function openModal(event) {
  window.addEventListener('keydown', closeModalOnEsc);
  if (event.target.nodeName !== 'IMG') return;
  lightBox.classList.add('is-open');
}

//4.Подмена значения атрибута src элемента img.lightbox__image. передана колбеком в  onImageClick
const replaceImageSRC = (url, alt) => {
  lightBoxImage.setAttribute('src', `${url}`);
  lightBoxImage.setAttribute('alt', `${alt}`);
};

//5. Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"], overlay,ESC
const closeBtn = document.querySelector('[data-action="close-lightbox"]');
const closeOnOverlay = document.querySelector('.lightbox__overlay');
closeBtn.addEventListener('click', closeModal);
closeOnOverlay.addEventListener('click', closeModalOnOverlay);

function removeImageSRC() {
  lightBoxImage.setAttribute('src', '');
  lightBoxImage.setAttribute('alt', '');
}

function closeModal() {
  window.removeEventListener('keydown', closeModalOnEsc);
  lightBox.classList.remove('is-open');
  //6. При закрытии очищаем src и alt
  removeImageSRC();
}

function closeModalOnOverlay(event) {
  if (!event.target === event.currentTarget) return;
  closeModal();
}

function closeModalOnEsc(event) {
  if (event.key !== 'Escape') return;
  closeModal();
}
