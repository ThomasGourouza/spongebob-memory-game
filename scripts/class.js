class Player {
  constructor(name, record, score, isCurrent) {
    this.name = name;
    this.record = record;
    this.score = score;
    this.isCurrent = isCurrent;
  }
  // Getter
  get status() {
    return this.textStatus();
  }
  // Method
  textStatus() {
    return this.isCurrent ? "It's your turn" : "It's not your turn";
  }
}

const player = new Player("test", 0, 0, true);

console.log(player.status); // It's your turn
