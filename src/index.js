// TODO: BONUS: add switcher between page loading and infinite scroll
// Створи фронтенд частину застосунку пошуку і перегляду зображень за ключовим словом. Додай оформлення елементів інтерфейсу.
// При повторному сабміті форми кнопка спочатку ховається, а після запиту знову відображається.
// У відповіді бекенд повертає властивість totalHits - загальна кількість зображень, які відповідають критерію пошуку (для безкоштовного акаунту). Якщо користувач дійшов до кінця колекції, ховай кнопку і виводь повідомлення з текстом "We're sorry, but you've reached the end of search results.".

import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const elements = {
  form: document.querySelector(".search-form"),
  input: document.querySelector(".input-search"),
  gallery: document.querySelector(".gallery"),
  loadMore: document.querySelector(".js-load-more")
}

elements.form.addEventListener('submit', submitHandler);
elements.loadMore.addEventListener('click', loadMoreHandler);

const axios = require('axios');
const API_KEY = '1482357-ebc3f86fcb5bdf18b64ce1456';
const imgPerPage = 40;
let page = 1;

async function submitHandler(evt) {
  try {
    evt.preventDefault();
    const { searchQuery } = evt.currentTarget.elements;
    const images = await getImages(searchQuery.value);
    elements.gallery.innerHTML = '';
    elements.gallery.insertAdjacentHTML("afterbegin", createMarkup(images));
    if (page * imgPerPage < images.totalHits) {
      elements.loadMore.classList.replace('load-more-hidden', 'load-more');
    }
    if (images.totalHits === 0) {
      Notify.failure("Sorry, there are no images matching your search query.Please try again.");
    } else {
      Notify.success(`Hooray! We found ${images.totalHits} images! But with premium account you can get access to ${images.total - images.totalHits} more!`)
    }
  }
  catch {
    elements.loadMore.classList.replace('load-more', 'load-more-hidden');
  }


}


async function loadMoreHandler(evt) {

  try {
    page += 1;
    const keyword = elements.input.value;
    const images = await getImages(keyword);
    elements.gallery.insertAdjacentHTML("beforeend", createMarkup(images));
    if (page * imgPerPage >= images.totalHits) {

      elements.loadMore.classList.replace('load-more', 'load-more-hidden');
    }
  }
  catch {
    elements.loadMore.classList.replace('load-more', 'load-more-hidden');
  }
}

// getting response from server based on keyword
async function getImages(keyword) {
  console.log(page);
  const resp = await axios.get('https://pixabay.com/api/', {
    params: {
      key: API_KEY,
      q: keyword,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: imgPerPage,
      page: page
    },
    responseType: 'json',
    headers: {
      "Accept": "application/json",
    }
  });
  console.log(resp);
  if (resp.status != '200') {
    Notify.failure("Ooops, something aweful happened. Please try again.");
    throw new Error(resp.statusText);
  }
  return resp.data;
}

function createMarkup(arr) {
  let galleryItem = arr.hits
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