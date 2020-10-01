class Player {
    constructor(name, ripper_id, elo) {
        this.name = name;
        this.ripper_id = ripper_id
        this.elo = elo;
    }
}

var leaderboard = [];

function get_table_id() {
    return "rankings";
}

function add_player() {
    var rankings_table = document.getElementById(get_table_id());

    var name = document.new_player_info.player_name.value;
    var id = document.new_player_info.player_ripper_id.value;

    var initialElo = 1000;

    var newPlayer = new Player(name, id, 1000);
    leaderboard.push(newPlayer);

    render_table();
}

function clear_players() {
    leaderboard = [];
    render_table();
}

function render_table() {
    clear_table(get_table_id());
    add_rows_from_leaderboard(get_table_id());
}

function clear_table(tableID) {
    var rankings_table = document.getElementById(tableID);

    while(rankings_table.rows.length > 1) {
        rankings_table.rows[1].remove();
    }
}

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