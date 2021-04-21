// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]


// Add your functions below:


/* 

validateCred function:
return true if array of credit card is valid, false if invalid
uses luhn algorithm to determine validity :
  1. starting from right most digit, iterate to the left
  2. double every other digit but the last (far right)
  3. after doubling, if number > 9, subtract 9
  4. sum up all digits 
  5. if sum % 10 is 0 => card is valid!

*/
const validateCred = array => {
    //calls helper method getCardSum
    let sum = getCardSum(array);

    //if sum % 10 = 0, it is valid
    if (sum % 10 === 0){
        return true;
    }
    else {
        return false;
    }
}

//helper method to get sum
const getCardSum = array => {
    let sum = 0;
    let sub = 0;
    //start loop on digit before the checked digit
    
    for (let i = array.length-1; i >= 0; i--){
        let toAdd = 0;
        //if sub is even, just add to sum 
        if (sub % 2 === 0){
            toAdd = array[i];   
        }
        else { // else if odd, double and check
            toAdd = array[i] * 2;
            if (toAdd > 9){
                toAdd -= 9;
            }
        }
        sum = sum + toAdd;
        sub++;
    }
    return sum;
}


/*
findInvalidCards function:
Takes in a nested arrray of credit card numbers and checks through it for
which numbers are invalid.  Returns another nested array for just invalid cards
*/
const findInvalidCards = array => {
    let invalidCards = [];
    for (let i = 0; i < array.length; i++){
        //call validateCred to check if the credit card is valid
        //if its invalid, add it to invalidCards array
        if (!validateCred(array[i])){
            invalidCards.push(array[i]);
        }
    }
    return invalidCards;
}

/*
idInvalidCardCompanies function:
Takes in an array of invalid card numbers and returns an array of companies
using their first digits:
3 = Amex (American Express)
4 = Visa
5 = Mastercard
6 = Discover
else = Company not found

The returned array doesn't contain duplicates
*/
const idInvalidCardCompanies = array => {
    let companyArr = [];
    array.forEach(arr => {
        let company;
        switch (arr[0]){ //switch statement to map unique first digits with companies
            case 3:
                company = "Amex (American Express)";
                break;
            case 4:
                company = "Visa";
                break;
            case 5:
                company = "Mastercard";
                break;
            case 6:
                company = "Discover";
                break;
            default:
                company = "Company not found";
        }
        //if the company array doesn't have the company yet, add it
        if (!companyArr.includes(company)){
            companyArr.push(company);
        }
    });
    return companyArr;
}


console.log("Checking validity...");
console.log("Credit Valid Card 1: " + validateCred(valid1));
console.log("Credit Valid Card 2: " + validateCred(valid2));
console.log("Credit Valid Card 3: " + validateCred(valid3));

console.log("Credit Invalid Card 1: " + validateCred(invalid1));
console.log("Credit Invalid Card 1: " + validateCred(invalid2));
console.log("Credit Invalid Card 1: " + validateCred(invalid3));

console.log("Getting Invalid Card Companies... ");
console.log(idInvalidCardCompanies(findInvalidCards(batch)));


//Extra Challenges!

//Create a function that accepts a string and converts it into an 
//array of numbers 

const convertCard = str => {
    return str.split("");
}

console.log("Converting string card number to array...");
console.log(convertCard("48271047621837"));


//Create a function that will convert invalid numbers to valid numbers
// takes in an invalid number and will add a digit to the end to make it valid:
// so that the sum mod 10 = 0
const makeValid = array => {
    let resultArray = array;

    //temporarily push an extra digit to the array (0)
    //to calculate the sum with the extra digit added
    resultArray.push(0);
    let sum = getCardSum(resultArray);
    let digitToAdd = Math.abs(sum%10 - 10);

    //after calculating the digit to add, remove the temp digit, and add
    //the actual one
    resultArray.pop();
    resultArray.push(digitToAdd);
    return resultArray;
}

console.log("Making invalid credit cards valid...");
console.log(validateCred(invalid1));
console.log(validateCred(makeValid(invalid1)));
console.log(validateCred(invalid2));
console.log(validateCred(makeValid(invalid2)));
console.log(validateCred(invalid3));
console.log(validateCred(makeValid(invalid3)));
