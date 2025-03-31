import { Board } from './board';

export class Game
{
	private board: Board;
	private boardElement: HTMLElement;
	private gameStatus: HTMLElement;

	constructor()
	{
		this.board = new Board();
		this.boardElement = document.getElementById('board') as HTMLElement;
		this.gameStatus = document.getElementById('status') as HTMLElement;
		this.renderBoard();
		this.attachEventListeners();
	}

	private renderBoard(): void
	{
		this.boardElement.innerHTML = '';
		const grid = this.board.getGrid();

		for (let col = 0; col < grid[0].length; col++)
		{
			const column = document.createElement('div');
			column.className = 'column';
			column.dataset.col = col.toString();

			for (let row = 0; row < grid.length; row++)
			{
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
		this.gameStatus.textContent = `Player ${this.board.getCurrentPlayer()}'s turn`
	}

	private attachEventListeners(): void
	{
		this.boardElement.addEventListener('click', (event) => {
			const column: HTMLElement = (event.target as HTMLElement).closest('.column') as HTMLElement;

			if (!column)
				return;

			const colIdx = parseInt(column.dataset.col || '0', 10);
			const success = this.board.dropPiece(colIdx);

			if (success)
			{
				this.renderBoard();
				if (this.board.winCheck())
				{
					this.gameStatus.textContent = 'Player ${this.board.getCurrentPlayer()} wins!';
					this.disableBoard();
				}
				else if (this.board.isDraw())
				{
					this.gameStatus.textContent = "Game ended in a draw!";
					this.disableBoard();
				}
				else
				{
					this.board.switchPlayer();
					this.renderBoard();
				}
			}
		});

		const resetButton = document.getElementById('reset');
		if (resetButton)
		{
			resetButton.addEventListener('click', () =>
			{
				this.board.reset();
				this.renderBoard();
				this.enableBoard();
			});
		}
	}

	private disableBoard(): void
	{
		this.boardElement.classList.add('disabled');
	}

	private enableBoard(): void
	{
		this.boardElement.classList.remove('disabled');
	}
}

