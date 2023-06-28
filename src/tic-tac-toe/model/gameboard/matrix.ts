import {Cell} from "./cell";

export class Matrix {
    private cells: Array<Array<Cell>> = []

    constructor(public readonly size: number) {
        this.initCells();
    }

    public getCell(posX: number, posY: number): Cell|null {
        if (posX >= 0 && posY >= 0 && posX < this.size && posY < this.size) {
            return this.cells[posY][posX];
        }

        return null;
    }

    public getCells(): Array<Array<Cell>> {
        return this.cells;
    }

    private initCells(): void {
        this.cells = [];

        for (let i = 0; i < this.size; i++) {
            const row: Array<Cell> = [];

            for (let j = 0; j < this.size; j++) {
                row.push(new Cell(j, i));
            }

            this.cells.push(row);
        }
    }
}