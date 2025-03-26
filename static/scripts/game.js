class GameGeneration {
  constructor() {
    this.canvas = document.getElementById('game');
    this.context = this.canvas.getContext('2d');
    this.grid = 16;
    this.count = 0;

    this.snake = {
      x: 160,
      y: 160,
      dx: this.grid,
      dy: 0,
      cells: [],
      maxCells: 4
    };

    this.apple = {
      x: 320,
      y: 320
    };
    this.bomb = {
      x: this.getRandomInt(0, 25) * this.grid,
      y: this.getRandomInt(0, 25) * this.grid
    }
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  loop() {
    requestAnimationFrame(() => this.loop());

    if (++this.count < 4) return;

    this.count = 0;
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.context.strokeStyle = 'white';
    this.context.lineWidth = 5;
    this.context.strokeRect(0, 0, this.canvas.width, this.canvas.height);

    this.snake.x += this.snake.dx;
    this.snake.y += this.snake.dy;

    if (this.snake.x < 0) this.snake.x = this.canvas.width - this.grid;
    else if (this.snake.x >= this.canvas.width) this.snake.x = 0;

    if (this.snake.y < 0) this.snake.y = this.canvas.height - this.grid;
    else if (this.snake.y >= this.canvas.height) this.snake.y = 0;

    this.snake.cells.unshift({ x: this.snake.x, y: this.snake.y });

    if (this.snake.cells.length > this.snake.maxCells) this.snake.cells.pop();

    this.context.fillStyle = 'yellow';
    this.context.fillRect(this.apple.x, this.apple.y, this.grid - 1, this.grid - 1);
    this.context.fillStyle = 'red';
    this.context.fillRect(this.bomb.x, this.bomb.y, this.grid - 1, this.grid - 1);

    this.context.fillStyle = 'green';
    this.snake.cells.forEach((cell, index) => {
      this.context.fillRect(cell.x, cell.y, this.grid - 1, this.grid - 1);

      if (cell.x === this.apple.x && cell.y === this.apple.y) {
        this.snake.maxCells++;
        this.apple.x = this.getRandomInt(0, 25) * this.grid;
        this.apple.y = this.getRandomInt(0, 25) * this.grid;
      }
      if (cell.x === this.bomb.x && cell.y === this.bomb.y) {
        this.snake.maxCells --;
        this.bomb.x = this.getRandomInt(0, 25) * this.grid;
        this.bomb.y = this.getRandomInt(0, 25) * this.grid;
      }


      for (let i = index + 1; i < this.snake.cells.length; i++) {
        if (cell.x === this.snake.cells[i].x && cell.y === this.snake.cells[i].y) {
          this.resetGame();        }
      }
    });
  }

  resetGame() {
    this.snake.x = 160;
    this.snake.y = 160;
    this.snake.cells = [];
    this.snake.maxCells = 4;
    this.snake.dx = this.grid;
    this.snake.dy = 0;

    this.apple.x = this.getRandomInt(0, 25) * this.grid;
    this.apple.y = this.getRandomInt(0, 25) * this.grid;
    this.bomb.x = this.getRandomInt(0, 25) * this.grid;
    this.bomb.y = this.getRandomInt(0, 25) * this.grid;
  }
}

class UserInput extends GameGeneration {
  arrowInput() {
    document.addEventListener('keydown', (e) => {
      if (e.which === 37 && this.snake.dx === 0) {
        this.snake.dx = -this.grid;
        this.snake.dy = 0;
      } else if (e.which === 38 && this.snake.dy === 0) {
        this.snake.dy = -this.grid;
        this.snake.dx = 0;
      } else if (e.which === 39 && this.snake.dx === 0) {
        this.snake.dx = this.grid;
        this.snake.dy = 0;
      } else if (e.which === 40 && this.snake.dy === 0) {
        this.snake.dy = this.grid;
        this.snake.dx = 0;
      }
    });
  }

  hasGameEnded() {
    const hitLeftWall = this.snake.x < 0;
    const hitRightWall = this.snake.x >= this.canvas.width;
    const hitTopWall = this.snake.y < 0;
    const hitBottomWall = this.snake.y >= this.canvas.height;

    return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
  }

  start() {
    this.arrowInput();
    this.loop();
  }
}

// Start the game
const game = new UserInput();
game.start();