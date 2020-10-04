
//Gets a cookie property (from w3schools)
function get_cookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
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

//given an array of players, finds the player with the given name, if it reaches the end, then returns an empty string
function findPlayer(players,name){
    for(var ii=0;ii<players.length;ii++){
        if(players[ii].name == name){
            return players[ii];
        }
    }
}
