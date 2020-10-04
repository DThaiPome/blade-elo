// bracket for the tournament, matchups are in subsequent positions.
// [0] plays [1], [2] plays [3], [4] plays [5] etc...
var bracket = [];

// Represents the leaderboard
var leaderboard = [];

get_players();

// Gets the list of inputted ripper ids (as an array) and creates a sorted
// array of the players based on their elo (lowest elo at the front).
function get_players() {
    var leaderboard_string = get_cookie("json");
    //var leaderboard_string = '{"min":800,"max":2000,"factor":100,"lb":[{"name":"c","ripper_id":"number1","elo":1000},{"name":"ripptr","ripper_id":"number2","elo":900},{"name":"styrty","ripper_id":"number3","elo":800},{"name":"fdsgsdfg","ripper_id":"number4","elo":700},{"name":"zfdggf","ripper_id":"number5","elo":600},{"name":"cvzxasdfasdfas ","ripper_id":"number6","elo":500},{"name":"tydfgb","ripper_id":"number7","elo":400},{"name":"dsrwercxvghj","ripper_id":"number8","elo":300},{"name":"eepdfgsdfgo","ripper_id":"number9","elo":200},{"name":"asdfwerwr","ripper_id":"number10","elo":100}]}' ;
    if (leaderboard_string == "") {
        alert("Please add a leaderboard");
    }
    try {
        var leaderboard_json = JSON.parse(leaderboard_string);
        leaderboard = leaderboard_json.lb;
    } catch (e) {
        alert("Improper JSON provided");
    }
    create_bracket();
}

// Creates a bracket based on the top 32 players on the leaderboard.
// Seeds players 1-8, and then randomizes the matchups
function create_bracket() {
    if (leaderboard.length >= 8) {
        var top_eight = get_top_eight_paired(leaderboard.slice(0,8));
        if (leaderboard.length > 8) {
            var everyone_else = randomize_array(leaderboard.slice(8));
            if (everyone_else.length % 2 != 0) {
                var index = 0;
                while (everyone_else.length > 0 && index < 7) {
                    top_eight.splice(8 - index, 0, everyone_else.splice(index, 1));
                    index++;
                }
            } else {
                var index = 8;
                while (everyone_else.length > 0 && index > 0) {
                    top_eight.splice(index, 0, everyone_else[0]);
                    everyone_else.splice(0, 1);
                    index--;
                }
            }
            if (everyone_else.length > 0) {
                top_eight.concat(everyone_else);
            }
        }
        bracket = top_eight;
    } else {
        bracket = randomize_array(leaderboard);
    }
    load_bracket();
}

// Randomizes the order of the elements in the given array
// Does not modify the original array
function randomize_array(array) {
    var result = [];
    var copy = [...array];
    for (var i = copy.length; i > 0; i--) {
        var random = Math.floor(Math.random() * i);
        result.push(copy[random]);
        copy.splice(random, 1);
    }
    return result;
}

// Pairs the top 8 players, where the pairs are in order:
// (1, 8); (4, 5); (2, 7); (3, 6)
function get_top_eight_paired(top_eight) {
    var result = [];
    result.push(leaderboard[0]);
    result.push(leaderboard[7]);
    result.push(leaderboard[3]);
    result.push(leaderboard[4]);
    result.push(leaderboard[1]);
    result.push(leaderboard[6]);
    result.push(leaderboard[2]);
    result.push(leaderboard[5]);
    return result;
}

// Load the names into the html bracket 
function load_bracket() {
    for (var i = 1; i <= bracket.length; i++) {
        var id = i.toString() + "-" + i.toString();
        var bracketName = document.getElementById(id);
        bracketName.innerHTML = bracket[bracket.length - i].ripper_id;
    }
}