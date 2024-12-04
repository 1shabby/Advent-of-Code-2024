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
searchArray(array2d, 'XMAS');

function convert2D(input){
    return input.map(row => row.split(''));
}

function searchArray(array, term){
    const rows = array.length;
    const cols = array[0].length;

    horizontalSearch(array,rows,cols,term);
    verticalSearch(array,rows,cols,term);
    diagonalSearch(array,rows,cols,term);

    console.log(sum);
}
// Finds horizontal instances of the provided term both left to right and right to left
function horizontalSearch(array,rows,cols,term){
    // Left to right search bidirectionally //
    for (var r = 0; r < rows; r++){
        for(var c = 0; c<=cols - term.length; c++){
            if(logs)
                console.log("Slice Left to Right: " + array[r].slice(c, c + term.length).join(''));
            if(array[r].slice(c, c + term.length).join('') == term){
                sum++;
                console.log("LEFT TO RIGHT MATCH FOUND: RUNNING TOTAL: " + sum);
            }
            if(logs)
                console.log("Slice Right to Left: " + array[r].slice(c, c + term.length).reverse().join(''));
            if(array[r].slice(c, c + term.length).reverse().join('') == term){
                sum++;
                console.log("RIGHT TO LEFT MATCH FOUND: RUNNING TOTAL: " + sum);
            }
        }
    }
}
// Find vertical instances of the provided term both top to bottom and bottom to top
function verticalSearch(array,rows,cols,term){
    // Top to bottom search bidirectionally //
    for (var c = 0; c < cols; c++){
        for (var r = 0; r <= rows - term.length; r++){
            var string = "";
            for (var i = 0; i < term.length; i++){
                string += array[r + i][c];
            }
            if(logs)
                "Slice Top to Bottom: " + string;
            if (string == term){
                sum++;
                console.log("TOP TO BOTTOM MATCH FOUND: RUNNING TOTAL: " + sum)
            }
            string = '';
            for(var i = 0; i < term.length; i++){
                string += array[r + term.length -1 - i][c];
            }
            if(logs)
                "Slipe Bottom to Top: " + string;
            if(string == term) {
                sum++;
                console.log("BOTTOM TO TOP MATCH FOUND: RUNNING TOTAL: " + sum)

            }
        }
    }
}
// Finds all 4 possible diagonal instances of the provided term 
function diagonalSearch(array,rows, cols,term){
    // Top left to bottom left biderectional search // 
    for (var r = 0; r <= rows - term.length; r++){
        for (var c = 0; c <= cols - term.length; c++){
            var string = "";
            for (var i = 0; i < term.length; i++){
                string += array[r + i][c + i];
            }
            if(logs)
                console.log("Slice Top Left to Bottom Right: " + string)
            if (string == term){
                sum++;
                console.log("TOP LEFT TO BOTTOM RIGHT MATCH FOUND: RUNNING TOTAL: " + sum);
            }
            string = "";
            for(var i = 0; i < term.length; i++){
                string += array[r + term.length - 1 - i][c + term.length - 1 -i];
            }
            if(logs)
                console.log("Slice Bottom Right to Top Left: " +string)
            if(string == term){
                sum++;
                console.log("BOTTOM RIGHT TO TOP LEFT MATCH FOUND: RUNNING TOTAL: " + sum);
            }
        }
    }
    // Bottom lef to top right bidirectional search //
    for (let r = 0; r <= rows - term.length; r++){
        for (let c = term.length -1; c < cols; c++){
            var string = "";
            for (var i = 0; i < term.length; i++){
                string += array[r + i][c - i];
            }
            if(logs)
                console.log("Slice Top Right to Bottom Left: " + string)
            if (string == term){
                sum++;
                console.log("TOP RIGHT TO BOTTOM LEFT MATCH FOUND: RUNNING TOTAL: " + sum);
            }
            string = "";
            for (var i = 0; i < term.length; i++){
                string += array[r + term.length - 1 - i][c - term.length + 1 + i];
            }
            if(logs)
                console.log("Slice Bottom Left to Top Right: " +string);
            if (string == term){
                sum++;
                console.log("BOTTOM LEFT TO TOP RIGHT MATCH FOUND: RUNNING TOTAL: " + sum);
            }
        }
    }
}