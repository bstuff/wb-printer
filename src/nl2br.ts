/**
 * @url https://github.com/yosuke-furukawa/react-nl2br
 */

import { createElement } from 'react';

const newlineRegex = /(\r\n|\r|\n)/g;

/**
 * Разбивает строку по переносам строк и возвращает массив, в котором на месте переноса строк
 * стоит реактовский <br />
 * @param {string} str
 * @returns {Array}
 */
export function nl2br(str: string | number) {
    if (typeof str === 'number') {
        return str.toString();
    } else if (typeof str !== 'string') {
        return '';
    }

    return str.split(newlineRegex).map(function(line, index) {
        if (line.match(newlineRegex)) {
            return createElement('br', { key: index }); // eslint-disable-line react/no-array-index-key
        }

        return line;
    });
}
