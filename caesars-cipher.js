/*
One of the simplest and most widely known ciphers is a Caesar cipher, also known as a shift cipher. In a shift cipher the meanings of the letters are shifted by some set amount.

A common modern use is the ROT13 cipher, where the values of the letters are shifted by 13 places. Thus 'A' ↔ 'N', 'B' ↔ 'O' and so on.

Write a function which takes a ROT13 encoded string as input and returns a decoded string.

All letters will be uppercase. Do not transform any non-alphabetic character (i.e. spaces, punctuation), but do pass them on.
*/

function rot13(str) {
    //split str to get every word in sentence
    let splitterStr = str.split(" ");
    let result = [];

    // function for reverse char to correct
    function reverser(arr) {
        let charCodeBefore, charCodeAfter, convertedWord = [];

        for (let i = 0; i < arr.length; i++) {
            //get ascii code of input char
            charCodeBefore = arr[i].charCodeAt(0);

            /*
            if ascii code < 65 it's mean than char is non-alphabetic character
            add to result word without changes 
            */
            if(charCodeBefore < 65){
                charCodeAfter = String.fromCharCode(charCodeBefore);
                convertedWord += charCodeAfter;
                break;
            }

            /*
            if result of try to convert from Caesars Cipher(13) < 65 
            it's mean char try to convert to non-alphabetic character
            correct convert is reverse cipher step
            and add to result
            */
            if (charCodeBefore - 13 < 65) {
                charCodeAfter = String.fromCharCode(charCodeBefore + 13);
                convertedWord += charCodeAfter;
            } else {
            /* 
            if all is alright just convert from Caesars Cipher(13)
            and add to result
            */
                charCodeAfter = String.fromCharCode(charCodeBefore - 13);
                convertedWord += charCodeAfter;
            }
        }
        //return finish converted word
        return convertedWord;
    }

    for (let i = 0; i < splitterStr.length; i++) {
        //get every word
        let word = splitterStr[i];
        /*
        call reverser func for every word in input string
        add push result to result array
        */

        result.push(reverser(word.split("")));
    }
    //return converted sentence with spaces
    return result.join(" ");
}

console.log(rot13("SERR PBQR PNZC"));
console.log(rot13("SERR CVMMN!"));
console.log(rot13("SERR YBIR?"));
console.log(rot13("GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT."));
console.log(rot13("LBH QVQ VG!"));