import { createSchemeLi, createColorSection } from '../src/favorite-component.js';

const test = QUnit.test;
QUnit.module('favorites page test');

test('create dom for faves', assert => {
    // arrange
    const expected = /*html*/ `
        <li class="scheme-display">
            <div id="upper-bar">
                <span class="favorite-heart">♡</span>
                <span id="scheme-name">20acddanalogic5</span>
                <form>
                    Rename: <input type="text" name="new-name">
                    <button>Save</button>
                </form>
            </div>
            <div id="scheme-colors"></div>
        </li>
    `;
    const schemeName = '20acddanalogic5';
    // act
    const result = createSchemeLi(schemeName);

    // assert
    assert.htmlEqual(result, expected);
});


test('function will create color section for each color in array', assert => {
    //arrange
    const color = '74fdbf';

    const expected = /*html*/ `
        <section class="color-display">
            <p>#74fdbf</p>
            <div style="background-color: #74fdbf;"></div>
        </section>
    `;
    //act
    const result = createColorSection(color);
    //assert

    assert.htmlEqual(result, expected);

});


