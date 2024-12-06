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
let blocks = 0;
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
const position = findPosition(array2d, '^');
console.log(position)

let guard = {xPos: position.x,
    yPos: position.y,
    direction: "up",
    directionChange: false,
    legalBlock: false,
    move: "legal",
    won: false
    }

moveGuard(array2d,guard);
function convert2D(input){

    return input.map(row => row.split(''));
}

function moveGuard(array2d, guard){
    let nextPos;
    while(!guard.won){
        if(guard.direction == "up"){
            nextPos = {xPos: guard.xPos,
                    yPos: guard.yPos-1
            }
        }else if(guard.direction == "right"){
            nextPos = {xPos: guard.xPos + 1,
                yPos: guard.yPos
        }
        }else if(guard.direction == "down"){
            nextPos = {xPos: guard.xPos,
                    yPos: guard.yPos + 1
        }
        }else if(guard.direction == "left"){
            nextPos = {xPos: guard.xPos - 1,
                    yPos: guard.yPos
            }
        }
        guard = checkNextMove(array2d,guard,nextPos);
        if(guard.move == "legal"){
            array2d = updateArray(array2d,guard,nextPos);
            sum++;
            guard.directionChange = false;
            guard.legalBlock = false;
            guard.xPos = nextPos.xPos;
            guard.yPos = nextPos.yPos;
            console.log(sum);
        }
    }
    const arrayAsString = array2d.map(row => row.join(' ')).join('\n');
        // Print the string
        console.log(arrayAsString);
    console.log("Total Moves: " + sum)
    console.log("Total Blocks: " + blocks);
}
// Check if next move is within bounds. If not: Guard is exiting room.
// If Next move is within bounds, check if the icon is a ".". If not check if it's "#"
// If icon is "." move is legal and should return as such
// If icon is "#" guard is unable to move into that position. Update guard direction to 90 degrees to the right and fail the move
function checkNextMove(array2d,guard,move){
    console.log("Guard: " + JSON.stringify(guard));
    console.log("Move: " + JSON.stringify(move));
    if(move.xPos > array2d[0].length -1 || move.yPos > array2d.length - 1 || move.xPos < 0 || move.yPos < 0){
        guard.won = true;
    }else if(array2d[move.yPos][move.xPos] == "."){
        guard = determineBlock(array2d,guard);
        guard.move = "legal";
    }else if(array2d[move.yPos][move.xPos] == "#"){
        guard.directionChange = true;
        if(guard.direction == "up"){
            guard.direction = "right";
        }else if(guard.direction == "right"){
            guard.direction = "down";
        }else if(guard.direction == "down"){
            guard.direction = "left"
        }else if(guard.direction == "left"){
            guard.direction = "up";
        }
        guard.move = "illegal";
    }else{
        guard = determineBlock(array2d,guard);
        guard.move = "legal";
        sum --;
    }
    return guard;
}

function updateArray(array2d,guard,move){
    if(!guard.won){
        //array2d[guard.yPos][guard.xPos] = "X";
        if(guard.directionChange){
                array2d[guard.yPos][guard.xPos] = "+"
        }else if(guard.legalBlock){
            console.log("Setting block to O");
            array2d[move.yPos][move.xPos] = "O";
            if(guard.direction == "left")
                array2d[guard.yPos][guard.xPos] = "<";
            else if(guard.direction == "right")
                array2d[guard.yPos][guard.xPos] = ">";
            if(guard.direction == "up")
                array2d[guard.yPos][guard.xPos] = "^"
            else if(guard.direction == "down")
                array2d[guard.yPos][guard.xPos] = "v";
        }else{
            if(guard.direction == "up"){
                if(array2d[move.yPos][move.xPos] != "O")
                    array2d[move.yPos][move.xPos] = "^";
                if(array2d[guard.yPos][guard.xPos] != "O")
                    array2d[guard.yPos][guard.xPos] = "^"
            }else if(guard.direction == "right"){
                if(array2d[move.yPos][move.xPos] != "O")
                    array2d[move.yPos][move.xPos] = ">";
                if(array2d[guard.yPos][guard.xPos] != "O")
                    array2d[guard.yPos][guard.xPos] = ">"
            }else if(guard.direction == "down"){
                if(array2d[move.yPos][move.xPos] != "O")
                array2d[move.yPos][move.xPos] = "v";
                if(array2d[guard.yPos][guard.xPos] != "O")
                    array2d[guard.yPos][guard.xPos] = "v"
            }else if(guard.direction == "left"){
                if(array2d[move.yPos][move.xPos] != "O")
                    array2d[move.yPos][move.xPos] = "<";
                if(array2d[guard.yPos][guard.xPos] != "O")
                    array2d[guard.yPos][guard.xPos] = "<"
            }
        }
    }
    if(logs){
        const arrayAsString = array2d.map(row => row.join(' ')).join('\n');        // Print the string
        console.log(arrayAsString);
    }
    return array2d;
}

function findPosition(array2d, target) {
    for (let y = 0; y < array2d.length; y++) { // Loop through rows
        for (let x = 0; x < array2d[y].length; x++) { // Loop through columns
            if (array2d[y][x] === target) { // Check for the target
                return { x, y }; // Return position as an object
            }
        }
    }
    return null; // Return null if the target is not found
}

function determineBlock(array2d,guard){
        // ^ > v < ^
        if(guard.direction == "up" && guard.xPos + 1 < array2d[0].length - 1){
            let c = 1;
            // while we're still within the bounds of the array and legalblock is false
            while(guard.xPos + c < array2d[0].length && !guard.legalBlock){
                // if we hit either 
                if(array2d[guard.yPos][guard.xPos + c] == ">"){
                    console.log("LEGAL BLOCK SET TRUE");
                    guard.legalBlock = true;
                }else if(array2d[guard.yPos][guard.xPos + c] == ">"){
                    let i = 1;
                    while(guard.yPos + i < array2d.length - 1){
                        if(array2d[guard.yPos + i][guard.xPos + c -1] == ">"){
                            console.log("LEGAL BLOCK SET TRUE");
                            guard.legalBlock = true;
                        }
                        i++;
                    }
                }
                c++;

            }
        }else if(guard.direction == "right" && guard.yPos + 1 < array2d[0].length - 1){
            let c = 1;
            while(guard.yPos + c < array2d[0].length && !guard.legalBlock){
                if(array2d[guard.yPos  + c][guard.xPos] == "v"){
                    console.log("LEGAL BLOCK SET TRUE");
                    guard.legalBlock = true;
                }else if(array2d[guard.yPos  + c][guard.xPos] == "#"){
                    let i = 1;
                    while(guard.xPos - i > -1){
                        if(array2d[guard.yPos + c - 1][guard.xPos - i] == "<"){
                            console.log(array2d[guard.yPos + c - 1][guard.xPos - i]);
                            console.log("LEGAL BLOCK SET TRUE");
                            guard.legalBlock = true;
                        }
                        i++;
                    }
                }
                c++;
            }

        }else if(guard.direction == "down" && guard.xPos -1 > -1){
            let c = 1;
            while(guard.xPos - c > -1 && !guard.legalBlock){
                if(array2d[guard.yPos][guard.xPos - c] == "<"){
                    console.log("LEGAL BLOCK SET TRUE");
                    guard.legalBlock = true;
                }else if(array2d[guard.yPos][guard.xPos - c] == "#"){
                    let i = 1;
                    while(guard.xPos - i > -1){
                        if(array2d[guard.xPos - c + 1][guard.yPos - i] == "^"){
                            console.log("LEGAL BLOCK SET TRUE");
                            guard.legalBlock = true;   
                        }
                        i++;
                    }
                }
                c++;
            }
        
            
        // If the guard is moving left and the position above them is not out of bounds
        }else if(guard.direction == "left" && guard.yPos - 1 > -1){
            let c = 1;
            console.log("Moving Left: ");
            //keep looking up until we hit the edge of the map or hit an "|" indicator
            while(guard.yPos - c > - 1 && !guard.legalBlock){
                if(array2d[guard.yPos - c][guard.xPos] == "^"){
                    console.log("LEGAL BLOCK SET TRUE");
                    guard.legalBlock = true;
                }else if(array2d[guard.yPos - c][guard.xPos] == "#"){
                    let i = 1;
                    while(guard.xPos + i < array2d.length - 1){
                        if(array2d[guard.yPos - c + 1][guard.xPos + i] == ">"){
                            console.log("LEGAL BLOCK SET TRUE");
                            guard.legalBlock = true;
                        }
                        i++;
                    }
                }
                c++;
            }
        }
    if(guard.legalBlock){
        blocks++;
        console.log("Blocks: " + blocks);
    }
    return guard;
}