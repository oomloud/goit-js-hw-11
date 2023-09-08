// TODO: BONUS: add switcher between page loading and infinite scroll
// Створи фронтенд частину застосунку пошуку і перегляду зображень за ключовим словом. Додай оформлення елементів інтерфейсу.
// В початковому стані кнопка повинна бути прихована.
// Після першого запиту кнопка з'являється в інтерфейсі під галереєю.
// При повторному сабміті форми кнопка спочатку ховається, а після запиту знову відображається.
// У відповіді бекенд повертає властивість totalHits - загальна кількість зображень, які відповідають критерію пошуку (для безкоштовного акаунту). Якщо користувач дійшов до кінця колекції, ховай кнопку і виводь повідомлення з текстом "We're sorry, but you've reached the end of search results.".

import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const elements = {
  form: document.querySelector(".search-form"),
  input: document.querySelector(".input-search"),
  gallery: document.querySelector(".gallery")
}

elements.form.addEventListener('submit', submitHandler);

const axios = require('axios');
const API_KEY = '1482357-ebc3f86fcb5bdf18b64ce1456';
let page = 1;

const params = {
  method: 'get',
  baseURL: 'https://pixabay.com/api/',
}

async function submitHandler(evt) {
  evt.preventDefault();
  const { searchQuery } = evt.currentTarget.elements;
  getImages(searchQuery.value)
    .then((data) => {
      elements.gallery.innerHTML = '';
      elements.gallery.insertAdjacentHTML("afterbegin", createMarkup(data))
      const blob = document.querySelector(".gallery-item-image");

      // elements.gallery.children.map(image => image)
    })
    .catch()
}

async function getImages(keyword) {
  const resp = await axios.get('https://pixabay.com/api/', {
    params: {
      key: API_KEY,
      q: keyword,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 40,
      page: page
    }
  });
  if (resp.status !== '200') {
    throw new Error(resp.statusText);
  }
  return resp.data.hits;
}

function createMarkup(arr) {
  let galleryItem = arr
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
      `<div class="gallery-item">
        <img class="gallery-item-image" src="${webformatURL}" alt="${tags}">      
        <ul class="gallery-item-stats">
          <li class="item-stat">
            <h6>Likes</h6>
            <p>${likes}</p>
         </li>
          <li class="item-stat">
            <h6>Views</h6>
            <p>${views}</p>
          </li>
          <li class="item-stat">
            <h6>Comments</h6>
            <p>${comments}</p>
          </li>
          <li class="item-stat">
            <h6>Downloads</h6>
            <p>${downloads}</p>
          </li>
        </ul>
      </div>`
    ).join('')
  return galleryItem;
}