import { auth, usersFavoriteColorSchemesRef } from './firebase.js';

export function createSchemeLi(schemeName) {
    const html = /*html*/ `
        <li class="scheme-display">
            <div id="upper-bar">
                <span class="favorite-heart">♡</span>
                <span id="scheme-name">${schemeName}</span>
                <form>
                    Rename: <input type="text" name="new-name">
                    <button>Save</button>
                </form>
            </div>
            <div id="scheme-colors"></div>
        </li>
    `;
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content;
}

export function createColorSection(color) {
    const html = /*html*/ `
        <section class="color-display">
            <p>#${color}</p>
            <div style="background-color: #${color};"></div>
        </section>
    `;
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content;
}


export function convertObjectToArray(data) {
    const keys = Object.keys(data);
    return keys.map(key => data[key]);
}

const favoritesContainer = document.getElementById('favorites-container');

export default function loadFavoriteSchemes(schemes, favoriteSchemeIds) {
    schemes.forEach((scheme, index) => {
        const favoriteDom = createSchemeLi(favoriteSchemeIds[index]);
        const schemeColors = favoriteDom.getElementById('scheme-colors');
        scheme.scheme.forEach(color => {
            const colorDom = createColorSection(color);
            schemeColors.appendChild(colorDom);
        });
        const schemeNameForm = favoriteDom.querySelector('form');
        const favoriteHeart = favoriteDom.querySelector('.favorite-heart');
        const userId = auth.currentUser.uid;
        const usersFavoritesRef = usersFavoriteColorSchemesRef.child(userId);
        const favoriteId = favoriteSchemeIds[index];
        let userFavoriteSchemeRef = usersFavoritesRef.child(favoriteId);
        schemeNameForm.addEventListener('submit', event => {
            event.preventDefault();
            const schemeNameFormData = new FormData(schemeNameForm);
            const newName = schemeNameFormData.get('new-name');
            console.log(newName);
            userFavoriteSchemeRef = newName;
            // might have to set a new ref in firebase where we save custom names
            // delete the unique id and load up both refs
        });
        userFavoriteSchemeRef.on('value', snapshot => {
            const value = snapshot.val();
            let isFavorite = false;
            if(value) {
                addFavorite();
            } else {
                removeFavorite();
            }
            function addFavorite() {
                isFavorite = true;
                favoriteHeart.textContent = '♥';
                favoriteHeart.classList.add('favorite');
            }
            function removeFavorite() {
                isFavorite = false;
                favoriteHeart.textContent = '♡';
                favoriteHeart.classList.remove('favorite');
            }
            favoriteHeart.addEventListener('click', () => {
                if(isFavorite) {
                    userFavoriteSchemeRef.remove();
                    removeFavorite();
                } else {
                    userFavoriteSchemeRef.set({
                        seedColor: scheme.seedColor,
                        scheme: scheme.scheme
                    });
                    addFavorite();
                }
            });
        });
        favoritesContainer.appendChild(favoriteDom);
    });
}
