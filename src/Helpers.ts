export const Helpers = {

    /**
     * Check value is string or non.
     *
     * @param {any} value: The value to be tested.
     * @returns {boolean} If data type is string true. Otherwise it returns false.
     */
    isString: (value: any): value is string => {
        return typeof value === "string";
    },

    /**
     * Check value is object or non.
     *
     * @param {any} value: The value to be tested.
     * @returns {boolean} If data type is object true. Otherwise it returns false.
     */
    isObject: (value: any): value is object => {
        return typeof value === "object";
    },

    /**
     * Determine if the argument passed is a JavaScript function object.
     *
     * @param {any} obj: Object to test whether or not it is an array.
     * @returns {boolean} returns a Boolean indicating whether the object is a JavaScript function
     */
    isFunction: (value: any): value is (...args: any) => void => {
        return typeof value === "function";
    },

    /**
     * Check a value is number or non, if number then return true, otherwise return false.
     *
     * @param {string} value: Value can check number
     * @returns {boolean} if number then return true, otherwise return false.
     */
    isNumber: (value: any): value is number => {
        return typeof value === "number";
    },

    /**
     * Check Object is null or String null or empty.
     *
     * @param {object | string} value Object or String
     * @returns {boolean} if null or empty return true, otherwise return false.
     */
    isNullOrEmpty: (value: any): value is undefined | boolean => {
        return value === undefined || value === null || value === "";
    },

    /**
     * Trim space character (start, end) of input string.
     *
     * @param {string} value: Value for trim
     * @returns {string} String after trim, space start & end is removed
     */
    trim: (value: string): string => {
        return Helpers.isString(value) ? value.trim() : "";
    },

    /**
     * If value is string return value, otherwise return value.toString
     *
     * @param {string} value: Value
     * @returns {string} String or convert of value to string
     */
    ensureString: (value: any): string => {
        try {
            if (!Helpers.isNullOrEmpty(value)) {
                if (Helpers.isString(value)) {
                    return value;
                } else if (Helpers.isObject(value)) {
                    return JSON.stringify(value);
                } else {
                    return `${value}`;
                }
            }
        } catch (error) {
            return "";
        }
        return "";
    },

    /**
     * Convert size in bytes to KB, MB, GB or TB
     *
     * @param {number} bytes: Size convert
     * @returns {string} Value formatted include unit.
     */
    bytesToSize: (bytes: number): string => {
        const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
        if (Helpers.isNullOrEmpty(bytes) || (bytes === 0)) {
            return "0 Byte";
        }
        const i = Math.floor(Math.floor(Math.log(bytes) / Math.log(1024)));
        return `${Math.round(bytes / Math.pow(1024, i))} ${sizes[i]}`;
    },

    /**
     * Format numbers with leading zeros
     *
     * @param num A number
     * @param size Sring output length
     * @returns String format with leading zero
     */
    zeroPad: (num: number, size: number): string => {
        let result = `${num}`;
        while (result.length < size) {
            result = "0" + result;
        }
        return result;
    },

    /**
     * Parse string or number to boolean.
     *
     * @param {any} value: String or Number
     * @returns {boolean} Value parsed
     */
    parseBoolean: (value: any): boolean => {
        if (Helpers.isNumber(value)) {
            return value === 1;
        }
        return "TRUE" === `${value}`.toUpperCase();
    },

    /**
     * Check a string is a valid JSON string
     *
     * @param {string} str String check
     */
    isJsonString: (str: string): boolean => {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    },

    stringToLatLng: (value: any): number => {
        if (Helpers.isNumber(value)) {
            return value;
        }
        const result = parseFloat(`${value}`.replace(",", "."));
        return isNaN(result) ? 0 : result;
    },

    isLessThanZero: (value: number): boolean => {
        return value === undefined || value < 1;
    },

    readAGroupOfThreeNumber: (threeNumberToRead: number, alwaysReadHundreds: boolean): string => {
        const numberWords = [
            " không ", " một ", " hai ", " ba ", " bốn ", " năm ", " sáu ", " bảy ", " tám ", " chín "
        ];

        let result = "";
        const hundreds = parseInt((threeNumberToRead / 100).toString(), 0);
        const dozends = parseInt((threeNumberToRead % 100 / 10).toString(), 0);
        const units = parseInt((threeNumberToRead % 10).toString(), 0);

        if (hundreds === 0 && dozends === 0 && units === 0) {
            return " ";
        }
        if (hundreds !== 0) {
            result += numberWords[hundreds] + "trăm ";
            if ((dozends === 0) && (units !== 0)) {
                result += " lẻ ";
            }
        } else if (alwaysReadHundreds) {
            result += (numberWords[hundreds] + "trăm ");
            if ((dozends === 0) && (units !== 0)) {
                result += (" lẻ ");
            }
        }

        if ((dozends !== 0) && (dozends !== 1)) {
            result += (numberWords[dozends] + " mươi");
            if ((dozends === 0) && (units !== 0)) {
                result += (" lẻ ");
            }
        }
        if (dozends === 1) {
            result += (" mười ");
        }

        switch (units) {
            case 1:
                if (dozends !== 0 && dozends !== 1) {
                    result += (" mốt ");
                } else {
                    result += (numberWords[units]);
                }
                break;
            case 5:
                if (dozends === 0) {
                    result += (numberWords[units]);
                } else {
                    result += (" lăm ");
                }
                break;
            default:
                if (units !== 0) {
                    result += (numberWords[units]);
                }
                break;
        }
        return result;
    },

    readAGroupOfNineNumber: (inputNumbers: string): string => {
        const cardinalNumber = [
            " ", " nghìn", " triệu", " tỷ", " nghìn tỷ", " triệu tỷ", " tỷ tỷ"
        ];
        let result = "";
        const db = (inputNumbers.length - 1) / 3;
        const unitsNumber = Math.floor(db);
        let from = 0;
        let to = 3;
        let alwaysReadHundreds = false;
        while (inputNumbers.length % 3 !== 0) {
            inputNumbers = "0" + inputNumbers;
        }
        for (let i = unitsNumber; i >= 0; i--) {
            const subSoTien = inputNumbers.substr(from, to);
            from = from + 3;
            to = 3;
            if (parseInt(subSoTien, 0) > 0) {
                result = result + Helpers.readAGroupOfThreeNumber(
                    parseInt(subSoTien, 0), alwaysReadHundreds) + cardinalNumber[i];
            } else if (cardinalNumber[i] === " tỷ") {
                result = result + " tỷ";
            }
            alwaysReadHundreds = true;

        }
        return result;
    },

    numberToVietnameseWords: (inputNumber: number): string => {
        let textNumber = inputNumber.toString();

        if (inputNumber === 0) {
            return "Không";
        }
        // By default
        // this function will read every 3 number character at one
        // So, We may need to append one or more `zero` number to make sure the input number
        // meet the required format
        while (textNumber.length % 3 !== 0) {
            textNumber = "0" + textNumber;
        }

        let result = "";
        const iNumOfBillion = Math.ceil(textNumber.length * 1.0 / 9);
        // number of character remain in `billion-part-input` Ex: 1,000,000,000-> remain = 1
        const iNumOfRemainChar = textNumber.length % 9;
        let iTake = 9;
        let iBeginSubStr = 0;
        let sMoneyPart;
        if (iNumOfRemainChar !== 0) {
            iTake = iNumOfRemainChar;
        }
        for (let bilIdx = iNumOfBillion; bilIdx > 1; bilIdx--) {
            sMoneyPart = textNumber.substr(iBeginSubStr, iTake);
            iBeginSubStr += iTake;
            result += Helpers.readAGroupOfNineNumber(sMoneyPart);
            result += (" tỷ");
            iTake = 9;
        }
        sMoneyPart = textNumber.substr(iBeginSubStr, iTake);
        result += Helpers.readAGroupOfNineNumber(sMoneyPart);
        result.replace("  ", " ");
        result.replace("  ", " ");
        result = result.trim();
        // upper case first letter
        if (result.length > 0) {
            let firstChar = result.substr(0, 1);
            firstChar = firstChar.toUpperCase();
            result = Helpers.replaceAt(result, 0, firstChar);
        }

        return result;
    },

    replaceAt: (inputStr: string, index: number, character: string): string => {
        if (index < 0 || index >= inputStr.length) {
            console.log(index + "index over string length");
            return inputStr;
        }
        return inputStr.substring(0, index) +
            character +
            inputStr.substring(index + character.length);
    },

    numberRoundToMillion: (input: number): number => {
        const mil = parseInt((input / 1000000).toString(), 0) * 1000000;
        let div = input % 1000000;
        if (div < 500000) {
            div = 0;
        } else {
            div = 1000000;
        }
        return mil + div;
    },

    numberWithCommas: (x?: number) => {
        if (x === undefined) {
            return 0;
        }
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    base64ToHex: (base64: string, upper: boolean = true) => {
        const hexCode = new Buffer(base64, "base64");
        const result = hexCode.toString("hex");
        return upper ? result.toUpperCase() : result;
    }
};