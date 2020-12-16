import './styles.css';
import {refs} from './js/refs';
import fetchImg from './js/fetchImg';
import debounce from 'lodash.debounce';
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
            createMarkup(data);
            page+=1;
            refs.btnLoad.style.display = "block";
        })
        .catch(error => console.log(error))
};

const getForm = (event) => {
    event.preventDefault();
    console.log(event);
    if (refs.input.value === '') {
        refs.galleryList.innerHTML = '';
        refs.btnLoad.style.display = "none";
    } else {
        page = 1;
        refs.galleryList.innerHTML = '';
       loadImages(refs.input.value);
    }
    return false;
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

const runScript = (event) => {
    event.preventDefault();
    
    console.log(event);
    return false;
}

//refs.input.addEventListener('input', debounce(getForm, 500));
refs.form.addEventListener('submit', getForm);
refs.btnLoad.addEventListener('click', loadMore);

// const myError = error({
//           text: "Сountry not found. Please, try to enter again.",
//           maxTextHeight: null,
//           delay: 3000,
//           type: 'error'
//         });

















// let inputValue; 
// //let page = 1;
// //refs.btnLoad.style.display = "none";

// const getFormSubmit = (event) => {
//     event.preventDefault();
//     refs.galleryList.innerHTML = '';
//     inputValue = event.target.elements.query.value;
//     if (inputValue.length > 1) {
//         fetchImg(inputValue, page, API_KEY)
//             .then(images =>{
//                 console.log(images)
//                 createMarkup(images)
//                 //refs.btnLoad.style.display = "block";
//             })
//         .catch(err => console.log(err))
//     }
   
// }

// refs.form.addEventListener('input', getFormSubmit)