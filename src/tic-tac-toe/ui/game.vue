<template>
  <div class="game">
      <div class="game__info">
          <table class="table">
              <tr>
                  <td>Player round:</td>
                  <td>
                      <span class="player-symbol" :class="getPlayerInfoClasses(game.getPlayerRound())"></span>
                  </td>
              </tr>
              <tr>
                  <td>Winner:</td>
                  <td v-if="game.getWinner() === null">
                      no one
                  </td>
                  <td v-if="game.getWinner() !== null">
                      <span class="player-symbol" :class="getPlayerInfoClasses(game.getWinner())"></span>
                  </td>
              </tr>
          </table>

      </div>

      <GameBoard :game="game" />

      <a role="button" @click="startAgain" class="button-start-again">Start again!</a>
  </div>
</template>

<script lang="ts">
import {GameConfig} from "../model/game/game-config";
import GameBoard from "./game-board.vue";
import {Game} from "../model/game/game";
import {PlayerEnum} from "../model/player/player-enum";

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
    methods: {
        startAgain(): void {
            this.game.reset();
        },
        getPlayerInfoClasses(player: PlayerEnum): Array<string> {
            const classes: Array<string> = [];

            if (player === PlayerEnum.ONE) {
                classes.push('player-one');
            } else {
                classes.push('player-two');
            }

            return classes;
        }
    }
}
</script>

<style scoped lang="scss" src="./../scss/game.scss">

</style>