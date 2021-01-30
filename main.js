import galleryItems from './gallery-items.js';

const galleryRef = document.querySelector('.js-gallery');
console.log(galleryRef);

// 1.Render Gallery
// const createGallery = galleryItems.map(item => {
//   //создание li в ul
//   const listItem = document.createElement('li');
//   listItem.classList.add('gallery__item');
//   galleryRef.appendChild(listItem);

//   //создание a в li и добавл класса и атрибутов
//   const listLink = document.createElement('a');
//   listLink.classList.add('gallery__link');
//   listLink.setAttribute('href', `${item.original}`);
//   listItem.appendChild(listLink);

//   //cоздание img в a и добавл класса и атрибутов
//   const listImg = document.createElement('img');
//   listImg.classList.add('gallery__image');
//   listImg.setAttribute('src', `${item.preview}`);
//   listImg.setAttribute('data-source', `${item.original}`);
//   listImg.setAttribute('alt', `${item.description}`);
//   listLink.appendChild(listImg);
// });

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
function onImageClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') return;

  const activeTag = event.target.dataset.source;
  console.log(activeTag);
}
galleryRef.addEventListener('click', onImageClick);

//3. Модальное окно
const lightBox = document.querySelector('.js-lightbox');
const lightBoxImage = document.querySelector('.lightbox__image');

const openModal = () => {
  lightBox.classList.add('is-open');
  const getImageScr = lightBoxImage.getAttribute('src');
};

galleryRef.addEventListener('click', openModal);
