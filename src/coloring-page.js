import loadHeader from './header-component.js';
import littleDude from '../assets/little-dude.js';
import { auth, usersFavoriteColorSchemesRef } from './firebase.js';
import { loadSchemesList } from './coloring-component.js';
import { convertObjectToArray } from './favorite-component.js';
const coloringContainer = document.getElementById('coloring-container');

loadHeader();

let coloringColor;

auth.onAuthStateChanged(user => {
    const userId = user.uid;
    const userFavoritesRef = usersFavoriteColorSchemesRef.child(userId);
    userFavoritesRef.once('value')
        .then(snapshot => {
            const data = snapshot.val();
            const favoriteSchemesIds = Object.keys(data);
            const favoriteSchemes = convertObjectToArray(data);
            loadSchemesList(favoriteSchemesIds, favoriteSchemes, updateColor => {
                coloringColor = updateColor;
            });
        });
});

const template = document.createElement('template');
template.innerHTML = littleDude;
const littleDudeDom = template.content;

const paths = littleDudeDom.querySelectorAll('path');

paths.forEach(path => {
    path.addEventListener('click', () => {
        path.setAttribute('fill', coloringColor);
    });
});
const circles = littleDudeDom.querySelectorAll('circle');

circles.forEach(circle => {
    circle.addEventListener('click', () => {
        circle.setAttribute('fill', coloringColor);
    });
});
const polygons = littleDudeDom.querySelectorAll('polygon');

polygons.forEach(polygon => {
    polygon.addEventListener('click', () => {
        polygon.setAttribute('fill', coloringColor);
    });
});

coloringContainer.appendChild(littleDudeDom);