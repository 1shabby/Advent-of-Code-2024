"use strict";
exports.__esModule = true;
const fs_1 = require("fs");
// Use real input: True = yes, False = no.
const use_input = true;
// Show debug logs: True = yes, False = no.
const logs = true;
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
const input = file.trim().split(/\n\s*\n/);
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
// Calculate the total for the middle index of each passing array
function calculateTotal(arrays,rules){
    // Step 3: Validate each array and compute the middle element sum for passing arrays
    sum = 0;
    // Filter arrays to only contain arrays that pass the rules check
    const passingArrays = arrays.filter(array => checkRules(array, rules));
    // Loop through passing arrays
    passingArrays.forEach(array => {
        // Calculate the middle index for the array
        const middle = Math.floor(array.length / 2);
        // Get the value of the middle index of the array and add the value to the index sum
        sum += array[middle];
    });
    // Output results
    if(logs){
        console.log("Rules:", rules);
        console.log("Arrays:", arrays);
        console.log("Validation Results (Passing Arrays):", passingArrays);
    }
    console.log("Total for correct arrays:", sum);
}