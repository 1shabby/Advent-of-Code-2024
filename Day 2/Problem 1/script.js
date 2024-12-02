"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
// Use real input: True = yes, False = no.
var input = false;
// Show debug logs: True = yes, False = no.
var logs = true;
// Stores the input split into new lines.
var diff = 3;
var split;
var sum = 0;
var index;
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
const runs = split.map(line => line.split(' ').map(Number));
for(const run of runs){
    if(logs)
    console.log(run);
    index = 0;
    var is_valid = true;
    var prev_trend = 'none';
    while(index < run.length -1  && is_valid){
        if(!checkDiff(run[index],run[index+1],diff)){
            is_valid = false;
            if(logs)
            console.log(run[index] + ' is greater than ' + diff + ' integers away from ' + run[index+1]);
        }
        var trend_test = checkTrend(run[index],run[index+1]);

        if(prev_trend !='none' && prev_trend != trend_test){
            is_valid = false;
            if(logs)
            console.log('Trend mismatch: Previous Trend = ' + prev_trend + ' current trend  = ' + trend_test);    
        }
        prev_trend = trend_test
        
        index++;
    }
    if(is_valid){
        console.log("Incrementing sum for " + run);
        sum++;
    }
}

console.log(sum);

function checkDiff(num1,num2,diff){
    console.log("Number 1: " + num1 + " Number 2: " + num2)
    return Math.abs(num1 - num2) <=diff && Math.abs(num1 - num2)>=1;
}

function checkTrend(num1,num2){
    var retval;
        if(num1 < num2)
            retval = 'inc';
        if(num1 > num2)
            retval = 'dec';
        else if(num1 == num2)
            retval = 'no change';
    return retval;
}
