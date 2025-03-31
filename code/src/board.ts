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
		// horizontal, vertial, diagonal checks to be implemented
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
