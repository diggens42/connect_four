export class Board
{
	private grid: number[][];
	private currentPlayer: 1 | 2;
	private rows: number;
	private cols: number;

	constructor(rows = 6, cols = 7)
	{
		this.rows = rows;
		this.cols = cols;
		this.grid = Array(rows).fill(null).map(() => Array(cols).fill(0));
		this.currentPlayer = 1;
	}

	public dropPiece(col: number): boolean
	{
		for (let row = this.rows - 1; row >= 0; row--)
		{
			if (this.grid[row][col] === 0)
			{
				this.grid[row][col] = this.currentPlayer;
				return (true);
			}
		}
		return (false);
	}

	public winCheck(): boolean
	{
		//check horizontal
		for (let row = 0; row <= this.rows; row++)
		{
			for (let col = 0; col <= this.cols - 4; col++)
			{
				if (
					this.grid[row][col] !== 0 &&
					this.grid[row][col] === this.grid[row][col + 1] &&
					this.grid[row][col] === this.grid[row][col + 2] &&
					this.grid[row][col] === this.grid[row][col + 3]
				)
				{
					return true;
				}
			}
		}

		// check vertical
		for (let row = 0; row <= this.rows - 4; row++)
		{
			for (let col = 0; col <= this.cols; col++)
			{
				if (
					this.grid[row][col] !== 0 &&
					this.grid[row][col] === this.grid[row + 1][col] &&
					this.grid[row][col] === this.grid[row + 2][col] &&
					this.grid[row][col] === this.grid[row + 3][col]
				)
				{
					return (true);
				}
			}
		}

		//check diagonal (down-right)
		for (let row = 0; row <= this.rows - 4; row++)
		{
			for (let col = 0; col <= this.cols - 4; col++)
			{
				if (
					this.grid[row][col] !== 0 &&
					this.grid[row][col] === this.grid[row + 1][col + 1] &&
					this.grid[row][col] === this.grid[row + 2][col + 2] &&
					this.grid[row][col] === this.grid[row + 3][col + 3]
				)
				{
					return (true);
				}
			}
		}

		//check diagonal (up-right)
		for (let row = 3; row < this.rows; row++)
		{
			for (let col = 0; col <= this.cols - 4; col++)
			{
				if (
					this.grid[row][col] !== 0 &&
					this.grid[row][col] === this.grid[row - 1][col + 1] &&
					this.grid[row][col] === this.grid[row - 2][col + 2] &&
					this.grid[row][col] === this.grid[row - 3][col + 3]
				)
				{
					return (true);
				}
			}
		}

		return (false);
	}

	public switchPlayer(): void
	{
		this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
	}

	public getGrid(): number[][]
	{
		return (this.grid);
	}

	public getCurrentPlayer(): 1 | 2
	{
		return (this.currentPlayer);
	}
}
