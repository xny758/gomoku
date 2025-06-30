class Gomoku {
    constructor() {
        this.boardSize = 15;
        this.board = Array.from({ length: this.boardSize }, () => Array(this.boardSize).fill(0));
        this.currentPlayer = 1; // 1 为黑子，2 为白子
        this.gameOver = false;
        this.initBoard();
        this.initEventListeners();
    }

    initBoard() {
        const gameBoard = document.getElementById('game-board');
        gameBoard.innerHTML = '';
        for (let y = 0; y < this.boardSize; y++) {
            for (let x = 0; x < this.boardSize; x++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.x = x;
                cell.dataset.y = y;
                gameBoard.appendChild(cell);
            }
        }
    }

    initEventListeners() {
        document.getElementById('game-board').addEventListener('click', (e) => this.handleCellClick(e));
        document.getElementById('new-game').addEventListener('click', () => this.newGame());
    }

    handleCellClick(e) {
        const cell = e.target.closest('.cell');
        if (!cell || this.gameOver) return;

        const x = parseInt(cell.dataset.x);
        const y = parseInt(cell.dataset.y);
        if (this.board[y][x] !== 0) return;

        this.placePiece(x, y);
        if (this.checkWin(x, y)) {
            this.gameOver = true;
            alert(`玩家 ${this.currentPlayer === 1 ? '黑子' : '白子'} 获胜！`);
        } else if (this.isBoardFull()) {
            this.gameOver = true;
            alert('平局！');
        } else {
            this.currentPlayer = 3 - this.currentPlayer; // 切换玩家
        }
    }

    placePiece(x, y) {
        this.board[y][x] = this.currentPlayer;
        const piece = document.createElement('div');
        piece.className = `piece ${this.currentPlayer === 1 ? 'black' : 'white'}`;
        document.querySelector(`[data-x="${x}"][data-y="${y}"]`).appendChild(piece);
    }

    checkWin(x, y) {
        const directions = [
            [1, 0], [0, 1], [1, 1], [1, -1]
        ];
        const player = this.currentPlayer;

        for (const [dx, dy] of directions) {
            let count = 1;
            // 正向检查
            for (let i = 1; i < 5; i++) {
                const newX = x + i * dx;
                const newY = y + i * dy;
                if (this.isInBoard(newX, newY) && this.board[newY][newX] === player) {
                    count++;
                } else {
                    break;
                }
            }
            // 反向检查
            for (let i = 1; i < 5; i++) {
                const newX = x - i * dx;
                const newY = y - i * dy;
                if (this.isInBoard(newX, newY) && this.board[newY][newX] === player) {
                    count++;
                } else {
                    break;
                }
            }
            if (count >= 5) return true;
        }
        return false;
    }

    isInBoard(x, y) {
        return x >= 0 && x < this.boardSize && y >= 0 && y < this.boardSize;
    }

    isBoardFull() {
        for (let y = 0; y < this.boardSize; y++) {
            for (let x = 0; x < this.boardSize; x++) {
                if (this.board[y][x] === 0) return false;
            }
        }
        return true;
    }

    newGame() {
        this.board = Array.from({ length: this.boardSize }, () => Array(this.boardSize).fill(0));
        this.currentPlayer = 1;
        this.gameOver = false;
        this.initBoard();
    }
}

// 初始化游戏
new Gomoku();