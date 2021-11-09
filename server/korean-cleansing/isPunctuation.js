module.exports = {
    isPunctuation: function (str, options) {

        if (
            options !== undefined &&
            options.removeSpace
        )
            str = str.replace(/(\s*)/g, "");

        var result = [];

        for (var i = 0; i < str.length; i++) {
            let tabless = str.replace('\t', " ");
            // let punctuationless = tabless.replace(/(~|`|!|@|#|$|%|^|&|\*|\(|\)|{|}|\[|\]|;|:|\"|'|<|,|\.|>|\?|\/|\\|\||-|_|\+|=)/g, "")
            let punctuationless = tabless.replace(/(~|`|!|@|#|$|%|^|&|\*|\(|\)|{|}|\[|\]|:|\"|<|>|\?|\\|\||-|_|\+|=)/g, "")
            let finalString = punctuationless.replace(/\s{2,}/g, " ");
            result.push(finalString);
        }
        return result;
    },
}