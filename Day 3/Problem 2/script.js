"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
// Use real input: True = yes, False = no.
var use_input = true;
// Show debug logs: True = yes, False = no.
var logs = true;
// Stores the input split into new lines.
var input;
// Sum value
var sum = 0;
// Use the real input
if(use_input){
    var file = (0, fs_1.readFileSync)('../input', 'utf-8');
    input = file.split('\r\n');
}//else use the demo input from above
else{    
    // Split the input into lines and process
    var file = (0, fs_1.readFileSync)('../demo_input', 'utf-8');
    input = file.split('\r\n');
}

findMatches(input);
getResult();

// Uses regex to find instances in which mul(num,num) are present then stores the substring 
//followed by the first number and second number in an array of objects
function findMatches(input){
    // Regex to track "don't()", do(), and Mul(num,num) substrings
    const regex = /(don't\(\))|(do\(\))|mul\((-?\d+),(-?\d+)\)/g;

    let matches;
    // Array of objects that stores the matches
    const results = [];
    // Tracks if we are skipping mul() substrings or not
    let skip = false; 
    // Loop through the matches
    while ((matches = regex.exec(input)) !== null) {
        const [substring, dontPre, doPre, num1, num2] = matches;

        // Log to check if the regex is capturing the "don't()" and "do()" patterns properly
        console.log("Matched:", substring);
        // If the match is a don't() 
        if (dontPre) {
            skip = true; // Set skip to true since we're in between a don't() segment and a do() segment
            if(logs)
                console.log("Skip Activated");
        // Else if the match is a 'do()'
        } else if (doPre) { 
            skip = false; // Set skip to false since we're in between a do() segment and a don't() segment
            if(logs)
                console.log("Skip Deactivated");
        // Else if the match is 'mul(num,num)'
        } else if (num1 !== undefined && num2 !== undefined) {
            // If we're not skipping currently
            if (!skip) {
                // Push mul strings onto the array as an object
                results.push({
                    substring,
                    num1: parseInt(num1, 10),
                    num2: parseInt(num2, 10)
                });
                if(logs)
                    console.log("Captured:", substring);
            } else {
                if(logs)
                    console.log("Skipped due to skip zone:", substring);
            }
        }
    }
    if(logs)
        console.log("Final Results:", results);
    // Calculates the total from the mul substrings
    calculateTotal(results);
}

// Calculates the total value and sets the sum variable
function calculateTotal(arr){
    for(let c = 0; c < arr.length; c++){
        sum += (arr[c].num1 * arr[c].num2);
    }
}
// Prints out sum
function getResult(){
    console.log("Answer: " + sum);
}