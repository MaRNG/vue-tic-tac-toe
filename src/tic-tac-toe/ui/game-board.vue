<template>
  <div class="game-board">
      <div class="game-board__active" v-if="game !== null && game.getMatrix() !== null">
          <div class="row" v-for="row in game.getMatrix().getCells()">
              <div class="cell" v-for="cell in row" @click="playCell(cell)" :class="getCellClasses(cell)">

              </div>
          </div>
      </div>

      <div class="game-board__loading" v-if="game === null || game.getMatrix() === null">

      </div>
  </div>
</template>

<script lang="ts">
import {PropType} from "vue";
import {Game} from "../model/game/game";
import {Cell} from "../model/gameboard/cell";
import {PlayerEnum} from "../model/player/player-enum";

export default {
    name: "game-board",
    props: {
        game: {
            type: Object as PropType<Game>,
            required: true
        }
    },
    methods: {
        playCell(cell: Cell): void {
            this.game.playCell(cell);
        },
        getCellClasses(cell: Cell): Array<string> {
            let classes = [];

            if (cell.isFilled()) {
                classes.push('cell--active');

                switch (cell.getFilledBy()) {
                    case PlayerEnum.ONE:
                        classes.push('cell--player-one');
                        break;
                    case PlayerEnum.TWO:
                        classes.push('cell--player-two');
                        break;
                }
            }

            if (this.game.validPlayCell(cell) === false) {
                classes.push('cell--not-valid');
            }

            return classes;
        }
    },
}
</script>

<style scoped lang="scss" src="./../scss/game-board.scss">

</style>