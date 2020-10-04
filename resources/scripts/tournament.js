// bracket for the tournament, matchups are in subsequent positions.
// [0] plays [1], [2] plays [3], [4] plays [5] etc...
var bracket = [];

// Represents the index in bracket of the first player in a match
var p1 = 0;

// Represents the index in bracket of the second player in a match
var p2 = 1;

// Gets the list of inputted ripper ids (as an array) and creates a sorted
// array of the players based on their elo (lowest elo at the front).
function get_players() {
    var rippers = document.players.value;
    var players = [];
    rippers.forEach(outer_item => {
        leaderboard.forEach(inner_item => {
            if (outer_item == inner_item.ripper_id) {
                players.push(inner_item);
            }
        })
    })
    return sort_players(players);
}

// Sorts the given array of players based on their elo using merge sort
function sort_players(players) {
    if (players.length == 1) {
        return players;
    }
    var median = players.length / 2;
    var top = sort_players(players.slice(0, median));
    var bot = sort_players(players.slice(median));
    return merge(top, bot);
}

// Merges the two arrays based on the players elo (lowest elo at the front)
function merge(top, bot) {
    var ii = 0;
    var jj = 0;
    var result = [];

    while (ii < top.length && jj < bot.length) {
        if (top[ii].elo <= bot[jj].elo) {
            result.push(top[ii]);
            ii = ii + 1;
        } else {
            result.push(bot[jj]);
            jj = jj + 1;
        }
    }

    while (ii < top.length) {
        result.push(top[ii]);
        ii = ii + 1;
    }

    while (jj < bot.length) {
        result.push(bot[jj]);
        jj = jj + 1;
    }
    return result;
}