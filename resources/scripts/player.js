class player {
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
    constructor(name,ripper_id){ //creates a new beybaby
      this(name,ripper_id,800,0,0,0,0,0,0,0,0,0,0,0);
    }
    get_win_percent(){
        return (this.wins / (this.wins + this.loses))*100;
    }

    get_outspin_percent(){
        return (this.outspins / (this.outspins + this.outspuns)) * 100;
    }
}