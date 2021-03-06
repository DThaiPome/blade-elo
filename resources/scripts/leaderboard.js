var MIN_ELO = 800;
var MAX_ELO = 2000;
var ELO_FACTOR = 100; //how many points to next elo

function GLOBALS(){
    var globals = new class {
        constructor() {
            this.min = MIN_ELO; 
            this.max = MAX_ELO;
            this.factor = ELO_FACTOR;
            this.lb = leaderboard;
        }
    }
    return globals;
    /*
    function constructor(){
        this.min = MIN_ELO; 
        this.max = MAX_ELO;
        this.factor = ELO_FACTOR;
        this.lb = leaderboard;
    }
    return constructor;
    */
}
//This is where each "row" of the table is stored
//All methods work on this array, then the contents
//of this array are rendered with HTML

//table is a list of players
var leaderboard = [];

//test cookie
//console.log(document.cookie);

//set cookie to stay in domain
document.cookie = "samesite=Lax; domain=dthaipome.github.io";

//load cookie data if present
{
    var json = get_cookie("json");
    console.log(json);
    if (json != "") {
        import_json(json);
    }
}

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

    var newPlayer = new player(name, id);
    
    if (newPlayer.name != "" && newPlayer.ripper_id != "") {
        leaderboard.push(newPlayer);
        save_json_to_cookie();
    }

    clear_add_player_fields();

    render_table();
}

//Clears the leaderboard array and redraws the leaderboard
function clear_players() {
    leaderboard = [];
    save_json_to_cookie();
    render_table();
}

function clear_add_player_fields() {
    document.new_player_info.player_name.value = "";
    document.new_player_info.player_ripper_id.value = "";
}

//Converts the contents of the leaderboard array to JSON, then
//copies it to the clipboard
function copy_json() {
    var json = JSON.stringify(GLOBALS());
    navigator.clipboard.writeText(json);
    save_json_to_cookie();
    alert("Copied JSON to clipboard");
}

function save_json_to_cookie() {
    var json = JSON.stringify(GLOBALS());
    document.cookie = "json=" + json;
}

//Parses the JSON in the import field as a leaderboard array, and
//redraws the leaderboard with this data

/*
TODO:
    * Error checking  --  don't load if it's not proper JSON
    * Clear the input field afterwards
*/
//imports the json with the given data, provided we are given a proper json
function import_json(json) {
    try {
            var global = JSON.parse(json);
            MIN_ELO = global.min;
            MAX_ELO = global.max;
            ELO_FACTOR = global.factor;
            leaderboard = global.lb;
            render_table();
    } catch (e){
        alert( "Improper JSON provided.");
    }
    document.new_player_info.json_input.value = "";
}

//Imports JSON from the text field
function import_json_onclick() {
    import_json(document.new_player_info.json_input.value);
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
function Win_adjust_elo(winner,loser){
    winElo = winner.elo;
    loseElo = loser.elo;
    var kwin = scaleK(winElo);
    var klose = scaleK(loseElo);

    var expected = 1 / (1 + Math.pow(10, ((loseElo - winElo)/400)));
    var win_adjustedElo = Math.min(Math.max(winElo + Math.ceil(kwin * (1 - expected)), MIN_ELO),MAX_ELO);
    var loser_adjustedElo = Math.min(Math.max(loseElo + Math.ceil(klose * (0 - (1-expected))), MIN_ELO), MAX_ELO);
    winner.elo = win_adjustedElo;
    loser.elo = loser_adjustedElo;
}

function scaleK(elo) {
    return Math.floor(((elo * elo)/100000) - (0.066*elo) + 110);
  }

function add_matchup_results() {
    var winnerName = document.matchup_form.matchup_winner.value;
    var loserName = document.matchup_form.matchup_loser.value;

    winner = findPlayer(leaderboard, winnerName);
    loser = findPlayer(leaderboard, loserName);

    if (winner != undefined && loser != undefined && winner != loser) {
        Win_adjust_elo(winner, loser);
        leaderboard = sort_players(leaderboard);
        leaderboard.reverse();
        save_json_to_cookie();
        render_table();
    }

    document.matchup_form.matchup_winner.value = "";
    document.matchup_form.matchup_loser.value = "";
}
  
