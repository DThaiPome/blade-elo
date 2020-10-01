function add_player() {
    var rankings_table = document.getElementById("rankings");

    var name = document.new_player_info.player_name.value;
    var id = document.new_player_info.player_ripper_id.value;

    var rowCount = rankings_table.rows.length;
    var newRow = rankings_table.insertRow(rowCount);
    newRow.id = "player" + rowCount;

    var idCol = newRow.insertCell(0);
    idCol.class = "RipperID";

    var nameCol = newRow.insertCell(1);
    nameCol.class = "Identity";

    var eloCol = newRow.insertCell(2);
    eloCol.class = "ELO";

    nameCol.innerHTML = name;
    idCol.innerHTML = id;
    eloCol.innerHTML = 1000;
}