<template>
  <div class="game-board">
      <div class="row" v-for="row in matrix.cells">
          <div class="cell" v-for="cell in row">

          </div>
      </div>
  </div>
</template>

<script lang="ts">
import {Matrix} from "../model/gameboard/matrix";
import {PropType} from "vue";
import {GameConfig} from "../model/game/game-config";

export default {
    name: "game-board",
    props: {
        gameConfig: {
            type: Object as PropType<GameConfig>,
            required: true
        }
    },
    data: () => {
        return {
            matrix: null as Matrix|null
        }
    },
    beforeMount() {
        this.matrix = new Matrix(this.gameConfig.boardSize);
    }
}
</script>

<style scoped lang="scss" src="./../scss/game-board.scss">

</style>