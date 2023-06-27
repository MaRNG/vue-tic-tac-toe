<template>
  <div class="game">
      <div class="game__info">
          <table class="table">
              <tr>
                  <td>Player round:</td>
                  <td>{{ game.getPlayerRound().toString() }}</td>
              </tr>
              <tr>
                  <td>Winner:</td>
                  <td v-if="game.getWinner() === null">
                      no one
                  </td>
                  <td v-if="game.getWinner() !== null">
                      {{ game.getWinner().toString() }}
                  </td>
              </tr>
          </table>
      </div>

      <GameBoard :game="game" />
  </div>
</template>

<script lang="ts">
import {GameConfig} from "../model/game/game-config";
import GameBoard from "./game-board.vue";
import {Game} from "../model/game/game";

export default {
    name: "game",
    components: {GameBoard},
    data: () => {
        return {
            gameConfig: null as GameConfig|null,
            game: null as Game|null
        }
    },
    beforeMount() {
        this.gameConfig = new GameConfig(10, 5);
        this.game = new Game(this.gameConfig);
    },
}
</script>

<style scoped lang="scss" src="./../scss/game.scss">

</style>