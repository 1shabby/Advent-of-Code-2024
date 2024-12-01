"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
// Use real input: True = yes, False = no.
var input = false;
// Show debug logs: True = yes, False = no.
var logs = false;
// Stores the input split into new lines.
var split;
// Arrays used in the problem.
const array1 = [];
const array2 = [];
const array3 = [];
// Use the real input
if(input){
    var file = (0, fs_1.readFileSync)('../input', 'utf-8');
    split = file.split('\r\n');
}//else use the demo input from above
else{    
    // Split the input into lines and process
    var file = (0, fs_1.readFileSync)('../demo_input', 'utf-8');
    split = file.split('\r\n');
}
    
// Loop through each line and split the numbers
split.forEach(split => {
    const [num1, num2] = split.trim().split(/\s+/).map(Number);
    array1.push(num1);
    array2.push(num2);
});
// Sorts the arrays from smallest to largest
sortArray(array1);
sortArray(array2);

if(logs){
    console.log("Array 1:", array1);
    console.log("Array 2:", array2);
}
// Variable to track index.
var c = 0;
// Variable to track the sum.
var sum = 0;
// loop through each element in array1 and array2 then find the distance between each element at the same index and summate it.
while(c < array1.length){
    var element1 = array1[c];
    var element2 = array2[c];
    var element3 = Math.abs(element1 - element2);
    sum += element3;
    array3.push(element3)
    c++
}
if(logs)
console.log("Array 3:", array3);
console.log("Sum: " + sum);

// Function to sort array from smallest to largest elements
function sortArray(array){
    array.sort((a, b) => a - b);
}