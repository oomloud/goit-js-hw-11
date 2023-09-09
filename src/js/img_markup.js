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

export { createMarkup };