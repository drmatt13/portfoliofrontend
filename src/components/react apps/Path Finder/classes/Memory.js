class Memory {
  constructor() {
    this.memory = {}
  }
  shouldProcess(x, y) {
    if (this.memory[`x${x}y${y}`]) return false;
    this.memory[`x${x}y${y}`] = true;
    return true;
  }
}

export default Memory;