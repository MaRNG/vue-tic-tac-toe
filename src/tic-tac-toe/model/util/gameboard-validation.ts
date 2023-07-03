export class GameboardValidation {
    public static getMaxPlayerCellsToWin(gameboardSize: number): number {
        const gameboardDiagonalLength = gameboardSize * Math.sqrt(2);
        const cellDiagonalLength = Math.sqrt(2);

        return Math.floor(gameboardDiagonalLength / cellDiagonalLength);
    }
}