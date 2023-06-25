export class GameConfig {
    public constructor(
        public readonly boardSize: number,
        public readonly rowLengthToWin: number
    ) {
    }
}