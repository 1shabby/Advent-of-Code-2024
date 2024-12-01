"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
// Use real input: True = yes, False = no.
var input = false;
// Show debug logs: True = yes, False = no.
var logs = false;
var sum = 0;
// Stores the input split into new lines.
var split
// Arrays used in problem
const array1 = [];
const array2 = [];
const array3 = [];
// If using real input, read the data from the file.
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
// Debug logs to validate the arrays look correct.
if(logs){
    console.log("Array 1: " + array1);
    console.log("Array 2: " + array2);
}
// Loop through array1 and for each number find the instaces of the number then multiply that number by the instances.
array1.forEach((number) => {
    const instances = getInstances(array2, number);
    array3.push(number * instances);
    sum += number * instances;
});
// Debug log to view the newly create array.
if(logs)
console.log("Array3: " + array3);
// Log to show the final result.
console.log("Sum: " + sum);


// Function to get number of instances of a number in an array.
function getInstances(array, number) {
    return array.filter(item => item === number).length;
}
