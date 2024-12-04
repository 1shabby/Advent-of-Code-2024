"use strict";
exports.__esModule = true;
const fs_1 = require("fs");
// Use real input: True = yes, False = no.
const use_input = true;
// Show debug logs: True = yes, False = no.
const logs = false;
// Stores the input split into new lines.
let input;
// Sum value
let sum = 0;

// Use the real input
if(use_input){
    let file = (0, fs_1.readFileSync)('../input', 'utf-8');
    input = file.split('\r\n');
}//else use the demo input from above
else{    
    // Split the input into lines and process
    let file = (0, fs_1.readFileSync)('../demo_input', 'utf-8');
    input = file.split('\r\n');
}

const array2d = convert2D(input);
searchArray(array2d);
// Converts input into 2d array
function convert2D(input){
    return input.map(row => row.split(''));
}
// Searches for all instances of "Mas" in an x formation
function searchArray(array){
    const rows = array.length;
    const cols = array[0].length;
    for (var r = 1; r < rows - 1; r++){
        for (var c = 1; c < cols - 1; c++){
            if (array[r][c] == 'A'){
                if (array[r - 1][c - 1] == 'M' && // Top Left
                    array[r + 1][c - 1] == 'M' && // Bottom Left
                    array[r - 1][c + 1] == 'S' && // Top Right
                    array[r + 1][c + 1] == 'S'    // Bottom Right
                ){
                    sum++;
                    if(logs)
                        console.log("MATCH FOUND: TOTAL: " + sum);
                }
                if (array[r - 1][c - 1] == 'S' && // Top Left
                    array[r + 1][c - 1] == 'S' && // Bottom Left
                    array[r - 1][c + 1] == 'M' && // Top Right
                    array[r + 1][c + 1] == 'M'    // Bottom Right
                ){
                    sum++;
                    if(logs)
                        console.log("MATCH FOUND: TOTAL: " + sum);
                }
                if (array[r - 1][c - 1] == 'M' && // Top Left
                    array[r + 1][c - 1] == 'S' && // Bottom Left
                    array[r - 1][c + 1] == 'M' && // Top Right
                    array[r + 1][c + 1] == 'S'    // Bottom Right
                ){
                    sum++;
                    if(logs)
                        console.log("MATCH FOUND: TOTAL: " + sum);
                }
                if (array[r - 1][c - 1] == 'S' && // Top Left
                    array[r + 1][c - 1] == 'M' && // Bottom Left
                    array[r - 1][c + 1] == 'S' && // Top Right
                    array[r + 1][c + 1] == 'M'    // Bottom Right
                ){
                    sum++;
                    if(logs)
                        console.log("MATCH FOUND: TOTAL: " + sum);
                }
            }
        }
    }
    console.log(sum);
}

