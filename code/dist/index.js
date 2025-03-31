"use strict";
// import { Game } from './game';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = exports.Board = void 0;
class Board {
    constructor(rows = 6, cols = 7) {
        this.rows = rows;
        this.cols = cols;
        this.grid = Array(rows).fill(null).map(() => Array(cols).fill(0));
        this.currentPlayer = 1;
    }
    dropPiece(col) {
        for (let row = this.rows - 1; row >= 0; row--) {
            if (this.grid[row][col] === 0) {
                this.grid[row][col] = this.currentPlayer;
                return (true);
            }
        }
        return (false);
    }
    winCheck() {
        //check horizontal
        for (let row = 0; row <= this.rows; row++) {
            for (let col = 0; col <= this.cols - 4; col++) {
                if (this.grid[row][col] !== 0 &&
                    this.grid[row][col] === this.grid[row][col + 1] &&
                    this.grid[row][col] === this.grid[row][col + 2] &&
                    this.grid[row][col] === this.grid[row][col + 3]) {
                    return true;
                }
            }
        }
        // check vertical
        for (let row = 0; row <= this.rows - 4; row++) {
            for (let col = 0; col <= this.cols; col++) {
                if (this.grid[row][col] !== 0 &&
                    this.grid[row][col] === this.grid[row + 1][col] &&
                    this.grid[row][col] === this.grid[row + 2][col] &&
                    this.grid[row][col] === this.grid[row + 3][col]) {
                    return (true);
                }
            }
        }
        //check diagonal (down-right)
        for (let row = 0; row <= this.rows - 4; row++) {
            for (let col = 0; col <= this.cols - 4; col++) {
                if (this.grid[row][col] !== 0 &&
                    this.grid[row][col] === this.grid[row + 1][col + 1] &&
                    this.grid[row][col] === this.grid[row + 2][col + 2] &&
                    this.grid[row][col] === this.grid[row + 3][col + 3]) {
                    return (true);
                }
            }
        }
        //check diagonal (up-right)
        for (let row = 3; row < this.rows; row++) {
            for (let col = 0; col <= this.cols - 4; col++) {
                if (this.grid[row][col] !== 0 &&
                    this.grid[row][col] === this.grid[row - 1][col + 1] &&
                    this.grid[row][col] === this.grid[row - 2][col + 2] &&
                    this.grid[row][col] === this.grid[row - 3][col + 3]) {
                    return (true);
                }
            }
        }
        return (false);
    }
    isDraw() {
        return (this.grid[0].every(cell => cell !== 0));
    }
    reset() {
        this.grid = Array(this.rows).fill(null).map(() => Array(this.cols).fill(0));
        this.currentPlayer = 1;
    }
    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
    }
    getGrid() {
        return (this.grid);
    }
    getCurrentPlayer() {
        return (this.currentPlayer);
    }
}
exports.Board = Board;
class Game {
    constructor() {
        this.board = new Board();
        this.boardElement = document.getElementById('board');
        this.gameStatus = document.getElementById('status');
        this.renderBoard();
        this.attachEventListeners();
    }
    renderBoard() {
        this.boardElement.innerHTML = '';
        const grid = this.board.getGrid();
        for (let col = 0; col < grid[0].length; col++) {
            const column = document.createElement('div');
            column.className = 'column';
            column.dataset.col = col.toString();
            for (let row = 0; row < grid.length; row++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                if (grid[row][col] === 1)
                    cell.classList.add('player1');
                else if (grid[row][col] === 2)
                    cell.classList.add('player2');
                column.prepend(cell);
            }
            this.boardElement.appendChild(column);
        }
        this.gameStatus.textContent = `Player ${this.board.getCurrentPlayer()}'s turn`;
    }
    attachEventListeners() {
        this.boardElement.addEventListener('click', (event) => {
            const column = event.target.closest('.column');
            if (!column)
                return;
            const colIdx = parseInt(column.dataset.col || '0', 10);
            const success = this.board.dropPiece(colIdx);
            if (success) {
                this.renderBoard();
                if (this.board.winCheck()) {
                    this.gameStatus.textContent = 'Player ${this.board.getCurrentPlayer()} wins!';
                    this.disableBoard();
                }
                else if (this.board.isDraw()) {
                    this.gameStatus.textContent = "Game ended in a draw!";
                    this.disableBoard();
                }
                else {
                    this.board.switchPlayer();
                    this.renderBoard();
                }
            }
        });
        const resetButton = document.getElementById('reset');
        if (resetButton) {
            resetButton.addEventListener('click', () => {
                this.board.reset();
                this.renderBoard();
                this.enableBoard();
            });
        }
    }
    disableBoard() {
        this.boardElement.classList.add('disabled');
    }
    enableBoard() {
        this.boardElement.classList.remove('disabled');
    }
}
exports.Game = Game;
document.addEventListener('DOMContentLoaded', () => {
    new Game();
});
