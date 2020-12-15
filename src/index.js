import './styles.css';
import {refs} from './js/refs';
import fetchImg from './js/fetchImg';
import debounce from 'lodash.debounce';
import {createMarkup} from './js/createMarkup';

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
    if (event.target.value === '') {
        refs.galleryList.innerHTML = '';
        refs.btnLoad.style.display = "none";
    } else {
        page = 1;
       loadImages(event.target.value);
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
       
    }
}

refs.input.addEventListener('input', debounce(getForm, 500));

refs.btnLoad.addEventListener('click', loadMore);



















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