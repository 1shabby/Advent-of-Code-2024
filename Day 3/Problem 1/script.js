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

function findMatches(input){
    const regex = /mul\((-?\d+),(-?\d+)\)/g;

    let matches;
    const results = [];

    while((matches = regex.exec(input)) !== null){

        results.push({
            substring: matches[0],
            num1: parseInt(matches[1], 10),
            num2: parseInt(matches[2], 10)
        });
        if(logs)
            console.log(results);
    }
    calculateTotal(results);
}

function calculateTotal(arr){
    for(let c = 0; c < arr.length; c++){
        sum += (arr[c].num1 * arr[c].num2);
    }
}

function getResult(){
    console.log("Answer: " + sum);
}

