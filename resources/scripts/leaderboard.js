function add_player() {
    var name = document.new_player_info.player_name.value;
    var id = document.new_player_info.player_ripper_id.value;
    var newRow = document.rankings_table.createElement("tr");
    var nameCol = newRow.createElement("th");
    var idCol = newRow.createElement("th");
    var eloCol = newRow.createElement("th");

    nameCol.createTextNode(name);
    idCol.createTextNode(id);
    eloCol.createTextNode(1000);
}