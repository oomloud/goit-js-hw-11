

import axios from 'axios';
import { imgPerPage, page } from '..';

const API_KEY = '1482357-ebc3f86fcb5bdf18b64ce1456';


// getting response from server based on keyword
export async function getImages(keyword) {
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
    if (resp.status != '200') {
        Notify.failure("Ooops, something aweful happened. Please try again.");
        throw new Error(resp.statusText);
    }
    return resp.data;
}

