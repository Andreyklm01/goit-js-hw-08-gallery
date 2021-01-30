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
galleryRef.addEventListener('click', onImageClick);

function onImageClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') return;

  const activeURL = event.target.dataset.source;
  const imgDescr = event.target.alt;

  galleryRef.removeEventListener; //надо ли???

  openImage(activeURL, imgDescr);
}

//3. Модальное окно
const lightBox = document.querySelector('.js-lightbox');
const lightBoxImage = document.querySelector('.lightbox__image');

const openModal = event => {
  if (event.target.nodeName !== 'IMG') return;

  lightBox.classList.add('is-open');
};

galleryRef.addEventListener('click', openModal);

//4.Подмена значения атрибута src элемента img.lightbox__image. передана колбеком в  onImageClick
const openImage = (url, alt) => {
  lightBoxImage.setAttribute('src', `${url}`);
  lightBoxImage.setAttribute('alt', `${alt}`);
};

//5. Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"]
const closeBtn = document.querySelector('[data-action="close-lightbox"]');
closeBtn.addEventListener('click', closeModal);

function closeModal() {
  lightBox.classList.remove('is-open');
  //6. При закрытии очищаем src и alt
  lightBoxImage.setAttribute('src', '');
  lightBoxImage.setAttribute('alt', '');
  closeBtn.removeEventListener; // надо ли???
}
