import {Matrix} from "../gameboard/matrix";
import {GameConfig} from "./game-config";
import {Cell} from "../gameboard/cell";
import {PlayerEnum} from "../player/player-enum";

export class Game {
    private matrix: Matrix|null = null;
    private playerRound: PlayerEnum = PlayerEnum.ONE;

    private winner: PlayerEnum = null;
    private winnerCells: Array<Cell> = [];

    private lastPlayedCell: Cell | null = null;

    constructor(private readonly gameConfig: GameConfig) {
        this.reset();
    }

    public playCell(cell: Cell): void {
        if (this.validPlayCell(cell)) {
            this._playCell(cell);
        }
    }

    public validPlayCell(cell: Cell): boolean {
        return cell.isFilled() === false && this.winner === null;
    }

    public reset(): void {
        this.winner = null;
        this.winnerCells.splice(0);
        this.lastPlayedCell = null;
        this.playerRound = PlayerEnum.ONE;

        this.matrix = new Matrix(this.gameConfig.boardSize);
    }

    public getMatrix(): Matrix|null {
        return this.matrix;
    }

    public getPlayerRound(): PlayerEnum {
        return this.playerRound;
    }

    public getWinner(): PlayerEnum|null {
        return this.winner;
    }

    public getWinnerCells(): Array<Cell> {
        return this.winnerCells;
    }

    private _playCell(cell: Cell): void {
        cell.fill(this.playerRound);

        this.lastPlayedCell = cell;

        this._checkWinner();

        if (this.winner) {
            return;
        }

        this._switchPlayer();
    }

    private _switchPlayer(): void {
        if (this.playerRound === PlayerEnum.ONE) {
            this.playerRound = PlayerEnum.TWO;
        } else {
            this.playerRound = PlayerEnum.ONE;
        }
    }

    private _checkWinner(): void {
        if (this.lastPlayedCell !== null) {
            const foundLines: Array<Array<Cell>> = [];

            // Vertical
            foundLines.push(this._checkLine(this.lastPlayedCell, 0, 1));

            // Horizontal
            foundLines.push(this._checkLine(this.lastPlayedCell, 1, 0));

            // Diagonal left down right top
            foundLines.push(this._checkLine(this.lastPlayedCell, 1, 1));

            // Diagonal left top right down
            foundLines.push(this._checkLine(this.lastPlayedCell, 1, -1));

            let topLengthLineCount: number = 0;
            let topLengthLine: Array<Cell> = null;

            foundLines.forEach((line) => {
                if (line.length > topLengthLineCount) {
                    topLengthLineCount = line.length;
                    topLengthLine = line;
                }
            });

            if (topLengthLineCount >= this.gameConfig.rowLengthToWin) {
                this.winner = this.lastPlayedCell.getFilledBy();
                this.winnerCells = topLengthLine;
            }
        }
    }

    private _checkLine(cellToCheck: Cell, functionX: number, functionY: number): Array<Cell> {
        const originPosX = cellToCheck.posX;
        const originPosY = cellToCheck.posY;

        const originCellPlayerOwned = cellToCheck.getFilledBy();

        const visitedCoordinates: Array<{ x: number, y: number }> = [{ x: originPosX, y: originPosY }];

        let checkedCells: Array<Cell> = [ cellToCheck ];

        [1, -1].forEach((multiplier) => {
            let checkingCell: Cell|null = cellToCheck;
            let functionValue = 0;

            while (checkingCell !== null && checkingCell.getFilledBy() === originCellPlayerOwned) {
                if (visitedCoordinates.filter((coords) => coords.x === checkingCell.posX && coords.y === checkingCell.posY).length === 0) {
                    checkedCells.push(checkingCell);
                    visitedCoordinates.push({ x: checkingCell.posX, y: checkingCell.posY });
                }

                const checkPosX = originPosX + (functionValue * functionX * multiplier);
                const checkPosY = originPosY + (functionValue * functionY * multiplier);

                checkingCell = this.matrix.getCell(checkPosX, checkPosY);
                functionValue++;
            }
        });

        return checkedCells;
    }
}