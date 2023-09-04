// TODO: BONUS: add switcher between page loading and infinite scroll
// Створи фронтенд частину застосунку пошуку і перегляду зображень за ключовим словом. Додай оформлення елементів інтерфейсу.
// Для бекенду використовуй публічний API сервісу Pixabay. Зареєструйся, отримай свій унікальний ключ доступу і ознайомся з документацією.
// Елемент div.gallery спочатку міститься в HTML документі, і в нього необхідно рендерити розмітку карток зображень. Під час пошуку за новим ключовим словом необхідно повністю очищати вміст галереї, щоб не змішувати результати.
// Pixabay API підтримує пагінацію і надає параметри page і per_page. Зроби так, щоб в кожній відповіді приходило 40 об'єктів (за замовчуванням 20).
// В початковому стані кнопка повинна бути прихована.
// Після першого запиту кнопка з'являється в інтерфейсі під галереєю.
// При повторному сабміті форми кнопка спочатку ховається, а після запиту знову відображається.
// У відповіді бекенд повертає властивість totalHits - загальна кількість зображень, які відповідають критерію пошуку (для безкоштовного акаунту). Якщо користувач дійшов до кінця колекції, ховай кнопку і виводь повідомлення з текстом "We're sorry, but you've reached the end of search results.".

import axios from 'axios';


const elements = {
    form: document.querySelector(".search-form"),
    input: document.querySelector(".input-search"),
    gallery: document.querySelector(".gallery")
}

elements.form.addEventListener('submit', submitHandler);

const params = {
    method: 'get',
    baseURL: 'https://some-domain.com/api',
}

async function submitHandler(evt) {
    evt.preventDefault();
} 