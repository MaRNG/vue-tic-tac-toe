import {PlayerEnum} from "../player/player-enum";

export class Cell {
    private filled: boolean = false;
    private filledBy: PlayerEnum | null = null;

    public fill(player: PlayerEnum): void {
        this.filled = true;
        this.filledBy = player;
    }

    public clear(): void {
        this.filled = false;
        this.filledBy = null;
    }

    public isFilled(): boolean {
        return this.filled;
    }

    public getFilledBy(): PlayerEnum|null {
        return this.filledBy;
    }
}