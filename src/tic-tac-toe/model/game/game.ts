import {Matrix} from "../gameboard/matrix";
import {GameConfig} from "./game-config";
import {Cell} from "../gameboard/cell";
import {PlayerEnum} from "../player/player-enum";

export class Game {
    private matrix: Matrix|null = null;
    private playerRound: PlayerEnum = PlayerEnum.ONE;

    constructor(private readonly gameConfig: GameConfig) {
        this.reset();
    }

    public playCell(cell: Cell): void {
        if (this.validPlayCell(cell)) {
            this._playCell(cell);
        }
    }

    public validPlayCell(cell: Cell): boolean {
        return cell.isFilled() === false;
    }

    public reset(): void {
        this.matrix = new Matrix(this.gameConfig.boardSize);
    }

    public getMatrix(): Matrix|null {
        return this.matrix;
    }

    public getPlayerRound(): PlayerEnum {
        return this.playerRound;
    }

    private _playCell(cell: Cell): void {
        cell.fill(this.playerRound);
        this._switchPlayer();
    }

    private _switchPlayer(): void {
        if (this.playerRound === PlayerEnum.ONE) {
            this.playerRound = PlayerEnum.TWO;
        } else {
            this.playerRound = PlayerEnum.ONE;
        }
    }
}