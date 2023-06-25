import {Cell} from "./cell";

export class Matrix {
    public readonly cells: Array<Array<Cell>> = []

    constructor(public readonly size: number) {
        for (let i = 0; i < size; i++) {
            const row: Array<Cell> = [];

            for (let j = 0; j < size; j++) {
                row.push(new Cell());
            }

            this.cells.push(row);
        }
    }
}