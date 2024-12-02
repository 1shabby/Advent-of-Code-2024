"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
// Use real input: True = yes, False = no.
var input = true;
// Show debug logs: True = yes, False = no.
var logs = false;
// Stores the input split into new lines.
var split;
var sum = 0;
var index;
var data = '';
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
        console.log(run.join(','));
    index = 0;
    var is_valid = true;
    var increasing = true;
    var decreasing = true;
    var new_run = '';

    while(index < run.length -1  && is_valid){
        // If run tests returns false
        if(!runTests(run[index],run[index+1])){
            // If the problematic index is not the last index of the array
            if(index+1 != run.length -1){
                // If the issue found returned false
                if(!issueFound(run,index+1)){
                    // Mark as a true failure
                    is_valid = false;
                }
            }else{
                if(logs)
                    console.log("REMOVING LAST INDEX AND PASSING");
            }
        }
        index++;
    }
    // If is valid is still true, increment sum.
    if(is_valid){
        if(new_run & new_run.length >1){
            if(logs)
                console.log("Incrementing sum for " + new_run);
            sum++;
        }else if(run.length > 1){
            if(logs)
                console.log("Incrementing sum for " + run);
            sum++;
        }
    }
}
// Write logs to output file.
if(logs){
    fs_1.writeFile('Output.txt', data, (err) => {

        // In case of a error throw err.
        if (err) throw err;
    })
}
console.log(sum);

function checkDiff(num1,num2){
    if(logs)
        console.log("Number 1: " + num1 + " Number 2: " + num2)
    return Math.abs(num1 - num2) <=3 && Math.abs(num1 - num2)>=1;
}

function checkTrend(num1,num2){
    var retval = true;
    // If both are true, then no trend has been identified
    if(increasing && decreasing){
        if(num1 < num2){
            decreasing = false; // Num1 to Num2 is an increase, mark decrease as false.
        }else if(num1 > num2){
            increasing = false; // Num1 to Num2 is an decrease, mark increase as false.
        }
    // Else decreasing is true
    }else if(decreasing){
        if(num1 < num2)
            retval = false; // Num1 to Num2 is an increase, meaning mismatch trends. Mark as failed test
    }else if(increasing){
        if(num1 > num2)
            retval = false // Num1 to Num2 is a decrease, meaning mismatch in trends. Mark as failed test
    }
    // Return true / false based on if test passes or not.
    return retval;
}
// Removes an element at the provided index within the provided array
function removeElement(array,remove_index){
    var arr = array.filter((_, index) => index !== remove_index);
    return arr;
}

// Runs both tests
function runTests(num1,num2){
    // If both pass
    if(checkTrend(num1,num2) && checkDiff(num1,num2)){
        //console.log("Tests Passed for " + num1 + " & " + num2);
        return true;
    // Else there was a failure on one of the parts
    }else{
        if(logs)
            console.log("Tests Failed for " + num1 + " & " + num2);
        return false;
    }
}
// Removes the element at the index provided. Then re-runs the test
function issueFound(array,index){
    if(logs)
        console.log("Removing: " + array[index] + " at " + index);
    var tempArr = removeElement(array,index);
    return runTests(tempArr[index-1],tempArr[index]);
}
