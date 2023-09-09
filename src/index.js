import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { createMarkup } from './js/img_markup';
import { getImages } from './js/img_get';

const elements = {
  form: document.querySelector(".search-form"),
  input: document.querySelector(".input-search"),
  gallery: document.querySelector(".gallery"),
  loadMore: document.querySelector(".js-load-more")
}
export const imgPerPage = 40;
export let page;

elements.form.addEventListener('submit', submitHandler);
elements.loadMore.addEventListener('click', loadMoreHandler);

async function submitHandler(evt) {
  try {
    evt.preventDefault();
    page = 1;
    const { searchQuery } = evt.currentTarget.elements;
    const images = await getImages(searchQuery.value);
    elements.gallery.innerHTML = '';
    // checking if user has entered any keyword
    if (searchQuery.value === '') {
      Notify.warning("Enter a keyword to get results.");
      return;
    }
    elements.gallery.insertAdjacentHTML("afterbegin", createMarkup(images));
    // hiding/showing Load more button
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
