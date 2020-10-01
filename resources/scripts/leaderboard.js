//Just a holder for everything related to the player
//Probably could be a struct but meh
class Player {
    constructor(name, ripper_id, elo) {
        this.name = name;
        this.ripper_id = ripper_id
        this.elo = elo;
    }
}

//This is where each "row" of the table is stored
//All methods work on this array, then the contents
//of this array are rendered with HTML
var leaderboard = [];

//There is probably a better place to store this
//string but alas
function get_table_id() {
    return "rankings";
}

//Adds a player to the leaderboard array using the data in the two
//input fields, then redraws the leaderboard

/*
TODO:
    * Error checking -- needs a length cap, and banned characters (?)
                        also shouldn't be able to submit with empty fields
    * Clear the input fields afterwards
*/
function add_player() {
    var rankings_table = document.getElementById(get_table_id());

    var name = document.new_player_info.player_name.value;
    var id = document.new_player_info.player_ripper_id.value;

    var initialElo = 1000;

    var newPlayer = new Player(name, id, 1000);
    leaderboard.push(newPlayer);

    render_table();
}

//Clears the leaderboard array and redraws the leaderboard
function clear_players() {
    leaderboard = [];
    render_table();
}

//Converts the contents of the leaderboard array to JSON, then
//copies it to the clipboard
function copy_json() {
    var json = JSON.stringify(leaderboard);
    navigator.clipboard.writeText(json);
    alert("Copied JSON to clipboard");
}

//Parses the JSON in the import field as a leaderboard array, and
//redraws the leaderboard with this data

/*
TODO:
    * Error checking  --  don't load if it's not proper JSON
    * Clear the input field afterwards
*/
function import_json() {
    var json = document.new_player_info.json_input.value;
    leaderboard = JSON.parse(json);
    render_table();
}

//Redraws the leaderboard using what is stored in the leaderboard array
function render_table() {
    clear_table(get_table_id());
    add_rows_from_leaderboard(get_table_id());
}

//Clears the leaderboard (NOT the array)
function clear_table(tableID) {
    var rankings_table = document.getElementById(tableID);

    while(rankings_table.rows.length > 1) {
        rankings_table.rows[1].remove();
    }
}

//Adds each row from the leaderboard array to the leaderboard
function add_rows_from_leaderboard(tableID) {
    var rankings_table = document.getElementById(tableID);
    leaderboard.forEach( (item, index) => {
        var newRow = rankings_table.insertRow(index + 1);
        newRow.id = "player" + index;

        var idCol = newRow.insertCell(0);
        idCol.class = "RipperID";

        var nameCol = newRow.insertCell(1);
        nameCol.class = "Identity";

        var eloCol = newRow.insertCell(2);
        eloCol.class = "ELO";
        
        nameCol.innerHTML = item.name;
        idCol.innerHTML = item.ripper_id;
        eloCol.innerHTML = item.elo;
    })
}