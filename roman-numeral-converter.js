/*
Convert the given number into a roman numeral.

All roman numerals answers should be provided in upper-case.
*/

function convertToRoman(num) {
  //catch incorect values
  if (typeof num !== "number") {
    return "Invalid value";
  }

  if (num === 0) {
    return "nulla";
  }

  /* 
  function converter
  take some variable and arr of roman analogues
  return convert value
  */
  function converter(variable, arr) {
    if (variable === 0) {
      variable = "";
    }
    for (let i = 1; i <= 9; i++) {
      if (variable === i) {
        variable = arr[--i];
      }
    }
    return variable;
  }

  //change units
  function unitsConvert(i) {
    let units = arrFromNum[i];//access to units from array
    let alphabet = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];//units alphabet

    return converter(units, alphabet);
  }

  //change dozens
  function dozensConvert(j, i) {
    let dozens = arrFromNum[j];//access to dozens from array
    let alphabet = ["X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"]; //dozens alphabet

    return converter(dozens, alphabet) + unitsConvert(i);
  }

  //change hunreds
  function hundredsConvert(k, j, i) {
    let hundreds = arrFromNum[k];//access to hundreds from array
    let alphabet = ["C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"];//hundreds alphabet

    return converter(hundreds, alphabet) + dozensConvert(j, i);
  }

  //change thousands
  function thousandsConvert(l, k, j, i) {
    let thousands = arrFromNum[l];////access to thousands from array
    let alphabet = ["M", "MM", "MMM", "MV", "V", "VM", "VMM", "VMMM", "MX"];//thousands alphabet

    return converter(thousands, alphabet) + hundredsConvert(k, j, i);
  }

  //convert input num to array
  let arrFromNum = Array.from(String(num), Number);

  /*
  take length of array 
  to know number place value system:
    1 is units
    2 is dozens
    3 is hundreds
    4 is thousands
  */
  let lengthOfArr = arrFromNum.length;

  switch (lengthOfArr) {
    case 1: return unitsConvert(0);

    case 2: return dozensConvert(0, 1);

    case 3: return hundredsConvert(0, 1, 2);

    case 4: return thousandsConvert(0, 1, 2, 3);

    default:
      return "unkown error";
  }
}

console.log(convertToRoman(10));
console.log(convertToRoman(9));
console.log(convertToRoman(45));
console.log(convertToRoman(649));
console.log(convertToRoman(1006));
console.log(convertToRoman(3999));
