module.exports = {
    isHangul: function (str, options) {
        if (
            options !== undefined &&
            options.removeSpace
        )
            str = str.replace(/(\s*)/g, "");

        var result = [];

        for (var i = 0; i < str.length; i++) {
            var uniChar = str.charCodeAt(i);

            if (
                options !== undefined &&
                options.onlyCombined
            )
                result.push(
                    uniChar >= 0xAC00 &&
                    uniChar <= 0xD7A3
                );
            else
                result.push(
                    (
                        uniChar >= 0x1100 &&
                        uniChar <= 0x11FF
                    ) ||
                    (
                        uniChar >= 0x3130 &&
                        uniChar <= 0x318F
                    ) ||
                    (
                        uniChar >= 0xAC00 &&
                        uniChar <= 0xD7A3
                    )
                );
        }
        return result;
    },
}