// bracket for the tournament, matchups are in subsequent positions.
// [0] plays [1], [2] plays [3], [4] plays [5] etc...
var bracket = [];

// Represents the leaderboard
var leaderboard = [];

// Represents the index in bracket of the first player in a match
var p1 = 0;

// Represents the index in bracket of the second player in a match
var p2 = 1;

// Gets the list of inputted ripper ids (as an array) and creates a sorted
// array of the players based on their elo (lowest elo at the front).
function get_players() {
    var leaderboard_string = get_cookie("json");
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
    return sort_players(players);
}

// Creates a bracket based on the top 32 players on the leaderboard.
// Seeds players 1-8, and then randomizes the matchups
function create_bracket() {
    if (leaderboard.length >= 8) {
        var top_eight = get_top_eight_paired(leaderboard.slice(0,8));
        if (leaderboard.length > 8) {
            var everyone_else = randomize_array(leaderboard.slice(8));
        } else {
            bracket = top_eight;
        }
    } else {
        bracket = randomize_array(leaderboard);
    }
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
    result.push(leaderboard[1]);
    result.push(leaderboard[8]);
    result.push(leaderboard[4]);
    result.push(leaderboard[5]);
    result.push(leaderboard[2]);
    result.push(leaderboard[7]);
    result.push(leaderboard[3]);
    result.push(leaderboard[6]);
    return result;
}