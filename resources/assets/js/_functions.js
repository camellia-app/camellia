'use strict';

/**
  * Chunks array.
  *
  * This method splits array into equal chunks
  * and allows to balance them.
  *
  * @since 1.0.0
  *
  * @param int  chunksCount How much chunks to create.
  * @param bool balanced    Balance array.
  *
  * @return array Chunked array.
  */
Array.prototype.chunk = function(chunksCount, balanced = true) {
    let self = this;

    if (chunksCount < 2) {
        return [self];
    }

    let ret = [];
    let i = 0;
    let arraySize = self.length;

    if (arraySize % chunksCount === 0) {
        let size = Math.floor(arraySize / chunksCount);

        while (i < arraySize) {
            ret.push(self.slice(i, i += size));
        }

    } else if (balanced) {
        while (i < arraySize) {
            let size = Math.ceil((arraySize - i) / chunksCount--);

            ret.push(self.slice(i, i += size));
        }

    } else {
        chunksCount--;

        let size = Math.floor(arraySize / chunksCount);

        if (arraySize % size === 0) {
            size--;
        }

        while (i < size * chunksCount) {
            ret.push(self.slice(i, i += size));
        }

        ret.push(self.slice(size * chunksCount));
    }

    return ret;
}

/**
  * Flattens recursive arrays.
  *
  * This method flattens nested & recursive arrays
  * into one-level array by recursion key.
  *
  * @since 1.0.0
  *
  * @param string recursionKey Name of the key used in nesting.
  *
  * @return array Flatten array.
  */
Array.prototype.flatten = function(recursionKey) {
    let ret = [];

    this.forEach((item) => {
        let isFolder = typeof item[recursionKey] === 'object';

        if (isFolder) {
            ret = ret.concat(item[recursionKey].flatten(recursionKey));
        } else {
            ret.push(item);
        }
    });

    return ret;
}

/**
  * Generates random integer in given range.
  *
  * @since 1.0.0
  *
  * @param int min Minimal possible value.
  * @param int max Maximal possible value.
  *
  * @return array Random integer.
  */
export let getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
  * Highlight word from string in given format.
  *
  * @since 1.0.0
  *
  * @param string word        Word to search for.
  * @param string replacement Replacement. For replacement should
  *                           contain '$1', e.g. '<mark>$1</mark>'.
  *
  * @return array String with highlighted word.
  */
String.prototype.highlight = function(word, replacement) {
     let regex = new RegExp('(' + word + ')', 'gi');

     return this.replace(regex, replacement);
}

/**
  * Creates object with localizations.
  *
  * @since 1.0.0
  *
  * @param array messages Array of message names from _locales/.../messages.json.
  *                       Each array value shound be string or array.
  *
  * @return object Contains all passed localizations. Key is string Name
  *                and value is localized string.
  */
export let i18nObject = messages => {
    let ret = {};

    messages.forEach(message => {
        if (typeof message === 'string') {
            ret[message] = browser.i18n.getMessage(message);
        } else if (Array.isArray(message) === true && message.length > 1) {
            let messageName = message.shift();
            ret[messageName] = browser.i18n.getMessage(messageName, message);
        }
    });

    return ret;
}

/**
  * Escapes some symbols used in HTML to prevent XSS.
  *
  * @since 1.0.0
  *
  * @return string Escaped string.
  */
String.prototype.encodeHTML = function () {
    return this.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
};

/**
  * Rounds number that bigger than 1000.
  *
  * @since 1.3.0
  *
  * @return string|int Rounded to thousands number.
  */
Number.prototype.roundThousands = function () {
    return this > 999
        ? (this / 1000).toFixed(1) + 'k'
        : this;
}