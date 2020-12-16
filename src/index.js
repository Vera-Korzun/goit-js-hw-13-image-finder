import './styles.css';
import {refs} from './js/refs';
import fetchImg from './js/fetchImg';
import {createMarkup} from './js/createMarkup';

const {error} = require('@pnotify/core');
import '../node_modules/@pnotify/core/dist/PNotify.css'
import '../node_modules/@pnotify/core/dist/Angeler.css'
import '../node_modules/@pnotify/core/dist/BrightTheme.css'
import '../node_modules/@pnotify/core/dist/Material.css'

const API_KEY = '19534909-4566fefb162e8faacd9cf503d';
let page = 1;

const loadImages = (query) => {
    return fetchImg(query, page, API_KEY)
        .then(data => {
            if (data.length === 0) {
                refs.btnLoad.style.display = "none";
                const myError = error({
                    text: "No images found. Please, try again.",
                    maxTextHeight: null,
                    delay: 3000,
                     type: 'error'
                });
                console.log(myError);
            } else {
                createMarkup(data);
                page+=1;
                refs.btnLoad.style.display = "block";
            }
        })
        .catch(error => console.log(error))
};

const getForm = (event) => {
    event.preventDefault();
    if (refs.input.value === '') {
        refs.galleryList.innerHTML = '';
        refs.btnLoad.style.display = "none";
        const myError = error({
            text: "Nothing entered. Please, try again.",
            maxTextHeight: null,
            delay: 3000,
             type: 'error'
        });
        console.log(myError);
    } else {
        page = 1;
        refs.galleryList.innerHTML = '';
       loadImages(refs.input.value);
    }
}

const loadMore = () => {
    if (refs.input.value !== '') {
        loadImages(refs.input.value)
        .then(() => 
          window.scrollTo({
            top: document.documentElement.offsetHeight,
            behavior: 'smooth',
          })
          )
        .catch(error => console.log(error))
    }
}

refs.form.addEventListener('submit', getForm);
refs.btnLoad.addEventListener('click', loadMore);