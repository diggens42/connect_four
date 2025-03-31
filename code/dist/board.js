"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
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
