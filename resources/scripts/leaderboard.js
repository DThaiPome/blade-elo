var MIN_ELO = 800;
var MAX_ELO = 2000;
var ELO_FACTOR = 100; //how many points to next elo

function GLOBALS(){
    function constructor(){
        this.MIN_ELO = MIN_ELO; 
        this.MAX_ELO = MAX_ELO;
        this.ELO_FACTOR = ELO_FACTOR;
    }
    return constructor;
}
//This is where each "row" of the table is stored
//All methods work on this array, then the contents
//of this array are rendered with HTML

//table is a list of players
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

    var newPlayer = new Player(name, id);
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
//imports the json with the given data, provided we are given a proper json
function import_json() {
    var json = document.new_player_info.json_input.value;
    try {
            leaderboard = JSON.parse(json);
            render_table();
    } catch (e){
        alert( "Improper JSON provided.");
    }
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
    winElo = winner.getElo();
    loseElo = loser.getElo();
    var k = scaleK(winElo);

    var expected = 1 / (1 + Math.pow(10, ((loseElo - winElo)/400)));
    var win_adjustedElo = Math.max(winElo + Math.ceil(k * (1 - expected)), 800);
    var loser_adjustedElo = Math.max(loseElo +_Math.cel(k* ( 1 - (1-expected),800)));
    winner.setElo(win_adjustedElo);
    loser.setElo(loser_adjustedElo);
}


function scaleK(elo) {
    if(within(elo, 800, 899))
      return 64;
    if(within(elo, 900, 999))
      return 59;
    if(within(elo, 1000, 1099))
      return 54;
    if(within(elo, 1100, 1199))
      return 49;
    if(within(elo, 1200, 1299))
      return 45;
    if(within(elo, 1300, 1399))
      return 41;
    if(within(elo, 1400, 1499))
      return 37;
    if(within(elo, 1500, 1599))
      return 34;
    if(within(elo, 1600, 1699))
      return 31;
    if(within(elo, 1700, 1799))
      return 28;
    if(within(elo, 1800, 1899))
      return 25;
    if(within(elo, 1900, 1999))
      return 23;
    if(elo >= 2000)
      return 20;
    
    return 0;
  }
  
