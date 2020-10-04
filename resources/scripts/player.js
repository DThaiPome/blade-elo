class player {
    /*
    constructor(name, ripper_id, elo, wins,loses, burst, bursted,outspins,outspuns,knockouts,dq,tourneyparticipations, tourneywins) {
        this.name = name;
        this.ripper_id = ripper_id
        this.elo = elo;
        this.wins = wins;
        this.loses = loses;
        this.burst = burst;
        this.bursted = bursted;
        this.outspins = outspins;
        this.outspuns = outspuns;
        this.knockouts = knockouts;
        this.dq = dq;
        this.tourneyparticipations = tourneyparticipations;
        this.tourneywins = tourneywins;
    }
    */
    constructor(name,ripper_id){ //creates a new beybaby
      //this(name,ripper_id,1000,0,0,0,0,0,0,0,0,0,0,0);
      this.name = name;
      this.ripper_id = ripper_id;
      this.elo = 1000;
    }
    get_name(){
        return this.name;

    get_elo(){
        return this.elo;
    }

    //calculates win percentage based on the total number of matches (wins and loses)
    get_win_percent(){
        return (this.wins / (this.wins + this.loses))*100;
    }

    //calculates the outspin percentage based on the total number of outspins and outspuns
    get_outspin_percent(){
        return (this.outspins / (this.outspins + this.outspuns)) * 100;
    }

    //assumes this player is the winner and updates the elo of both this player and their opponent
    Win_adjust_elo(opp){
        var k = scaleK(this.elo);

        var expected = 1 / (1 + Math.pow(10, ((opp.elo - this.elo)/400)));
        var this_adjustedElo = Math.max(this.elo + Math.ceil(k * (1 - expected)), 800);
        var opp_adjustedElo = Math.max(opp.elo +_Math.cel(k* ( 1 - (1-expected),800)));
        this.setElo(this_adjustedElo);
        opp.setElo(opp_adjustedElo);
    }

    //sets the elo if this player to the given number
    setElo(elo){
        this.elo = elo;
    }
}
