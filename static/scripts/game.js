class GameGeneration {
  constructor() {
    this.canvas = document.getElementById('game');
    this.context = this.canvas.getContext('2d');
    this.grid = 16;
    this.count = 0;
    this.borderPadding = 5;

    this.snake = {
      x: 160,
      y: 160,
      dx: this.grid,
      dy: 0,
      cells: [],
      maxCells: 4
    };

    this.apple = {
      x: this.getRandomInt(1, 24) * this.grid,
      y: this.getRandomInt(1, 24) * this.grid
    };

    this.gameOver = false;
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  loop() {
    if (this.gameOver) return;

    requestAnimationFrame(() => this.loop());

    if (++this.count < 4) return;

    this.count = 0;
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw border
    this.context.strokeStyle = 'white';
    this.context.lineWidth = 5;
    this.context.strokeRect(
      this.borderPadding, 
      this.borderPadding, 
      this.canvas.width - this.borderPadding * 2, 
      this.canvas.height - this.borderPadding * 2
    );

    // Move snake
    this.snake.x += this.snake.dx;
    this.snake.y += this.snake.dy;

    // Border collision detection
    if (this.snake.x < this.borderPadding || this.snake.x >= this.canvas.width - this.borderPadding ||
        this.snake.y < this.borderPadding || this.snake.y >= this.canvas.height - this.borderPadding) {
      this.displayGameOver();
      return;
    }

    // Update snake position
    this.snake.cells.unshift({ x: this.snake.x, y: this.snake.y });

    if (this.snake.cells.length > this.snake.maxCells) this.snake.cells.pop();

    // Draw apple
    this.context.fillStyle = 'red';
    this.context.fillRect(this.apple.x, this.apple.y, this.grid - 1, this.grid - 1);

    // Draw snake
    this.context.fillStyle = 'green';
    this.snake.cells.forEach((cell, index) => {
      this.context.fillRect(cell.x, cell.y, this.grid - 1, this.grid - 1);

      // Snake eats apple
      if (cell.x === this.apple.x && cell.y === this.apple.y) {
        this.snake.maxCells++;
        this.apple.x = this.getRandomInt(1, 24) * this.grid;
        this.apple.y = this.getRandomInt(1, 24) * this.grid;
      }

      // Check self-collision
      for (let i = index + 1; i < this.snake.cells.length; i++) {
        if (cell.x === this.snake.cells[i].x && cell.y === this.snake.cells[i].y) {
          this.displayGameOver();
          return;
        }
      }
    });
  }

  displayGameOver() {
    this.gameOver = true;
    this.context.fillStyle = 'white';
    this.context.font = '30px Arial';
    this.context.fillText('Game Over', this.canvas.width / 2 - 80, this.canvas.height / 2);
  }

  resetGame() {
    this.gameOver = false;
    this.snake.x = 160;
    this.snake.y = 160;
    this.snake.cells = [];
    this.snake.maxCells = 4;
    this.snake.dx = this.grid;
    this.snake.dy = 0;
    this.apple.x = this.getRandomInt(1, 24) * this.grid;
    this.apple.y = this.getRandomInt(1, 24) * this.grid;
    this.loop();
    window.location.href = 'end-game.html';
  }
}

class UserInput extends GameGeneration {
  arrowInput() {
    document.addEventListener('keydown', (e) => {
      if (this.gameOver && e.key === 'Enter') {
        this.resetGame();
      }

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

  start() {
    this.arrowInput();
    this.loop();
  }
}

// Start the game
const game = new UserInput();
game.start();
