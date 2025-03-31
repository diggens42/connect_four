"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const board_1 = require("./board");
class Game {
    constructor() {
        this.board = new board_1.Board();
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
