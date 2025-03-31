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
}
