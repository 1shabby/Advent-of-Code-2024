"use strict";
exports.__esModule = true;
const fs_1 = require("fs");
// Use real input: True = yes, False = no.
const use_input = false;
// Show debug logs: True = yes, False = no.
const logs = true;
// Stores the input split into new lines.
// Sum value
let sum = 0;
let file;

// Use the real input
if(use_input){
    file = (0, fs_1.readFileSync)('../input', 'utf-8');

}//else use the demo input from above
else{    
    file = (0, fs_1.readFileSync)('../demo_input', 'utf-8');
}


// split the input between the rules section and the arrays section
const input = file.trim().split(/\n\s*\n/);
// set the rulesInput and runsInput from the input variable
const [rulesInput, runsInput] = input;
// The list of rules stored as an array of objects
var daRules = getRules(rulesInput);
// Parse arrays from input
const arrays = runsInput.split("\n").map(line => line.split(",").map(Number));
// Calculates the total from all the middle indexes added up
calculateTotal(arrays,daRules);


// Check if an array satisfies all the rules
function checkRules(array, rules) {
    for (const rule of rules) {
        // set before and after from the rule
        const { before, after } = rule;
        // index of the before number from the rule
        const beforeIndex = array.indexOf(before);
        // index of the after number from the rule
        const afterIndex = array.indexOf(after);
        // If either before or after indexes don't exist in the array, don't apply any rules
        if (beforeIndex == -1 || afterIndex == -1) 
            continue;
        // if before index is found after the after index, the rule has failed
        if (beforeIndex > afterIndex) 
            return false;
    }
    // return true if no rules failed for the provided array
    return true;
}

// Converts the Rules piece of the input into an array of objects where before and after are properties in the object
function getRules(rulesInput){
    const rules = rulesInput.split("\n").map(rule => {
        const [x, y] = rule.split("|").map(Number);
    return { before: x, after: y };
    });
    return rules;
}

// Fixes arrays that fail the rules
function fixArray(array, rules) {
    let fixedArray = [...array];
    let changed = true;
    // while changed flag is true
    while (changed) {
        // set changed flag to false
        changed = false;
        // loop through rules array and set before and after variables
        for (const { before, after } of rules) {
            // Set before index value
            const beforeIndex = fixedArray.indexOf(before);
            // Set after index value
            const afterIndex = fixedArray.indexOf(after);
            // Checks that before and after are both in the array AND that before is after the after element
            if (beforeIndex > -1 && afterIndex > -1 && beforeIndex > afterIndex) {
                // Fix by moving the before element to be before the after element
                fixedArray.splice(beforeIndex, 1);
                const newAfterIndex = fixedArray.indexOf(after);
                fixedArray.splice(newAfterIndex, 0, before);
                // Set changed flag to true
                changed = true;
            }
        }
    }
    // Return the newly modified array
    return fixedArray;
}

// Calculates the sum of the middle indexes for all arrays that needed to be fixed
function calculateTotal(arrays,rules){
    sum = 0;
    // Array of fixed arrays
    const fixedArrays = [];
    // Loop through the arrays
    arrays.forEach(array => {
      // if the array fails a rule
      if (! checkRules(array, rules)) {
        // fix the array
        const fixedArray = fixArray(array, rules);
        // push the fixed array onto our array of fixed arrays
        fixedArrays.push(fixedArray);
        // if the fixed array passes the rules
        if ( checkRules(fixedArray, rules)) {
            // calculate the middle index
            const middle = Math.floor(fixedArray.length / 2);
            // get the value of the middle index then add it to the running total
            sum += fixedArray[middle];
        } 
      }
    });
    // If logs are enabled
    if(logs){
        console.log("Rules:", rules);
        console.log("Original Arrays:", arrays);
        console.log("Fixed Arrays:", fixedArrays);
    }
    console.log("Total for Fixed Arrays:", sum);
}