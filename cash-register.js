/* 
Design a cash register drawer function checkCashRegister() that accepts purchase price as the first argument (price), payment as the second argument (cash), and cash-in-drawer (cid) as the third argument.

cid is a 2D array listing available currency.

The checkCashRegister() function should always return an object with a status key and a change key.

Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer is less than the change due, or if you cannot return the exact change.

Return {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the key change if it is equal to the change due.

Otherwise, return {status: "OPEN", change: [...]}, with the change due in coins and bills, sorted in highest to lowest order, as the value of the change key.

Currency Unit	Amount
Penny	$0.01 (PENNY)
Nickel	$0.05 (NICKEL)
Dime	$0.1 (DIME)
Quarter	$0.25 (QUARTER)
Dollar	$1 (ONE)
Five Dollars	$5 (FIVE)
Ten Dollars	$10 (TEN)
Twenty Dollars	$20 (TWENTY)
One-hundred Dollars	$100 (ONE HUNDRED)
See below for an example of a cash-in-drawer array:

[
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
]
*/

function checkCashRegister(price, cash, cid) {
  //current cash
  let bank = 0;
  cid.map(x => bank += x[1]);

  //dividerst for every cash 
  let multiplicity = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];

  //change between cash and price
  let change = cash - price;

  //save value for checking
  let changeBuffer = change;

  //result array
  let result = [];

  // check whether the system has the necessary funds
  function need(number, divider) {
    return Math.trunc(number.toFixed(2) / divider) * divider;
  }

  //loop for every money type
  for (let i = 0; i < multiplicity.length; i++) {

    //take value name from input array
    let valueName = cid[8 - i][0];

    //take available cash
    let available = cid[8 - i][1];

    //if change less than available
    if (need(change, multiplicity[i]) < available) {

      //add value to result array
      result.push([valueName, need(change, multiplicity[i])]);

      //change the rest (how much more money is needed)
      change -= need(change, multiplicity[i]);
    } else if (available != 0) {
      //or if have some money, give them
      result.push([valueName, available]);
      
      //change the rest
      change -= available;
    }
  }

  //check result change
  let checkSum = 0;
  result.map(x => checkSum += x[1]);
  
  //if changeSum less than needed change 
  if (checkSum.toFixed(2) < changeBuffer) {
    //output error
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  } else if (checkSum.toFixed(2) == bank) {
    //if change take all cash 
    
    //closed cash register  
    return { status: "CLOSED", change: cid}
  } else {
    //filter output array from zero values
    
    //copy all zeros from result array
    let zerosValues = [];// for zeros value
    for (let j = 0; j < result.length; j++) {
      if(result[j][1] == 0){
        zerosValues.push(result[j])
      }
    }

    //take difference between result and zerosValues 
    let difference  = result.filter(x => !zerosValues.includes(x));

    //if everything alright
    
    //return status OPEN and change without zero
    return { status: "OPEN", change: difference  }
  }
}
console.log(checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));//96.74
console.log(checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));
console.log(checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 1], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));
console.log(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));