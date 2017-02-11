


/**
 * Truncates the title of a book to be less than the specified length, cutting
 * on the offending word. If the first word is longer than the maxLength
 * specified, it is cut off at the maxLength.
 */
export function truncateTitle(title, maxLength, ellipses){
    if(title.length < maxLength) return title;

    // Get the list of words so we can determine how many to keep.
    let words = title.split(' ');
    let res = words[0];

    if(res.length > maxLength){
        let cut = res.substr(0, maxLength);
        return ellipses ? cut + '...' : cut;
    }

    let i = 1;
    while((res + ' ' + words[i]).length < maxLength){
        res += ' ';
        res += words[i];
        i++;
    }
    return (i<(words.length-1) && ellipses) ? res + '...': res;
};
