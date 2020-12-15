import {refs} from '../js/refs';
import template from '../templates/template.hbs';

export const createMarkup = (images) => {
    let markup = template(images)
    refs.galleryList.insertAdjacentHTML('beforeend', markup)
}